import { createApp } from 'vue'
import './style.css'
import 'virtual:uno.css'
import App from './App.vue'
import { router } from './router'
import {store} from "./store";

createApp(App).use(store).use(router).mount('#app')
