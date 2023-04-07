<script setup lang="ts">
import { useLayersStore, useSelectedLayerStore } from '@/stores/layers';
import InputNumber from './InputNumber.vue';
import { ref } from 'vue';

const x = ref(null);
const y = ref(null);
const w = ref(null);
const h = ref(null);

let selected = useSelectedLayerStore();

//TODO: separate mix placeholder for each input
const placeholder = ref(null);
const disabled = ref(false);

const layers = useLayersStore();

selected.$subscribe(() => {
    placeholder.value = '';
    disabled.value = false;
    if (layers.selectedLayers.length == 1) {
        x.value = selected.x;
        y.value = selected.y;
        w.value = selected.w;
        h.value = selected.h;
    } else if (layers.selectedLayers.length > 1) {
        x.value = null;
        y.value = null;
        w.value = null;
        h.value = null;
        placeholder.value = 'mix';
        disabled.value = true;
    } else {
        x.value = null;
        y.value = null;
        w.value = null;
        h.value = null;
        disabled.value = true;
    }
});

const handleChangeX = (value: number): void => {
    layers.updateSelectedLayers({ x: value });
};

const handleChangeY = (value: number): void => {
    layers.updateSelectedLayers({ y: value });
};

const handleChangeW = (value: number): void => {
    layers.updateSelectedLayers({ w: value });
};

const handleChangeH = (value: number): void => {
    layers.updateSelectedLayers({ h: value });
};

</script>

<template>
    <div class="flex flex-col gap-4">
        <fieldset class="flex gap-2 w-full">
            <InputNumber
                :model-value="x"
                :placeholder="placeholder"
                :disabled="disabled"
                select-on-focus
                label="X"
                @change="handleChangeX"
            />
            <InputNumber
                :model-value="y"
                :placeholder="placeholder"
                :disabled="disabled"
                select-on-focus
                label="Y"
                @change="handleChangeY"
            />
        </fieldset>
        <fieldset class="flex gap-2 w-full">
            <InputNumber
                :model-value="w"
                :placeholder="placeholder"
                :disabled="disabled"
                select-on-focus
                label="W"
                @change="handleChangeW"
            />
            <InputNumber
                :model-value="h"
                :placeholder="placeholder"
                :disabled="disabled"
                select-on-focus
                label="H"
                @change="handleChangeH"
            />
        </fieldset>
    </div>
</template>
