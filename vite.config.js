import { defineConfig } from "vite"
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import symfonyPlugin from "vite-plugin-symfony"
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

const twigRefreshPlugin = {
  name: 'twig-refresh',
  configureServer ({watcher, ws}) {
    watcher.add(resolve('templates/**/*.twig'))
    watcher.on('change', function (path) {
      if (path.endsWith('.twig')) {
        ws.send({
          type: 'full-reload'
        })
      }
    })
  }
}

export default defineConfig({
    plugins: [
        vue(),
        Pages({
            dirs: ['assets/js/pages']
        }),
        Layouts({
            layoutsDirs: 'assets/js/layouts',
            defaultLayout: 'default'
        }),
        Components({
            dirs: ['assets/js/components']
        }),
        AutoImport({
          imports: [
            'vue',
            'vue-router',
            '@vueuse/head'
          ]
        }),
        symfonyPlugin(),
        twigRefreshPlugin
    ],
    build: {
        rollupOptions: {
            input: {
                app: "./assets/js/app.js"
            },
        },
    },
    server: {
        port: 3000,
        host: '0.0.0.0',
    },
});
