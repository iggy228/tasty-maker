<template>
  <main class="flex flex-col container px-3 mx-auto">
    <SearchBar
      @search="getSuggestions"
      @update:model-value="getSearchBarSuggestions"
      :suggestions="searchBarSuggestions"
    />
    <div class="my-5 flex flex-col gap-4">
      <RecipeListItem
        :key="recipe.id"
        v-for="recipe in recipes"
        :thumbnail-src="recipe.thumbnail_url"
        :thumbnail-alt="recipe.thumbnail_alt_text"
        :to="{
          name: RouteNames.RECIPE_DETAIL,
          params: {
            id: recipe.id
          }
        }"
        :title="recipe.name"
        :description="recipe.description"
        :time-in-minutes="recipe.total_time_minutes"
      />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { Recipe } from '../interfaces/recipes';
import type { SearchBarSuggestion } from '../interfaces/suggestions';
import { RecipesService } from '../services/RecipesService';
import SearchBar from '@/components/SearchBar.vue';
import { RouteNames } from '@/router/route-names';
import RecipeListItem from '@/components/RecipeListItem.vue';

const recipes = ref<Recipe[]>([]);
const searchBarSuggestions = ref<SearchBarSuggestion[]>([]);

onMounted(async () => {
  getSuggestions();
});

const getSuggestions = async (value?: string) => {
  const results = await RecipesService.list({
    from: 0,
    size: 20,
    tags: 'under_30_minutes',
    q: value
  });

  recipes.value = results.results;
};

const getSearchBarSuggestions = async (val?: string) => {
  if (!val) {
    searchBarSuggestions.value = [];
    return;
  }

  const results = await RecipesService.getAutoCompleteSuggestions(val);

  searchBarSuggestions.value = results.results.map<SearchBarSuggestion>((resultSuggestion) => ({
    display_text: resultSuggestion.display,
    search_value: resultSuggestion.search_value
  }));
};
</script>
