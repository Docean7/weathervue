<template>
  <div id="app">
    <card-list></card-list>
    <router-view></router-view>
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
