import { defineStore } from "pinia";
import { Notify, QNotifyOptions } from "quasar";
import { useAuth } from "src/composables/client/UseAuth";
import { LOCAL_STORAGE } from "src/constants/Keys";
import { LoginPayload, TokenItem, UserResponse } from "src/models/api/Auth";
import { t } from "src/plugins/I18n";
import { router } from "src/router/Router";
import { jwt } from "src/utils/JWT";

export const useUserStore = defineStore('user', () => {
  const auth = useAuth();

  const { decodePayload } = jwt();

  const localStorageToken = localStorage.getItem(LOCAL_STORAGE.JWT);
  const localStoreLastToken = localStorage.getItem(LOCAL_STORAGE.LAST_TOKEN);

  const token = ref<UserResponse | undefined>(localStorageToken ? JSON.parse(localStorageToken) : undefined);
  const lastToken = ref<number | undefined>(localStoreLastToken ? Number(localStoreLastToken) : undefined);

  const tokenPayload = computed(() => (token.value ? decodePayload<TokenItem & { exp: number }>(token.value.token) : undefined));

  const timeout: Ref<NodeJS.Timeout | undefined> = ref(undefined);
  const userLogin = ref<LoginPayload>({
    email: '',
    password: '',
  });

  const validToken = computed(() => token.value && lastToken.value && Date.now() < (tokenPayload.value?.exp || 0) + lastToken.value);

  const isLoading = computed(() => auth.login.isFetching
    || auth.refreshToken.isFetching
    || auth.signup.isFetching);

  watch(token, (newValue: UserResponse | undefined) => (newValue !== undefined
    ? localStorage.setItem(LOCAL_STORAGE.JWT, JSON.stringify(newValue))
    : localStorage.removeItem(LOCAL_STORAGE.JWT)));

  watch(lastToken, (newValue: number | undefined) => (newValue !== undefined
    ? localStorage.setItem(LOCAL_STORAGE.LAST_TOKEN, JSON.stringify(newValue))
    : localStorage.removeItem(LOCAL_STORAGE.LAST_TOKEN)));


  function removeToken() {
    token.value = undefined;
  }

  async function logout(notifyConfig?: QNotifyOptions) {
    removeToken();
    stopRefreshToken();
    await router.push({ name: 'login' });
    notifyConfig && Notify.create({ ...notifyConfig });
  }

  async function getTokenFromIdentity() {
    return auth.login.execute(userLogin.value);
  }

  async function getRefreshTokenFromIdentity() {
    return auth.refreshToken.execute(token.value?.refreshToken || '');
  }

  const isRefreshing = ref(false);
  const refreshTokenSingleton = ref<Promise<void>>();

  async function refreshToken() {
    if (!token.value?.token || !token.value.refreshToken) {
      logout({ message: t('warnings.expiredCredentials'), type: 'warning' });
      return;
    }

    await getRefreshTokenFromIdentity();
    const newToken = auth.refreshToken.data;

    if (newToken) {
      token.value.token = newToken.token;
      token.value.refreshToken = newToken.refreshToken;
      startRefreshToken();
      return;
    }
    logout({ message: t('warnings.expiredCredentials'), type: 'warning' });
  }

  async function refreshTokenHandler() {
    if (!isRefreshing.value || !refreshTokenSingleton.value) {
      isRefreshing.value = true;
      refreshTokenSingleton.value = refreshToken();
    }

    await refreshTokenSingleton.value;
    isRefreshing.value = false;
  }

  function startRefreshToken() {
    if (tokenPayload.value !== undefined && lastToken.value !== undefined) {
      const time = tokenPayload.value.exp + lastToken.value - Date.now();
      timeout.value = setTimeout(refreshTokenHandler, time);
    }
  }

  function stopRefreshToken() {
    clearTimeout(timeout.value);
  }

  async function login() {
    await getTokenFromIdentity();

    token.value = auth.login.data;

    if (token.value) {
      lastToken.value = Date.now();
      startRefreshToken();

      await router.push({ path: '/' });
      Notify.create({
        message: t('success.welcome'),
        caption: tokenPayload.value?.username?.toString(),
        type: 'positive'
      });
    }

    return token.value
  }

  return {
    userLogin,
    tokenPayload,
    token,
    isLoading,
    validToken,
    login,
    logout,
    refreshTokenHandler,
  }
})