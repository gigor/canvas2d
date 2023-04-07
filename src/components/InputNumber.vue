<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
    modelValue?: number;
    label?: string;
    name?: string;
    id?: string;
    placeholder?: string;
    disabled?: boolean;
    selectOnFocus?: boolean;
}>();

const emit = defineEmits(['change']);

const updateValue = (event: InputEvent) => {
    const target = event.target as HTMLInputElement;
    emit('change', parseFloat(target.value));
};

const handleFocus = (e:FocusEvent) => {
    if (props.selectOnFocus) {
        // @ts-ignore
        e.target?.select();
    }
}

</script>
    
<template>
    <label class="inline-flex justify-stretch items-center gap-1 w-full text-xs">
        <span class="font-bold opacity-70 flex-0 min-w-[2em] text-right"><slot>{{ label }}</slot></span>
        <input
            class="flex-1 w-0 bg-transparent focus:bg-white border-transparent text-inherit rounded-md"
            style="font-size:inherit"
            :id="id"
            :name="name"
            type="number"
            :placeholder="placeholder"
            :value="modelValue"
            :disabled="disabled"
            @input="updateValue"
            @focus="handleFocus"
        />
    </label>
</template>