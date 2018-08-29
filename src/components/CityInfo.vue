<template>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{content.name}}</h3>
        </div>
      </v-card-title>
      <v-card-text>
        Temperature: {{(content.main.temp - 273.1).toFixed(0)}} &deg;C
        <br>
        Description:{{content.weather[0].description}}
        <br>
        Wind: {{content.wind.speed}}m/s
        <br>
        Clouds: {{content.clouds.all}}%
        <br>
        Pressure: {{content.main.pressure}} hpa
        <br>
        Humidity: {{content.main.humidity}}%
        <br>
        <v-btn id="back-btn" color="primary" @click="$router.push(`/`)">Go Back</v-btn>
      </v-card-text>
    </v-card>
</template>

<script>
export default {
  name: 'CityInfo',
  props: ['cityId'],
  data () {
    return {
    }
  },
  computed: {
    content () {
      return this.$store.getters.getCardById(this.cityId)
    }
  }
}

</script>

<style scoped>

</style>
