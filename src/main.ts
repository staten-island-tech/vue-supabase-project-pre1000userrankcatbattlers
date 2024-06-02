import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { MdArrowcircleleftRound, MdArrowcirclerightRound, BiXSquareFill, ViFileTypeChefCookbook  } from "oh-vue-icons/icons";
addIcons(MdArrowcircleleftRound, MdArrowcirclerightRound, BiXSquareFill, ViFileTypeChefCookbook );

app.component("v-icon", OhVueIcon);

app.mount('#app')
