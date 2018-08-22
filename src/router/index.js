import Vue from 'vue'
import Router from 'vue-router'
import CardList from '../components/CardList.vue'
import CardItem from '../components/CardItem.vue'
import store from '../store/index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: CardList
    },
    {
      path: '/:cityId',
      component: CardItem,
      props: true
    }
  ],
  mode: 'history'
})
router.beforeEach((to, from, next) => {
  store.commit('changeView')
  next()
})
export default router
