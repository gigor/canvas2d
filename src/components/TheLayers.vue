<script setup lang="ts">
import { useLayersStore } from '@/stores/layers';

let layers = useLayersStore();

const handleLayerClick = (id: number): void => {
    layers.selectById(id);
};
</script>

<template>
    <ul class="max-h-full overflow-y-auto overflow-x-hidden flex flex-col divide-y divide-slate-100">
        <li
            v-for="layer in layers.layers"
            :key="layer.id"
            class="flex justify-between items-center gap-2 px-3 rounded"
            :class="`${layer.selected ? 'bg-blue-600 text-blue-50' : 'hover:bg-blue-100'}`"
        >
            <button class="w-full text-left py-2 line-clamp-1" @click="handleLayerClick(layer.id)">
                {{ layer.name }}
            </button>
            <button class="p-2" @click="layers.deleteById(layer.id)">&times;</button>
        </li>
    </ul>
</template>
