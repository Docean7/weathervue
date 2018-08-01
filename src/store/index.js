import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cards: []
  },
  mutations: {
    addCard (state, id) {
      state.cards.push(id)
    },
    deleteCard (state, id) {
      state.cards.splice(state.cards.indexOf(id), 1)
    }
  }
})
