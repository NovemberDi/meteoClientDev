import { createApp } from 'vue'
import App from './App'

import components from '@/components'
import router from './router'
import VueApexCharts from "vue3-apexcharts";


const app = createApp(App);
components.forEach(component=> app.component(component.name, component));
app
    
    .use(router)
    .use(VueApexCharts)
    .mount('#app')
