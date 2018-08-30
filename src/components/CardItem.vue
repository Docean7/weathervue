<template>
  <div>
    <v-card hover="true" class="card" transparent>
      <v-card-title primary-title @click="showInfo">
        <div>
          <div class="headline"> {{content.name}}</div>
          <span id="timeLine" :style="{opacity: timeOpacity}">{{updateTime}}</span>
        </div>
      </v-card-title>
      <v-slide-y-transition>
        <v-card-text @click="showInfo" class="card-text">
          Temperature: {{(content.main.temp - 273.1).toFixed(0)}} &deg;C
          <br>
          Description:{{content.weather[0].description}}
        </v-card-text>
      </v-slide-y-transition>
      <v-card-actions>
        <v-btn flat @click="getContent" icon color="green"><v-icon>cached</v-icon></v-btn>
        <v-spacer></v-spacer>
        <v-btn flat icon color="red" @click="deleteCardDialog=true"><v-icon>delete</v-icon></v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog
      v-model="deleteCardDialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Confirm
        </v-card-title>

        <v-card-text>
          Do you want to delete this card ?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat="flat"
            @click="deleteCardDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="red"
            flat
            @click="deleteCard"
          >
            Delete card
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { EventBus } from './event-bus'
import axios from 'axios'

export default {
  name: 'CardItem',
  props: ['cityId'],
  data () {
    return {
      id: this.cityId,
      updateTime: new Date().toLocaleTimeString(),
      deleteCardDialog: false,
      timeOpacity: 0
    }
  },
  computed: {
    content () {
      return this.$store.getters.getCardById(this.id)
    }
  },
  mounted () {
    EventBus.$on('updateAll', this.getContent)
  },
  methods: {
    getContent: function () {
      axios.get('http://api.openweathermap.org/data/2.5/weather?id=' + this.cityId + '&APPID=1f9ddba14ce2ca6ba236f881ce267b8f')
        .then((response) => {
          console.log(response)
          this.$store.commit('updateCard', response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
      this.updateTime = new Date().toLocaleTimeString()
      this.timeOpacity = 1
    },
    showInfo: function () {
      this.$router.push(`/${this.id}`)
    },
    deleteCard: function () {
      EventBus.$off('updateAll')
      this.$emit('delete-event', this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    background: rgb(240,249,255);
    background: linear-gradient(45deg, rgba(240,249,255,1) 5%,rgba(240,249,255,1) 5%,rgba(203,235,255,1) 47%,rgba(161,219,255,1) 78%);
    opacity: .8;
  }
  .card-text {
    display: grid;
    justify-content: center;
    font-size: 18px;
    opacity: 1;
  }

  #timeLine {
      color:gray;
    }
</style>
