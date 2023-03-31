<template>
  <div
    class="relative rounded-full h-12 border-none drop-shadow-md bg-white w-full flex flex-row mt-4"
  >
    <input
      type="text"
      class="w-full bg-transparent mx-4 focus:outline-none text-lg"
      v-model="inputValue"
      @input="debouncedInput"
    />
    <button @click="$emit('search', inputValue)" class="flex items-center px-4">
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" size="xl" class="text-gray-700" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash'
import { ref } from 'vue'

const inputValue = ref<string>('')

const emits = defineEmits<{
  (e: 'inputChanged', value: string): void
  (e: 'search', value: string): void
}>()

const debouncedInput = debounce(() => {
  emits('inputChanged', inputValue.value)
}, 400)
</script>
