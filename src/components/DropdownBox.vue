<template>
  <div
    v-if="showDropdown"
    class="absolute top-12 w-full origin-top-right rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="menu-button"
    tabindex="-1"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
  show: boolean;
}>();
const emit = defineEmits<{
  (e: 'update:show', value: boolean): void;
}>();

const showDropdown = ref(props.show);

onMounted(() => {
  document.body.addEventListener('click', () => {
    showDropdown.value = false;
    emit('update:show', false);
  });
});

watch(
  () => props.show,
  (val) => {
    showDropdown.value = val;
  }
);
</script>
