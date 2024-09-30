<template>
  <div class="flex flex-col px-3 py-3 items-center">
    <LoadingSpinner class="mt-4" v-if="loading" />
    <div v-else class="bg-gray-50 rounded-lg py-4 flex flex-col">
      <h1 class="text-3xl text-center mb-5 mx-4 text-gray-900">{{ recipe?.name }}</h1>

      <div class="mx-3 bg-gray-200 shadow-md rounded-lg">
        <div class="w-100">
          <img
            :src="recipe?.thumbnail_url"
            :alt="recipe?.thumbnail_alt_text"
            class="rounded-xl aspect-square"
          />
          <p class="mt-2 mx-3">{{ recipe?.description }}</p>
        </div>

        <div class="flex flex-col flex-1 justify-between py-2 px-3">
          <div class="flex justify-between">
            <strong>
              <span class="flex flex-col">
                <span>Prepare time: </span>
                <span>{{ recipe?.prep_time_minutes }}min </span>
              </span>
            </strong>
            <strong class="flex flex-col">
              <span>Cooking time: </span>
              <span v-if="recipe?.cook_time_minutes">{{ recipe?.cook_time_minutes }}min</span>
              <span v-else>No cooking needed</span>
            </strong>
            <strong class="flex flex-col">
              <span>Total time: </span>
              <span>{{ recipe?.total_time_minutes }}min </span>
            </strong>
          </div>

          <span v-if="validVideoUrl(recipe?.video_url)" class="mt-2"
            >Video:
            <a class="text-blue-600 underline" :href="recipe?.video_url">{{
              recipe?.video_url
            }}</a></span
          >
        </div>

        <div v-if="recipe?.user_ratings" class="py-2 px-3">
          <div class="flex justify-between">
            <span>
              <font-awesome-icon icon="fa-solid fa-thumbs-up" size="xl" class="text-green-700" />
              {{ recipe?.user_ratings.count_positive }}
            </span>
            <span>
              <font-awesome-icon icon="fa-solid fa-thumbs-down" size="xl" class="text-red-400" />
              {{ recipe?.user_ratings.count_negative }}
            </span>
          </div>
          <div class="w-full bg-red-400 rounded-full h-2.5 mt-3">
            <div
              class="bg-green-700 h-2.5 rounded-full"
              :style="{
                width: `${recipe?.user_ratings.score * 100}%`
              }"
            ></div>
          </div>
        </div>
      </div>

      <div class="mx-4">
        <h2 class="text-2xl mt-3">Ingridients</h2>
        <ul class="list-disc ms-4" :key="section.position" v-for="section in recipe?.sections">
          <li :key="component.id" v-for="component in section.components">
            {{ component.raw_text }}
          </li>
        </ul>

        <h2 class="text-2xl mt-3">Instructions</h2>
        <ol class="list-decimal ms-4 mt-3">
          <li :key="instruction.id" v-for="instruction in recipe?.instructions">
            {{ instruction.display_text }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { Recipe } from '@/interfaces/recipes';
import { RecipesService } from '@/services/RecipesService';
import { validVideoUrl } from '@/utils';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const recipe = ref<Recipe>();
const loading = ref(false);

const getRecipe = async () => {
  try {
    loading.value = true;
    const result = await RecipesService.recipeDetail(parseInt(route.params.id as string));

    recipe.value = result;
  } catch (e) {
    // TODO error handling
  } finally {
    loading.value = false;
  }
};

getRecipe();
</script>
