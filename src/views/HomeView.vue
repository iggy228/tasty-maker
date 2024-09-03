<template>
  <main class="flex flex-col container px-3 mx-auto">
    <SearchBar @search="getSuggestions" />
    <div class="my-5 flex flex-col gap-4">
      <div
        :key="recipe.id"
        v-for="recipe in recipes"
        class="flex flex-row w-full bg-white p-2 rounded-lg h-40 drop-shadow"
      >
        <img :src="recipe.thumbnail_url" class="aspect-square object-cover h-full rounded-md" />
        <div class="ml-3">
          <h2 class="text-ellipsis">{{ recipe.name }}</h2>
          <p v-if="recipe.total_time_minutes" class="font-medium mt-1">
            <font-awesome-icon icon="fa-regular fa-clock" />
            {{ recipe.total_time_minutes }}min
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { Recipe } from '../interfaces/recipes';
import { RecipesService } from '../services/RecipesService';
import SearchBar from '@/components/SearchBar.vue';

const recipes = ref<Recipe[]>([]);

onMounted(async () => {
  const results = await RecipesService.list({
    from: 0,
    size: 20,
    tags: 'under_30_minutes'
  });

  recipes.value?.push(...results.results);
});

const getSuggestions = (value: string) => {
  console.log('Prefix: ' + value);
};
</script>
