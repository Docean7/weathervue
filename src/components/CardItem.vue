<template>
  <div>
    <v-card hover="true">
      <v-card-title primary-title @click="showInfo">
        <div>
          <div class="headline"> {{content.name}}</div>
          <span class="grey--text">{{updateTime}}</span>
        </div>
      </v-card-title>
      <v-slide-y-transition>
        <v-card-text @click="showInfo">
          Temperature: {{(content.main.temp - 273.1).toFixed(0)}} &deg;C
          <br>
          Description:{{content.weather[0].description}}
        </v-card-text>
      </v-slide-y-transition>
      <v-card-actions>
        <v-btn flat @click="getContent" icon color="green"><v-icon>cached</v-icon></v-btn>
        <v-spacer></v-spacer>
        <v-btn flat icon color="red" @click="$emit('delete-event', id)"><v-icon>delete</v-icon></v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { EventBus } from './event-bus'
import axios from 'axios'

export default {
  name: 'CardItem',
  props: ['cityId'],
  data () {
    return {
      id: this.cityId,
      updateTime: ''
    }
  },
  computed: {
    content () {
      return this.$store.getters.getCardById(this.id)
    }
  },
  mounted: function () {
    EventBus.$on('updateAll', this.getContent)
  },
  methods: {
    getContent: function () {
      axios.get('http://api.openweathermap.org/data/2.5/weather?id=' + this.cityId + '&APPID=1f9ddba14ce2ca6ba236f881ce267b8f')
        .then((response) => {
          console.log(response)
          this.$store.commit('updateCard', response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
      this.updateTime = new Date().toLocaleTimeString()
    },
    showInfo: function () {
      this.$router.push(`/${this.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    display: grid;
    justify-content: center;
    /*font-size: 20px;*/
  }
</style>
