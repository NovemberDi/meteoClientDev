import SensorPanel from "@/components/SensorPanel"
import HistoryCharts from "@/components/HistoryCharts"
import { createRouter, createWebHistory } from "vue-router"


const routes = [
  {
    path: '/',
    component: SensorPanel
  },
  {
    path: '/history',
    component: HistoryCharts
  },

]
const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
  })

  export default router;