import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { sassMigratorQuasar } from 'rollup-plugin-sass-migrator';
import path from 'node:path';

export default defineConfig({
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      Vue({
        template: { transformAssetUrls }
      }),

      quasar({
        autoImportComponentCase: 'pascal',
        sassVariables: 'src/quasar-variables.sass'
      }),

      AutoImport({
        imports: [
          'vue',
        ],
        dts: 'src/auto-imports.d.ts',
        vueTemplate: true,
      }),

      Components({
        extensions: ['vue', 'md'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: 'src/components.d.ts',
      }),

      sassMigratorQuasar()
    ]
})
