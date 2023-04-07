<script setup lang="ts">
import { ref } from 'vue';
import TheCanvas from './components/TheCanvas.vue';
import TheLayers from './components/TheLayers.vue';
import SelectedControls from './components/SelectedControls.vue';
import { useLayersStore } from './stores/layers';
import TheButton from './components/TheButton.vue';

const layers = useLayersStore();

const handleAddRectangle = () => {
    // console.log("addRectangle")
    theCanvas.value?.addRectangle();
};

const handleDeleteRectangles = () => {
    layers.deleteSelectedLayers();
};

const theCanvas = ref<InstanceType<typeof TheCanvas>>();
</script>

<template>
    <div class="w-screen h-screen flex flex-col md:flex-row">
        <aside class="md:w-64 h-full md:order-2 flex-shrink-0 bg-slate-100 flex flex-col px-4 gap-4">
            <SelectedControls></SelectedControls>
            <div class="flex flex-nowrap items-start justify-between">
                <TheButton primary sm 
                    type="submit" 
                    @click="handleAddRectangle"
                >+ New Layer</TheButton>
                <TheButton sm 
                    :disabled="layers.selectedLayers.length == 0"
                    @click="handleDeleteRectangles"
                >&times; Selected</TheButton>
            </div>
            <TheLayers></TheLayers>
        </aside>
        <main class="h-full flex-auto overflow-hidden">
            <TheCanvas ref="theCanvas" class="bg-white"></TheCanvas>
        </main>
    </div>
</template>
