<template>
  <div class="home">
    <div class="flexCenter">
      <b-form-group
              class="mb-0"
              label-for="input-search"
              description="Ajouter une nouvelle carte de ville"
      >
        <b-form-input size="sm" id="input-search" class="mr-sm-2" v-model="cityName" v-on:keyup.enter="addCity" placeholder="Search city"></b-form-input>
      </b-form-group>
    </div>
    <b-row align-h="around">
      <b-col sm="5" v-for="(city, index) in this.$store.getters.cities" v-bind:key="index">
        <MeteoCard v-bind:city="city.name" v-bind:isDefault="false" v-bind:img-url="require('../assets/pictures/background/' + city.img + '.gif')" />
      </b-col>
    </b-row>
    <b-row align-h="around">
      <b-col sm="5"  v-for="(city, index) in this.$store.getters.defaultCities" v-bind:key="index">
        <MeteoCard v-bind:city="city.name" v-bind:isDefault="true" v-bind:img-url="require('../assets/pictures/default/' + city.img + '.jpg')" />
      </b-col>
    </b-row>

  </div>
</template>

<script>

import MeteoCard from "@/components/MeteoCard";
import axios from "axios";
import {API_KEY} from "@/API/OpenWeatherMap/API_KEY";

export default {
  name: "Home",
  components: {
    MeteoCard
  },
  data() {
    return {
      cityName:"",
    }
  },
  methods: {
    async addCity(){
        const weatherData = await axios
              .get("http://api.openweathermap.org/data/2.5/weather?q=" + this.cityName + "&appid=" + API_KEY)
              .then(data => data.data)
              .catch(error => {
                console.log(error);
                return null;
              });
        if (weatherData !== null && weatherData.cod !== "404") {
          console.log("test addcities")
          this.$store.commit('addCities', { name: weatherData.name, img: "default" });
        }
    }
  },
}

</script>

<style scoped>
  .home {
    margin: 5%;
  }
  .flexCenter{
    display: flex; justify-content: center;
  }
</style>

