<script setup lang="ts">
const emit = defineEmits(['click', 'focus', 'blur']);

interface ButtonProps {
    type: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    xs?: boolean;
    sm?: boolean;
    lg?: boolean;
    xl?: boolean;
    primary?: boolean;
    danger?: boolean;
    outline?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
    type: 'button',
    disabled: false,
    xs: false,
    sm: false,
    lg: false,
    xl: false,
    primary: false,
    danger: false,
    outline: false,
});
</script>
<template>
    <button
        class="users-select-none"
        :class="[
            xs
                ? 'text-xs px-2 py-1 rounded-sm'
                : sm
                ? 'text-sm px-2 py-1 rounded-sm'
                : lg
                ? 'text-lg px-4 py-2 rounded-lg'
                : xl
                ? 'text-xl px-5 py-3 rounded-lg'
                : 'text-base px-4 py-2 rounded',
            primary && outline
                ? 'border border-green-500 text-green-500 hover:bg-black hover:bg-opacity-5 dark:border-green-700'
                : danger && outline
                ? 'border border-red-500 text-red-500 hover:bg-black hover:bg-opacity-5'
                : primary
                ? 'text-green-50 border border-transparent bg-green-500 hover:bg-green-600 shadow-sm dark:bg-green-700 dark:hover:bg-green-800'
                : danger
                ? 'text-red-50  border border-transparent bg-red-500 hover:bg-red-600 shadow-sm dark:bg-red-700 dark:hover:bg-red-800'
                : 'text-inherit border border-opacity-80 hover:bg-black hover:bg-opacity-5 dark:border-slate-700',
            disabled ? 'opacity-60 cursor-not-allowed' : '',
        ]"
        :type="type"
        :disabled="disabled"
        @click="emit('click', $event)"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
    >
        <slot>Click Me</slot>
    </button>
</template>
