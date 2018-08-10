<template>
  <div>
    <v-card hover="true">
      <v-card-title primary-title @click="detailed = !detailed">
        <div>
          <div class="headline"> {{content.name}}</div>
          <span class="grey--text">{{updateTime}}</span>
        </div>
      </v-card-title>
      <v-slide-y-transition>
        <v-card-text @click="detailed = !detailed">
          Temperature: {{(content.main.temp - 273.1).toFixed(0)}} &deg;C
          <br>
          Description:{{content.weather[0].description}}
          <div v-show="detailed">
            Wind: {{content.wind.speed}}m/s
            <br>
            Clouds: {{content.clouds.all}}%
            <br>
            Pressure: {{content.main.pressure}} hpa
            <br>
            Humidity: {{content.main.humidity}}%
          </div>
        </v-card-text>
      </v-slide-y-transition>
      <v-card-actions>
        <v-btn flat @click="getContent" icon color="green"> <v-icon>cached</v-icon></v-btn>
        <v-btn flat icon color="red" @click="$emit('delete-event', id)"><v-icon>delete</v-icon></v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="detailed = !detailed">
          <v-icon>{{ detailed ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { EventBus } from './event-bus'
const axios = require('axios')
export default {
  name: 'CardItem',
  props: ['cityId'],
  data () {
    return {
      id: this.cityId,
      content: {},
      detailed: false,
      updateTime: ''
    }
  },
  mounted: function () {
    this.getContent()
    EventBus.$on('updateAll', this.getContent)
  },
  methods: {
    getContent: function () {
      axios.get('http://api.openweathermap.org/data/2.5/weather?id=' + this.cityId + '&APPID=1f9ddba14ce2ca6ba236f881ce267b8f')
        .then((response) => {
          console.log(response)
          this.content = response.data
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
      this.updateTime = new Date().toLocaleTimeString()
    }
  }
}
</script>

<style lang="scss" scoped>
  //add style
</style>
