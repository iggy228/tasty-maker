<template>
  <RouterLink
    class="flex flex-row w-full bg-white p-2 rounded-lg h-40 drop-shadow cursor-pointer hover:bg-slate-200 transition-colors"
    :to="to"
  >
    <img
      v-if="thumbnailSrc"
      :src="thumbnailSrc"
      :alt="thumbnailAlt"
      class="aspect-square object-cover h-full rounded-md"
    />
    <div class="ml-3 flex flex-col justify-between">
      <div>
        <slot>
          <h2 v-if="title" class="text-ellipsis font-bold">{{ title }}</h2>
          <p v-if="description" class="font-medium mt-1 line-clamp-2">
            {{ description }}
          </p>
        </slot>
      </div>
      <slot name="bottom">
        <p v-if="timeInMinutes" class="font-medium mt-2 mb-1">
          <font-awesome-icon icon="fa-regular fa-clock" />
          {{ timeInMinutes }}min
        </p>
      </slot>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';

defineProps<{
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  to?: RouteLocationRaw;
  title?: string;
  description?: string;
  timeInMinutes?: number;
}>();
</script>
