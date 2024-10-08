import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/login',
    component: () => import('layouts/defaultLayout.vue'),
    children: [{ path: '', component: () => import('pages/Login.vue') }],
  },

  {
    path: '/admindb',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/admin/admin_db.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
