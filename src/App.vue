<template>
    <div id="app">
      <v-app>
        <router-view></router-view>
      </v-app>
    </div>
</template>

<script>
import Card from './components/CardItem'
import CardList from './components/CardList'
import CityInfo from './components/CityInfo'
export default {
  name: 'App',
  components: {CardList, Card, CityInfo}
}
</script>
<style>
  #app {
    margin: auto;
    width: 100%;
    height: 100%;
    background-image: url("./assets/world.jpg");
    background-size: cover;
  }
</style>
