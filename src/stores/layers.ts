import { computed, reactive, ref } from 'vue';
import { defineStore } from 'pinia';

let lid = 1;

declare interface LayerData {
    id?: number;
    type?: 'rectangle';
    name?: string;
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    selected?: boolean;
}

class Layer {
    type: 'rectangle';
    name: string;
    x: number;
    y: number;
    w: number;
    h: number;
    selected: boolean;
    id: number;

    constructor(data: LayerData = {}) {
        this.id = data.id ?? lid++;
        this.type = data.type || 'rectangle';
        this.name =
            data.name || `${this.type.charAt(0).toUpperCase()}${this.type.slice(1)} ${this.id}`;

        this.x = data.x ?? 0;
        this.y = data.y ?? 0;
        this.w = data.w ?? 100;
        this.h = data.h ?? 120;
        this.selected = data.selected ?? false;
    }
}

const isWithinRectangle = (
    x: number,
    y: number,
    rect: { x: number; y: number; w: number; h: number }
): boolean => {
    return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
};

export const useLayersStore = defineStore('layers', () => {
    const layers = reactive([] as Layer[]);

    const addLayer = (data: LayerData) => {
        layers.push(new Layer(data));
    };

    const selectByXY = (x: number, y: number) => {
        layers.forEach((l) => {
            l.selected = isWithinRectangle(x, y, l);
        });
    };

    const selectById = (id: number) => {
        layers.forEach((l) => {
            l.selected = l.id === id ? l.selected = !l.selected : false;
        });
    }

    const moveSelectedBy = (dx: number, dy: number) => {
        layers.forEach((l) => {
            if (l.selected) {
                l.x += dx;
                l.y += dy;
            }
        });
    };

    const updateSelectedLayers = (data: LayerData) => {
        console.log('updateSelectedLayers', data);

        layers.forEach((l) => {
            if (l.selected) {
                Object.assign(l, data);
            }
        });
    };

    const deleteSelectedLayers = () => {
        for (let i = layers.length - 1; i >= 0; i -= 1) {
            if (layers[i].selected) layers.splice(i, 1);
        }
    };

    const deleteById = (id:number) => {
        for (let i = layers.length - 1; i >= 0; i -= 1) {
            if (layers[i].id === id) layers.splice(i, 1);
        }
    };

    const selectedLayers = computed(() => {
        return layers.filter((l) => l.selected);
    });

    const bgLayers = computed(() => {
        return layers.filter((l) => !l.selected);
    });

    return {
        layers,
        selectedLayers,
        bgLayers,
        addLayer,
        selectByXY,
        selectById,
        moveSelectedBy,
        updateSelectedLayers,
        deleteSelectedLayers,
        deleteById,
    };
});


export const useSelectedLayerStore = defineStore('selectedLayer', () => {
    const x = ref(0);
    const y = ref(0);
    const w = ref(0);
    const h = ref(0);

    return {x,y,w,h}
});