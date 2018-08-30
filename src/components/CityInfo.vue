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
        <v-btn id="back-btn" color="primary" @click="$router.push(`/`)">Go Back</v-btn>
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

    background: rgb(255,254,249);
    background: linear-gradient(45deg, rgba(255,254,249,1) 0%,rgba(251,245,201,1) 0%);
  }

</style>
