<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import random from '../utils/random';
import { useLayersStore, useSelectedLayerStore } from '@/stores/layers';

const layers = useLayersStore();

const wrapper = ref<HTMLDivElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const canvasOverlay = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const ctxo = ref<CanvasRenderingContext2D | null>(null);

const calcViewport = (): { x: number; y: number; w: number; h: number } => ({
    x: wrapper.value?.scrollLeft ?? 0,
    y: wrapper.value?.scrollTop ?? 0,
    w: wrapper.value?.clientWidth ?? 500,
    h: wrapper.value?.clientHeight ?? 500,
});

let viewport = calcViewport();

const updateViewport = (): void => {
    viewport = calcViewport();
};

onMounted(() => {
    if (canvas.value && wrapper.value && canvasOverlay.value) {
        ctx.value = canvas.value.getContext('2d');
        ctxo.value = canvasOverlay.value.getContext('2d');
        ctxo.value.strokeStyle = 'blue';

        updateViewport();
        window.addEventListener('resize', updateViewport, { passive: true });
        document.addEventListener('keydown', handleDelKey);
        wrapper.value.addEventListener('scroll', updateViewport, { passive: true });
    }
});

onUnmounted(() => {
    window.removeEventListener('resize', updateViewport);
    document.removeEventListener('keydown', handleDelKey);
    wrapper.value?.removeEventListener('scroll', updateViewport);
});

const addRectangle = (
    x: number | null = null,
    y: number | null = null,
    w: number | null = null,
    h: number | null = null
): void => {
    x = x ?? random(viewport.x, viewport.x + viewport.w - 110);
    y = y ?? random(viewport.y, viewport.y + viewport.h - 110);
    w = w ?? random(10, 100);
    h = h ?? random(10, 100);
    layers.addLayer({
        type: 'rectangle',
        x,
        y,
        w,
        h,
    });
};

layers.$subscribe(() => {
    ctx.value.clearRect(0, 0, 5000, 5000);
    ctxo.value.clearRect(0, 0, 5000, 5000);
    layers.bgLayers.forEach((layer) => {
        if (layer.type === 'rectangle') {
            ctx.value?.strokeRect(layer.x, layer.y, layer.w, layer.h);
        }
    });
    layers.selectedLayers.forEach((layer) => {
        if (layer.type === 'rectangle') {
            ctxo.value?.strokeRect(layer.x, layer.y, layer.w, layer.h);
        }
    });
});

let dragged = false;

let startX = 0,
    startY = 0;
let deltaX = 0,
    deltaY = 0;

const selected = useSelectedLayerStore();

const handleMouseDown = (e: MouseEvent) => {
    dragged = true;
    startX = e.offsetX;
    startY = e.offsetY;
    layers.selectByXY(startX, startY);

    selected.x = layers.selectedLayers[0]?.x ?? 0;
    selected.y = layers.selectedLayers[0]?.y ?? 0;
    selected.w = layers.selectedLayers[0]?.w ?? 0;
    selected.h = layers.selectedLayers[0]?.h ?? 0;
};

const handleMouseUp = (e: MouseEvent) => {    
    dragged = false;
    layers.moveSelectedBy(e.offsetX - startX, e.offsetY - startY);
    deltaX = 0;
    deltaY = 0;
    canvasOverlay.value.style.transform = '';
};

const handleMouseMove = (e: MouseEvent) => {
    if (dragged) {
        deltaX += e.movementX;
        deltaY += e.movementY;
        selected.x += e.movementX;;
        selected.y += e.movementY;
        canvasOverlay.value.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
};

const handleDelKey = (e: KeyboardEvent) => {
    if (e.target === document.body && (e.key === 'Delete' || e.key === 'Backspace')) {
        layers.deleteSelectedLayers();
    }
};

defineExpose({
    addRectangle,
});
</script>

<template>
    <div ref="wrapper" class="w-full h-full overflow-auto relative">
        <canvas
            class="absolute top-0 left-0"
            width="5000"
            height="5000"
            ref="canvasOverlay"
        ></canvas>
        <canvas
            class="absolute top-0 left-0"
            width="5000"
            height="5000"
            ref="canvas"
            @mouseup="handleMouseUp"
            @mousemove="handleMouseMove"
            @mousedown="handleMouseDown"
        ></canvas>
    </div>
</template>
