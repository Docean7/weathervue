import Vue from 'vue'
import Router from 'vue-router'
import CityInfo from '../components/CityInfo.vue'
import CardList from '../components/CardList'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: CardList
    },
    {
      path: '/:cityId',
      component: CityInfo,
      props: true
    }
  ],
  mode: 'history'
})
export default router
