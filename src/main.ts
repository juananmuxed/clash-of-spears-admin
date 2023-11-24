import { createApp } from 'vue'

import App from './App.vue'
import { installRouter } from './router/Router'
import { installPinia } from './plugins/Pinia'
import { installQuasar } from './plugins/Quasar'
import { installI18n, loadLanguageAsync } from './plugins/I18n'
import { LOCAL_STORAGE } from './constants/Keys'

const app = createApp(App);

async function init() {
  installI18n(app);
  await loadLanguageAsync(localStorage.getItem(LOCAL_STORAGE.LANG) || 'en');
  installPinia(app);
  installRouter(app);
  installQuasar(app);

  app.mount('#app');
}

init();
