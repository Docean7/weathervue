<template>
  <div v-if="content">
    Temperature: {{(content.main.temp - 273.1).toFixed(0)}} &deg;C
    <br>
    Description:{{content.weather[0].description}}
    <div>
    Wind: {{content.wind.speed}}m/s
    <br>
    Clouds: {{content.clouds.all}}%
    <br>
    Pressure: {{content.main.pressure}} hpa
    <br>
    Humidity: {{content.main.humidity}}%
    </div>
  </div>
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
