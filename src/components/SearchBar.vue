<template>
  <div
    class="relative rounded-full h-12 border-none drop-shadow-md bg-white w-full flex flex-row mt-4 z-10"
  >
    <input
      type="text"
      class="w-full bg-transparent mx-4 focus:outline-none text-lg"
      v-model="inputValue"
      @input="debouncedInput"
      aria-haspopup="true"
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
          {{ suggestion.display }}
        </button>
      </div>
    </DropdownBox>
  </div>
</template>

<script lang="ts" setup>
import { Suggestion } from '@/interfaces/suggestions';
import { RecipesService } from '@/services/RecipesService';
import { debounce } from 'lodash';
import DropdownBox from '@/components/DropdownBox.vue';
import { ref } from 'vue';

const props = defineProps<{
  modelValue?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'search', value: string): void;
}>();

const inputValue = ref<string>(props.modelValue ?? '');
const suggestions = ref<Suggestion[]>([]);
const showDropdown = ref(false);

const debouncedInput = debounce(() => {
  emit('update:modelValue', inputValue.value);
  getSuggestions();
}, 400);

const getSuggestions = async () => {
  try {
    const suggestionResult = await RecipesService.getAutoCompleteSuggestions(inputValue.value);

    showDropdown.value = true;
    suggestions.value = suggestionResult.results;
  } catch (e) {
    // TODO error handling
    console.log(e);
  }
};

const selectSuggestionValue = (searchVal: string) => {
  inputValue.value = searchVal;
  emit('search', inputValue.value);
};
</script>
