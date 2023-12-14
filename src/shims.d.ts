export {};

declare module 'vue-router' {
  interface RouteMeta {
    breadcrumbs?: string[];
    titleTag: string;
    icon?: string;
    name?: string;
    noMenu?: true;
    backTo?: true | string;
    roles?: number[];
  }
}
