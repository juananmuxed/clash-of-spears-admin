import { ROLES } from 'src/constants/Roles';
import { RouteRecordRaw } from 'vue-router';

export type IMenuItem = {
  titleTag: string;
  url?: string;
  icon?: string;
  // eslint-disable-next-line no-use-before-define
  children?: IMenuItem[];
  roles?: number[];
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
    component: () => import('src/views/WelcomeView.vue'),
  },
  {
    path: 'expansions',
    name: 'expansions',
    meta: {
      titleTag: 'menu.expansions',
      icon: 'fas fa-bolt',
      roles: [ROLES.ADMIN, ROLES.EDITOR],
    },
    component: () => import('src/views/expansions/ExpansionsView.vue'),
  },
  {
    path: 'armies',
    name: 'armies',
    meta: {
      titleTag: 'menu.armies',
      icon: 'fas fa-person-rifle',
      roles: [ROLES.ADMIN, ROLES.EDITOR],
    },
    component: () => import('src/views/armies/ArmiesView.vue'),
  },
  {
    path: 'weapons',
    name: 'weapons',
    meta: {
      titleTag: 'menu.weapons',
      icon: 'fas fa-gun',
      roles: [ROLES.ADMIN, ROLES.EDITOR],
    },
    component: () => import('src/views/weapons/WeaponsView.vue'),
  },
  {
    path: 'armors',
    name: 'armors',
    meta: {
      titleTag: 'menu.armors',
      icon: 'fas fa-shield-halved',
      roles: [ROLES.ADMIN, ROLES.EDITOR],
    },
    component: () => import('src/views/armors/ArmorsView.vue'),
  },
  {
    path: 'traits',
    name: 'traits',
    meta: {
      titleTag: 'menu.traits',
      icon: 'fas fa-book',
      roles: [ROLES.ADMIN, ROLES.EDITOR],
    },
    component: () => import('src/views/traits/TraitsView.vue'),
  },
  {
    path: 'traits-values',
    name: 'traitsValues',
    meta: {
      titleTag: 'menu.traitsValues',
      icon: 'fas fa-book-bookmark',
      roles: [ROLES.ADMIN, ROLES.EDITOR],
    },
    component: () => import('src/views/traitsValues/TraitsValuesView.vue'),
  },
  {
    path: 'options',
    name: 'options',
    meta: {
      titleTag: 'menu.options',
      icon: 'fas fa-flask-vial',
      roles: [ROLES.ADMIN, ROLES.EDITOR],
    },
    component: () => import('src/views/options/OptionsView.vue'),
  },
  {
    path: 'config',
    name: 'config',
    meta: {
      titleTag: 'menu.config',
      icon: 'fas fa-gear',
      roles: [ROLES.ADMIN],
    },
    children: [
      {
        path: 'users',
        name: 'users',
        meta: {
          titleTag: 'menu.users',
          icon: 'fas fa-users',
          roles: [ROLES.ADMIN],
        },
        component: () => import('src/views/users/UsersView.vue'),
      },
      {
        path: 'roles',
        name: 'roles',
        meta: {
          titleTag: 'menu.roles',
          icon: 'fas fa-scale-balanced',
          roles: [ROLES.ADMIN],
        },
        component: () => import('src/views/roles/RolesView.vue'),
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
    roles: route.meta?.roles,
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
