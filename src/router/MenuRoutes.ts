import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'home',
    meta: {
      titleTag: 'menu.home',
      icon: 'home',
    },
    component: () => import('src/views/SampleView.vue'),
  },
];

export {
  routes as MenuRoutes
}
