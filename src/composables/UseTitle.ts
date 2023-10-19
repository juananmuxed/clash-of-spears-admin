import { t } from "src/plugins/I18n";
import { router } from "src/router/Router";
import { RouteLocationNormalized } from "vue-router";

export const useTitle = () => {
  const setTitle = (to?: RouteLocationNormalized) => {
    const _to = !to ? router.currentRoute.value : to;
    const titleRoute = _to.meta?.titleTag ? t(`${_to.meta?.titleTag}`) : '-';
    const id = _to.params.id?.toString() ? `${_to.params.id} ` : '';
    document.title = `${titleRoute} ${id}`.trim();
  }

  return {
    setTitle
  }
}
