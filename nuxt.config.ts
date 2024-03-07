// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  buildModules: ['@nuxtjs/dotenv'],
  modules: ["@nuxtjs/tailwindcss"],
  serverMiddleware: ['~/server/api/proxy.ts'],
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
      TOKEN: process.env.TOKEN,
    },
  },
})