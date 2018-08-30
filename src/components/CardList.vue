<template>
  <div class="wrapper">

    <v-btn id="update-btn" large color="primary" @click="updateAll">Update all <v-icon>hourglass_full</v-icon></v-btn>
    <v-btn id="delete-btn" large color="error" @click="deleteAllDialog=true">Delete all <v-icon>delete_forever</v-icon></v-btn>
    <v-dialog
      v-model="deleteAllDialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Confirm
        </v-card-title>

        <v-card-text>
          Do you want to delete all the cards ?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat="flat"
            @click="deleteAllDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="red"
            flat
            @click="deleteAll"
          >
            Delete all
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

        <div class="search-field">
          <v-text-field
            v-model="cityName"
            label="Solo"
            placeholder="Enter city name"
            solo
            clearable
          ></v-text-field>
          <div class="text-xs-center">
            <v-btn @click="addCard" round color="green" dark>Add city</v-btn>
          </div>
        </div>
        <transition-group name="list" tag="card-item" class="list">
          <card-item class="my-4" v-for="card in cards" :key="card.id" :city-id="card.id" @delete-event="deleteCard"></card-item>
        </transition-group>
  </div>
</template>

<script>
/* eslint-disable no-undef */

import CardItem from './CardItem'
import { EventBus } from './event-bus'
import axios from 'axios'

export default {
  name: 'CardList',
  components: {CardItem},
  data () {
    return {
      cityName: '',
      deleteAllDialog: false
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
            if (!this.$store.state.cards.find(info => info.id === response.data.id)) {
              this.$store.commit('addCard', response.data)
            } else {
              alert('This city is already added')
            }
          })
          .catch(function (error) {
            console.log(error)
            alert('City not found')
          })
      }
      this.cityName = ''
    },
    deleteCard: function (id) {
      this.$store.commit('deleteCard', id)
    },
    updateAll: function () {
      EventBus.$emit('updateAll')
    },
    deleteAll: function () {
      this.$store.commit('deleteAll')
      this.deleteAllDialog = false
    }
  }
}
</script>
<style scoped>
  .wrapper {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows:  1fr 1fr 3fr
  }

  #update-btn {
    grid-row: 1;
    grid-column: 2/4;
  }
  #delete-btn {
    grid-row: 1;
    grid-column: -4/-2;
  }
  .search-field {
    grid-row: 2;
    grid-column: 2/-2;
  }

  .list {
    grid-row: 3;
    grid-column: 2/-2;
    display: grid;
    grid-template: 1fr/repeat(auto-fit, minmax(400px, .5fr));
    grid-gap: 20px;
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to  {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
