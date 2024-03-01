import './assets/all.scss'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'


import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'

const app = createApp(App)

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
configure({
    generateMessage: localize({ zh_TW: zhTW }),
    validateOnInput: true
})

setLocale('zh_TW')

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
