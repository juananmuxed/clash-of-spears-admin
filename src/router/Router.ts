import { App } from 'vue';
import {
  RouteRecordRaw,
  createRouter,
  createWebHistory,
} from 'vue-router';
import { MenuRoutes } from './MenuRoutes';
import { useTitle } from 'src/composables/UseTitle';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      ...MenuRoutes || [],
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

export const installRouter = (app: App) => {
  app.use(router);
};

let titleRouteTimeout: NodeJS.Timeout;
const title = useTitle();

router.beforeEach((to, from, next) => {
  titleRouteTimeout && clearTimeout(titleRouteTimeout);
  titleRouteTimeout = setTimeout(() => {
    title.setTitle(to);
  }, 200);

  next();
})
