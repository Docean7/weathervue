import Vue from 'vue'
import Router from 'vue-router'
import CityInfo from '../components/CityInfo.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/:cityId',
      component: CityInfo,
      props: true
    }
  ],
  mode: 'history'
})
export default router
