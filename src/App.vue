<template>
  <div id="app">
    <card-list></card-list>
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
