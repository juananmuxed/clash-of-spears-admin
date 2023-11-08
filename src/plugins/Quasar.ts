import { Quasar, Notify, Dialog } from "quasar";
import { App } from "vue";
import iconSet from 'quasar/icon-set/fontawesome-v6'

import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'

import 'quasar/src/css/index.sass';

export const installQuasar = (app: App) => {
  app.use(Quasar, {
    plugins: {
      Notify,
      Dialog
    },
    iconSet: iconSet,
    config: {
      notify: {
        position: 'bottom-right',
        color: 'secondary'
      },
      dark: false
    }
  })
};
