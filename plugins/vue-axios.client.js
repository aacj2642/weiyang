import { defineNuxtPlugin } from '#app'
import axios from 'axios'
import VueAxios from 'vue-axios'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueAxios, axios)
})
