import { RouteRecordRaw } from 'vue-router';

export type IMenuItem = {
  titleTag: string;
  url?: string;
  icon?: string;
  // eslint-disable-next-line no-use-before-define
  children?: IMenuItem[];
}
type Menu = IMenuItem[]

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'home',
    meta: {
      titleTag: 'menu.home',
      icon: 'fas fa-house',
    },
    component: () => import('src/views/SampleView.vue'),
  },
  {
    path: '/expansions',
    name: 'expansions',
    meta: {
      titleTag: 'menu.expansions',
      icon: 'fas fa-bolt',
    },
    component: () => import('src/views/SampleView.vue'),
  },
  {
    path: 'config',
    name: 'config',
    meta: {
      titleTag: 'menu.config',
      icon: 'fas fa-gear',
    },
    children: [
      {
        path: '/users',
        name: 'users',
        meta: {
          titleTag: 'menu.users',
          icon: 'fas fa-users',
        },
        component: () => import('src/views/SampleView.vue'),
      },
    ]
  },
];

function routeToMenu(route: RouteRecordRaw) {
  const hasChildren = !!route.children?.length;
  const activeChildren = route.children?.filter((child) => !child.meta?.noMenu);

  const item = {
    titleTag: route.meta?.titleTag || route.name || '',
    icon: route.meta?.icon,
    url: hasChildren ? undefined : route.name,
    children: activeChildren?.map(routeToMenu).filter((child) => child) as Menu,
  } as IMenuItem;

  const hasActiveChildren = !!item.children?.length;
  if (hasChildren && !hasActiveChildren) {
    return undefined;
  }

  if (!item.titleTag && route.meta?.name && activeChildren) {
    const index = activeChildren.findIndex((child) => child.name === route.meta?.name) ?? -1;

    if (index > -1) {
      const activeChild = activeChildren[index];
      item.children?.slice(index, 1);

      if (activeChild) {
        const subChildren = activeChild.children?.filter((child) => !child.meta?.noMenu);

        item.titleTag = activeChild.meta?.titleTag || activeChild.name?.toString() || '';
        item.icon = activeChild.meta?.icon;
        item.url = subChildren?.length ? undefined : activeChild.name?.toString();
        item.children = subChildren?.map(routeToMenu).filter((child) => child) as Menu;
      }
    }
  }
  return item;
}

export function getMenu() {
  return routes.filter((route) => !route.meta?.noMenu).map(routeToMenu).filter((route) => route) as Menu;
}

export {
  routes as MenuRoutes
}
