import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('./pages/ClassroomPage.vue'),
    },
    {
      path: '/classroom',
      component: () => import('./pages/ClassroomPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('./pages/NotFoundPage.vue'),
    },
  ],
});

export default router;
