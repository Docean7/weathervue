<template>
  <v-container grid-list-md>
    <v-layout justify-center>
    <v-flex xs12 sm6 d-flex>
      <v-select
        v-model="selected"
        item-text="name"
        item-value="id"
        :items="cities"
        label="Select city"
      ></v-select>
    </v-flex>
    <div class="text-xs-center">
      <v-btn @click="addCard" round color="primary" dark>Add city</v-btn>
    </div>
    </v-layout>
    <v-layout justify-space-around wrap>
      <v-flex md6>
        <card v-for="card in cards" :key="card" :cityId="card" @delete-event="deleteCard"></card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable no-undef */

import Card from './Card'

export default {
  name: 'CardList',
  components: {Card},
  data () {
    return {
      selected: '',
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
      this.$store.commit('addCard', this.selected)
    },
    deleteCard: function (id) {
      this.$store.commit('deleteCard', id)
    }
  }
}
</script>

<style scoped>

</style>
