<template>
  <b-jumbotron v-bind:header="getHeader" v-bind:lead="hour | formatDate">
    <b-list-group>
      <b-list-group-item>
        <b-container class="bv-example-row">
          <b-row>
            <b-col md="2" align-self="center">
              <img v-bind:src="weatherImg" width="50" alt="">
            </b-col>
            <b-col align-self="center">
              <div align="left">
                Temps : {{ weatherData.weather[0].description }}
              </div>
            </b-col>
          </b-row>
        </b-container>
      </b-list-group-item>

      <b-list-group-item>
        <b-container class="bv-example-row">
          <b-row>
            <b-col md="2" class="h1 mb-2" align-self="center">
              <b-icon-thermometer variant="danger" size="50"></b-icon-thermometer>
            </b-col>
            <b-col align-self="center">
              <div align="left">
                <div>Température moyenne :
                  {{ (weatherData.main.temp_min + weatherData.main.temp_max) / 2 | tempFormat }}
                </div>
                <div>Température : {{ weatherData.main.temp | tempFormat }}</div>
                <div>Ressentie : {{ weatherData.main.feels_like | tempFormat }}</div>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </b-list-group-item>

      <b-list-group-item>
        <b-container class="bv-example-row">
          <b-row>
            <b-col md="2" align-self="center">
              <DropIcon v-bind:humidity="weatherData.main.humidity" v-bind:variant="'primary'"/>
            </b-col>
            <b-col md="4" align-self="center">
              <div align="left">
                {{ weatherData.main.humidity }}%
              </div>
            </b-col>
          </b-row>
        </b-container>
      </b-list-group-item>

        <b-list-group-item>
          <b-container class="bv-example-row">
            <b-row>
              <b-col md="2" align-self="center">
                <span class="icon"><font-awesome-icon :icon="iconPressure"/></span>
              </b-col>
              <b-col align-self="center">
                <div align="left">
                  <span class="iconText"> {{ weatherData.main.pressure }} hpa</span>
                </div>
              </b-col>
            </b-row>
          </b-container>
        </b-list-group-item>

      <b-list-group-item>
        <b-container class="bv-example-row">
          <b-row>
            <b-col md="2" align-self="center">
              <span class="icon"><font-awesome-icon :icon="iconWind"/></span>
            </b-col>
            <b-col align-self="center">
              <div align="left">
                <span class="iconText"> {{ weatherData.wind.speed }} m.s<i style="vertical-align: super">-1</i></span>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </b-list-group-item>

    </b-list-group>
  </b-jumbotron>
</template>

<script>
import Vue from 'vue';
import moment from 'moment';
import DropIcon from "./DropIcon";
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {faWind, faTachometerAlt} from '@fortawesome/free-solid-svg-icons';

Vue.use(moment);

export default {
  name: 'WeatherCard',
  components: {
    DropIcon,
    FontAwesomeIcon
  },
  data() {
    return {
      iconPressure: faTachometerAlt,
      iconWind: faWind
    }
  },
  props: {
    weatherData: Object,
    weatherImg: String,
    hour: String
  },
  computed: {
    getHeader: function () {
      return this.weatherData.city.toUpperCase() + ", " + this.weatherData.country;
    }
  },
  filters: {
    tempFormat: function (temperature) {
      return `${Math.round(temperature * 100) / 100} °C`;
    },
    formatDate : function (value) {
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
