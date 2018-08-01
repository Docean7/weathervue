<template>
  <div id="app">
    <v-app>
        <card-list></card-list>
    </v-app>
  </div>
</template>

<script>
import Card from './components/Card'
import CardList from './components/CardList'

export default {
  name: 'App',
  components: {CardList, Card}
}
</script>
