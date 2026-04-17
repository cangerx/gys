export default defineNuxtConfig({
  srcDir: 'app',
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  runtimeConfig: {
    public: {
      siteName: '企业客户选品门户',
    },
  },
})
