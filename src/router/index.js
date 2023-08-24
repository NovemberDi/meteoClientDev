import SensorPanel from "@/components/SensorPanel"
import HistoryCharts from "@/components/HistoryCharts"
import { createRouter, createWebHashHistory } from "vue-router"


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
    history: createWebHashHistory()
  })

  export default router;