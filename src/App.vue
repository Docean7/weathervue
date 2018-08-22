<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Card from './components/CardItem'
import CardList from './components/CardList'

export default {
  name: 'App',
  components: {CardList, Card}
}
</script>
