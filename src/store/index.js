import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cards: []
  },
  getters: {
    getCardById: (state) => (id) => {
      return state.cards.find(el => el.id === id)
    }
  },
  mutations: {
    addCard (state, info) {
      state.cards.push(info)
    },
    updateCard (state, info) {
      state.cards.splice(state.cards.findIndex(el => el.id === info.id), 1, info)
    },
    deleteCard (state, id) {
      state.cards.splice(state.cards.findIndex(info => info.id === id), 1)
    },
    deleteAll (state) {
      state.cards = []
    }
  }
})
