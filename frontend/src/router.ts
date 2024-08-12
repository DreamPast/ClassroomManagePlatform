import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/pages/HomePage.vue';

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
      path: '/course',
      component: () => import('./pages/CoursePage.vue'),
    },
    {
      path: '/faculty',
      component: () => import('./pages/FacultyListPage.vue'),
    },
    {
      path: '/faculty/:id',
      component: () => import('./pages/FacultyPage.vue'),
    },
    {
      path: '/subject',
      component: () => import('./pages/SubjectListPage.vue'),
    },
    {
      path: '/subject/:id',
      component: () => import('./pages/SubjectPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('./pages/NotFoundPage.vue'),
    },
  ],
});

export default router;
