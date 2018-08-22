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
          <v-text-field
            v-model="cityName"
            label="Solo"
            placeholder="Enter city name"
            solo
            clearable
          ></v-text-field>
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
import axios from 'axios'

export default {
  name: 'CardList',
  components: {CardItem, Multiselect},
  data () {
    return {
      cityName: ''
    }
  },
  computed: {
    cards () {
      return this.$store.state.cards
    }
  },
  methods: {
    addCard: function () {
      if (this.cityName) {
        axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + this.cityName + '&APPID=1f9ddba14ce2ca6ba236f881ce267b8f')
          .then((response) => {
            if (!this.$store.state.cards.includes(response.data.id)) {
              this.$store.commit('addCard', response.data.id)
            } else {
              alert('This city is already added')
            }
          })
          .catch(function (error) {
            console.log(error)
            alert('City not found')
          })
      }
    },
    deleteCard: function (id) {
      if (confirm('Delete this card ?')) {
        this.$store.commit('deleteCard', id)
      }
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
<style scoped>

</style>
