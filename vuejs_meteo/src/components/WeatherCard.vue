<template>
  <b-jumbotron v-bind:header="city" v-bind:lead="hour | formatDate">
    <b-list-group>
      <b-list-group-item>
        <b-container class="bv-example-row">
          <b-row>
            <b-col md="2"><img v-bind:src="weatherImg" width="50" alt=""></b-col>
            <b-col align="left">
              <div>
                Temps : {{ weatherData.weather[0].description }}
              </div>
            </b-col>
          </b-row>
        </b-container>
      </b-list-group-item>
      <b-list-group-item>
        <b-container class="bv-example-row">
          <b-row>
            <b-col md="2" class="h1 mb-2">
              <b-icon-thermometer variant="danger" size="50"></b-icon-thermometer>
            </b-col>
            <b-col align="left">
              <div>Température moyenne :
                {{ (weatherData.main.temp_min + weatherData.main.temp_max) / 2 | tempFormat }}
              </div>
              <div>Température : {{ weatherData.main.temp | tempFormat }}</div>
              <div>Ressentie : {{ weatherData.main.feels_like | tempFormat }}</div>
            </b-col>
          </b-row>
        </b-container>
      </b-list-group-item>
      <b-list-group-item>
        <b-container class="bv-example-row">
          <b-row>
            <b-col md="2">
              <DropIcon v-bind:humidity="weatherData.main.humidity" v-bind:variant="'primary'"/>
            </b-col>
            <b-col align="left">
              {{ weatherData.main.humidity }}%
            </b-col>
          </b-row>
        </b-container>
      </b-list-group-item>
    </b-list-group>
    <b-button variant="primary" href="#">More Info</b-button>
  </b-jumbotron>
</template>

<script>
import Vue from 'vue';
import moment from 'moment';
import DropIcon from "./DropIcon";

Vue.use(moment);

export default {
  name: 'WeatherCard',
  components: {DropIcon},
  props: {
    weatherData: Object,
    weatherImg: String,
    city: String,
    hour: String
  },
  data() {
    return {
      lang: 'fr',
    }
  },
  /* computed: {
    weatherImgUrl: {
      get() {
        return `http://openweathermap.org/img/w/${this.weather.weather[0].icon}.png`;
      },
    },
  }, */
  filters: {
    tempFormat: function (temperature) {
      return `${Math.round(temperature * 100) / 100} °C`;
    },
    formatDate : function (value) {
      console.log("date:");
      console.log(value);
      return moment(value*1000).locale('fr').format('DD/MM/YYYY - HH:mm');
    }

  }
};
</script>

<style scoped>
.mb-2, .my-2, .card {
  margin: auto !important;
}
</style>
