<template>
  <b-row class="meteoCard">
    <b-col sm="12">
      <b-card
          overlay
          :img-src="imgUrl"
          text-variant="white"
          img-height="500"
      >
        <b-card-text>
          <b-row>
            <b-col>
              <span class="icon"><font-awesome-icon :icon="iconWind"/></span>
              <span class="iconText"> {{ wind }} m/s</span>
            </b-col>
            <b-col>
              <span class="icon"><font-awesome-icon :icon="iconPressure"/></span>
              <span class="iconText"> {{ pressure }}</span>
            </b-col>
            <b-col>
              <span class="icon"><font-awesome-icon :icon="iconHumidity"/></span>
              <span class="iconText"> {{ humidity }}%</span>
            </b-col>
          </b-row>
        </b-card-text>

        <b-card-text @click="changeTemperatureUnity">
          <b-row class="align-items-center">
            <b-col>
              <span class="textTemp">{{ { temp: temp, unit: tempUnit } | convertTemperature }}</span>
            </b-col>
            <b-col>
              <b-row>
                <span class="iconSmale"><font-awesome-icon :icon="iconArrowUp"/></span>
                <span class="iconText">  {{ { temp: temp_max, unit: tempUnit } | convertTemperature }}</span>
              </b-row>
              <b-row>
                <span class="iconSmale"><font-awesome-icon :icon="iconArrowDown"/></span>
                <span class="iconText">  {{ { temp: temp_min, unit: tempUnit } | convertTemperature }}</span>
              </b-row>
            </b-col>
          </b-row>
        </b-card-text>

        <b-card-text>
          <b-row>
            <b-col class="textCity">
              {{ name | stringUpper }}, {{ country | stringUpper }}
            </b-col>
          </b-row>
        </b-card-text>

        <b-card-text>
          <b-row>
            <b-col class="textDescription">
              {{ description }}
            </b-col>
          </b-row>

        </b-card-text>
        <b-card-text>
          <img v-if="icon !== null" alt="logoWeather" class="iconWeather"
               v-bind:src="'http://openweathermap.org/img/wn/' + icon + '.png'">
          <b-button variant="primary" href="#" @click="searchWeatherCity">Voir les prévisions</b-button>

        </b-card-text>
      </b-card>
    </b-col>

  </b-row>
</template>

<script>
import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'
import axios from "axios";
import {API_KEY} from "@/API/OpenWeatherMap/API_KEY";
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {faWind, faTint, faTachometerAlt, faLongArrowAltUp, faLongArrowAltDown} from '@fortawesome/free-solid-svg-icons';

Vue.use(AsyncComputed);

export default {
  name: "MeteoCard",
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      name: "",
      country: "",
      temp: 0,
      temp_min: 0,
      temp_max: 0,
      wind: 0,
      humidity: 0,
      pressure: 0,
      description: "",
      icon: null,
      iconWind: faWind,
      iconHumidity: faTint,
      iconPressure: faTachometerAlt,
      iconArrowUp: faLongArrowAltUp,
      iconArrowDown: faLongArrowAltDown,
      tempUnit: "celsius",
    }
  },
  props: {
    city: String,
    imgUrl: String
  },
  asyncComputed: {
    getData: async function () {
      const weatherData = await axios
          .get("http://api.openweathermap.org/data/2.5/weather?q=" + this.city + "&appid=" + API_KEY)
          .then(data => data.data)
          .catch(error => {
            console.log("Error :");
            console.log(error);
            return null;
          });
      if (weatherData !== null) {
        this.name = weatherData.name;
        this.country = weatherData.sys.country;
        this.wind = weatherData.wind.speed;
        this.temp = weatherData.main.temp;
        this.temp_min = weatherData.main.temp_min;
        this.temp_max = weatherData.main.temp_max;
        this.humidity = weatherData.main.humidity;
        this.pressure = weatherData.main.pressure;
        this.description = weatherData['weather'][0].main;
        this.icon = weatherData['weather'][0].icon;
      }
    }
  },
  methods: {
    changeTemperatureUnity: function() {
      switch (this.tempUnit) {
        case "celsius":
          this.tempUnit = "fahrenheit";
          break;
        case "fahrenheit":
          this.tempUnit = "kelvin";
          break;
        case "kelvin":
          this.tempUnit = "celsius";
          break;
      }
    },
   searchWeatherCity() {
      this.$store.commit('setCity', this.city);
      this.$router.push('/weather/'+this.city);
    },
    getCityStore(){
      this.city = this.$store.getters.lastCity;
    }
  },
  filters: {
    stringUpper: function (value) {
      return value.toUpperCase();
    },
    getTemperatureUnity: function (value) {
      switch (value) {
        case "celsius":
          return "°C";
        case "fahrenheit":
          return "°F";
        case "kelvin":
          return "K";
        default:
          return "";
      }
    },
    convertTemperature: function (value) {
      switch (value.unit) {
        case "celsius":
          value.temp -= 273.15;
          return (Math.round(value.temp * 10) / 10) + "°C";
        case "fahrenheit":
          value.temp = ((value.temp - 273.15) * (9/5)) + 32;
          return (Math.round(value.temp * 10) / 10) + "°F";
        case "kelvin":
          return (Math.round(value.temp * 10) / 10) + " K";
        default:
          return value.temp;
      }
    }
  }
}
</script>

<style scoped>

.meteoCard {
  margin: 10%;
}

.iconSmale {
  color: white;
  font-size: 1em;
}

.icon {
  color: white;
  font-size: 1.3em;
}

.iconText {
  font-size: 16px;
  text-shadow: #000000 0 0 5px;
}

.textCity {
  font-size: 25px;
  text-shadow: #000000 0 0 5px;
}

.textDescription {
  font-size: 20px;
  text-shadow: #000000 0 0 5px;
}

.textTemp {
  font-size: 50px;
  text-shadow: #000000 0 0 5px;
}

.iconWeather {
  width: 50%;
  height: auto;
  object-fit: cover;
}

</style>
