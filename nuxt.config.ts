export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/icon",
    "@nuxtjs/color-mode"
  ],

  icon: {
    mode: "svg",
  },
  colorMode: {
    classSuffix: "",
  },
  imports: {
    dirs: ["./store"],
  },
  
  // setups
  pinia: {
    storesDirs: ["defineStore", "acceptHMRUpdate", "storeToRefs"],
  },

  runtimeConfig: {
    public: {
      baseURL: process.env.API_URL || "http:localhost:4000",
      R2_ENDPOINT: process.env.R2_ENDPOINT || "",
    },
  },
});