<template>
  <div
    class="relative rounded-full h-12 border-none drop-shadow-md bg-white w-full flex flex-row mt-4 z-10"
    :class="{ 'focus:outline-ring': focusSearchBar }"
  >
    <input
      type="text"
      class="w-full bg-transparent ms-4 text-lg focus:outline-none"
      v-model="inputValue"
      @input="onInputChanged"
      aria-haspopup="true"
      @focus="focusSearchBar = true"
      @blur="focusSearchBar = false"
    />
    <button @click="$emit('search', inputValue)" class="flex items-center px-4">
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" size="xl" class="text-gray-900" />
    </button>

    <DropdownBox :show="showDropdown">
      <div
        :key="suggestion.search_value"
        v-for="suggestion in suggestions"
        class="py-1 border-b border-gray-400 last:border-none"
        role="none"
      >
        <button
          class="px-4 py-2 text-gray-900 w-full text-sm text-left"
          role="menuitem"
          tabindex="-1"
          @click="selectSuggestionValue(suggestion.search_value)"
        >
          {{ suggestion.display_text }}
        </button>
      </div>
    </DropdownBox>
  </div>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash';
import DropdownBox from '@/components/DropdownBox.vue';
import { ref, watch } from 'vue';
import type { SearchBarSuggestion } from '@/interfaces/suggestions';

const props = defineProps<{
  modelValue?: string;
  suggestions?: SearchBarSuggestion[];
  debounceTime?: number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'search', value: string): void;
}>();

const inputValue = ref<string>(props.modelValue ?? '');
const showDropdown = ref(false);
const focusSearchBar = ref(false);

// debounce calling function for search after 400ms
const debouncedSearch = debounce(() => {
  emit('update:modelValue', inputValue.value);
}, props.debounceTime);

const selectSuggestionValue = (searchVal: string) => {
  inputValue.value = searchVal;
  showDropdown.value = false;
  emit('search', inputValue.value);
};

// cancel debounce function if there is in progress and call again debounced search function
const onInputChanged = () => {
  debouncedSearch.cancel();
  debouncedSearch();
};

watch(
  () => props.suggestions,
  (val) => (showDropdown.value = !!val?.length)
);
</script>
