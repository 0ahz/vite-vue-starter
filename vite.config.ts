import path from 'path'

import { defineConfig, loadEnv } from 'vite'
import ViteVue from '@vitejs/plugin-vue'
import ViteHtml from 'vite-plugin-html'
import ViteWindiCSS from 'vite-plugin-windicss'
import ViteComponents from 'unplugin-vue-components/vite'
import VitePurgeIcons from 'vite-plugin-purge-icons'
import ViteI18n from '@intlify/vite-plugin-vue-i18n'

const rootDir = path.resolve(__dirname, './')

export default ({ mode }) => {
  const isProd = mode === 'production'
  const processEnv = loadEnv(mode, process.cwd())
  const env = {
    mode,
    isProd,
    built: new Date().toJSON(),
    ...processEnv,
  }
  return defineConfig({
    server: {
      host: '0.0.0.0',
      port: 3101,
      proxy: {
        '/api': {
          target: 'http://localhost:7700',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@/': `${rootDir}/src/`,
      },
    },
    plugins: [
      ViteVue(),
      ViteWindiCSS(),
      VitePurgeIcons(),
      ViteComponents(),
      ViteI18n({
        include: `${rootDir}/locales/**`,
      }),
      ViteHtml({
        inject: {
          injectData: { ...env },
        },
        minify: isProd,
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "${rootDir}/src/styles/variables.scss";`,
        },
        less: {
          additionalData: `@import "${rootDir}/src/styles/variables.less";`,
        },
      },
    },
    // ssgOptions: {
    //   script: 'async',
    //   formatting: 'minify',
    // },
  })
}
