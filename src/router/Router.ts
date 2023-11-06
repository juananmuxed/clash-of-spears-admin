import { App } from 'vue';
import {
  RouteRecordRaw,
  createRouter,
  createWebHistory,
} from 'vue-router';
import { MenuRoutes } from './MenuRoutes';
import { useTitle } from 'src/composables/UseTitle';
import { useUserStore } from 'src/stores/UseUserStore';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      ...MenuRoutes || [],
    ],
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      titleTag: 'menu.login',
    },
    component: () => import('src/views/LoginView.vue'),
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

router.beforeEach((to, from, next) => {
  const title = useTitle();
  const user = useUserStore();

  titleRouteTimeout && clearTimeout(titleRouteTimeout);
  titleRouteTimeout = setTimeout(() => {
    title.setTitle(to);
  }, 200);

  const publicPages = ['login'];
  const authRequired = !publicPages.includes(to.name?.toString() || '');

  if (!authRequired && user.validToken) next({ name: 'home' });

  if (authRequired && !user.validToken) {
    next({ name: 'login' });
  } else {
    next();
  }
})
