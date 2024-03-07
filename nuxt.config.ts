// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  buildModules: ['@nuxtjs/dotenv'],
  modules: ["@nuxtjs/tailwindcss"],
  serverMiddleware: ['~/server/api/proxy.ts'],
  server: {
    middleware: [
      // เพิ่ม middleware อื่นของคุณ
      async (req, res) => {
        if (req.url === '/api/proxy') {
          // โค้ดจาก server/api/proxy.ts ของคุณ
          return defineEventHandler(async (event) => {
            try {
              const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJzdWIiOjEsImlhdCI6MTcwOTYyNDA1MSwiZXhwIjozMzI0NTYyNDA1MX0.01BroMNk9JXcaluf4IJ1HuZeCfDGAmxB5lgjhTFUOqE'

              const response = await fetch('http://wallserver.dyndns.info:10000/product/all', {
                headers: {
                  Authorization: `Bearer ${TOKEN}`,
                },
              })

              if (response.status === 401) {
                return 'Unauthorized';
              } else if (!response.ok) {
                return { error: response.statusText };
              }

              const data = await response.json();
              return data.message;

            } catch (error) {
              console.error('Error proxying API request:', error);
              return { error: 'Internal Server Error' };
            }
          })(event);
        }
      }
    ]
  },
  proxy: {
    '/api': {
      target: 'http://wallserver.dyndns.info:10000/product/all', // Your NestJS backend URL
      pathRewrite: { '^/api': '' }
    }
  },
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
      TOKEN: process.env.TOKEN,
    },
  },
})