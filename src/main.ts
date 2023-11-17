import { createApp } from 'vue'

import App from './App.vue'
import { installRouter } from './router/Router'
import { installPinia } from './plugins/Pinia'
import { installQuasar } from './plugins/Quasar'
import { installI18n } from './plugins/I18n'

const app = createApp(App);

installI18n(app);
installPinia(app);
installRouter(app);
installQuasar(app);

app.mount('#app')
