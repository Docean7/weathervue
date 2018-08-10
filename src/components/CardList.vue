<template>
  <v-app>
    <v-container>
      <v-layout>
        <div>
          <v-btn large color="primary" @click="updateAll">Update all <v-icon>hourglass_full</v-icon></v-btn>
        </div>
        <v-spacer></v-spacer>
        <div>
          <v-btn large color="error" @click="deleteAll">Delete all <v-icon>delete_forever</v-icon></v-btn>
        </div>
      </v-layout>
      <v-layout justify-center row>
        <v-flex xs12 sm6 d-flex>
          <multiselect v-model="selected" :options="cities" placeholder="Select city" label="name" track-by="name"></multiselect>
        </v-flex>
        <div class="text-xs-center">
          <v-btn @click="addCard" round color="primary" dark>Add city</v-btn>
        </div>
      </v-layout>
      <v-layout justify-space-around wrap>
        <card-item class="my-4" v-for="card in cards" :key="card" :city-id="card" @delete-event="deleteCard"></card-item>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
/* eslint-disable no-undef */

import CardItem from './CardItem'
import Multiselect from 'vue-multiselect'
import { EventBus } from './event-bus'

export default {
  name: 'CardList',
  components: {CardItem, Multiselect},
  data () {
    return {
      selected: {
        name: 'Kharkiv',
        id: '706483'
      },
      cities: [{name: 'Kharkiv', id: 706483}, {name: 'Kiev', id: 703448}, {
        name: 'London',
        id: 4298960
      }, {name: 'New York', id: 5128638},
      {name: 'Vienna', id: 2761369}, {name: 'Paris', id: 2968815}]
    }
  },
  computed: {
    cards () {
      return this.$store.state.cards
    }
  },
  methods: {
    addCard: function () {
      if (this.selected) {
        this.$store.commit('addCard', this.selected.id)
      }
    },
    deleteCard: function (id) {
      this.$store.commit('deleteCard', id)
    },
    updateAll: function () {
      EventBus.$emit('updateAll')
    },
    deleteAll: function () {
      this.$store.commit('deleteAll')
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>
