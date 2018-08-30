<template>
  <div class="wrapper">
    <v-card class="card">
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
        <v-btn id="back-btn" color="error" @click="$router.push(`/`)">Go Back</v-btn>
      </v-card-text>
    </v-card>
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
  .wrapper {
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
  .card {
    grid-column: 3/-3;
    grid-row: 2/3;

    font-size: 18px;
    font-family: Georgia, serif;

    display: grid;
    justify-items: center;

    background: rgb(240,249,255);
    background: linear-gradient(45deg, rgba(240,249,255,1) 5%,rgba(240,249,255,1) 5%,rgba(203,235,255,1) 47%,rgba(161,219,255,1) 78%);
    opacity: .8;
  }

</style>
