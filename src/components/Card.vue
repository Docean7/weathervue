<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card hover="true">
          <v-card-title primary-title @click="detailed = !detailed">
            <div class="headline"> {{content.name}}</div>
            <v-btn icon>
              <v-icon>{{ detailed ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
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
            <v-btn flat @click="updateContent">Update</v-btn>
            <v-btn flat color="purple" @click="$emit('delete-event', id)">Delete</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const axios = require('axios')
export default {
  name: 'Card',
  props: ['cityId'],
  data () {
    return {
      id: this.cityId,
      content: {},
      detailed: false
    }
  },
  mounted: function () {
    this.updateContent()
  },
  methods: {
    updateContent: function () {
      axios.get('http://api.openweathermap.org/data/2.5/weather?id=' + this.cityId + '&APPID=1f9ddba14ce2ca6ba236f881ce267b8f')
        .then((response) => {
          console.log(response)
          this.content = response.data
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  //add style
</style>
