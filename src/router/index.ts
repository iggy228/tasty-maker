import { createRouter, createWebHistory } from 'vue-router';
import { RouteNames } from './route-names';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteNames.HOME,
      component: import('@/views/HomeView.vue')
    },
    {
      path: '/recipe/:id',
      name: RouteNames.RECIPE_DETAIL,
      component: import('@/views/RecipeDetailView.vue')
    }
  ]
});

export default router;
