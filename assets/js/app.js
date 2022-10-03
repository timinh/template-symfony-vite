import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import {setupLayouts} from 'virtual:generated-layouts'
import pages from '~pages'
import App from './App.vue'
import '../scss/app.scss'

const routes = setupLayouts(pages)

const router = createRouter({
    history: createWebHistory(),
    routes
})
createApp(App).use(router).use(createPinia()).mount('#app')