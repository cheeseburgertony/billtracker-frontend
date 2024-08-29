import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createStyleImportPlugin } from 'vite-plugin-style-import'
import { fileURLToPath } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createStyleImportPlugin({
      libs: [
        {
          libraryName: 'zarm',
          esModule: true,
          resolveStyle: name => `zarm/es/${name}/style/css`
        }
      ]
    })
  ],
  css: {
    modules: {
      localsConvention: 'dashesOnly'
    },
    preprocessorOptions: {
      less: {
        // 支持内联JavaScript
        javascriptEnable: true
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        // 当遇到源后面跟着/api时，将/api前面的源换成target，然后将修改后的请求进行转发，发送到目标服务器
        target: 'http://139.159.194.91:7001/api/',
        changeOrigin: 'true',  // 改变源
        rewrite: path => path.replace(/^\/api/, '') // 将/api去掉防止重复
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
})
