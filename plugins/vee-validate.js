import { defineNuxtPlugin } from '#app'
import { defineRule, Form, Field, ErrorMessage, configure } from 'vee-validate'
import { required, email, min, max } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zh_TW from '@vee-validate/i18n/dist/locale/zh_TW.json'

export default defineNuxtPlugin((nuxtApp) => {
  defineRule('required', required)
  defineRule('email', email)
  defineRule('min', min)
  defineRule('max', max)

  configure({
    generateMessage: localize({ zh_TW }),
    validateOnInput: true
  })
  setLocale('zh_TW')

  nuxtApp.vueApp.component('VForm', Form)
  nuxtApp.vueApp.component('VField', Field)
  nuxtApp.vueApp.component('ErrorMessage', ErrorMessage)
})
