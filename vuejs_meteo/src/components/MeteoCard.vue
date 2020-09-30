<template>
  <div class="meteoContainer">
    <p>
      {{city}}
    </p>
  </div>
</template>

<script>
  import Vue from 'vue'
  import AsyncComputed from 'vue-async-computed'
  import axios from "axios";
  import { API_KEY } from "@/API/OpenWeatherMap/API_KEY";

  Vue.use(AsyncComputed);

  export default {
    name: "MeteoCard",

    props: {
      city: String
    },
    asyncComputed: {
      getData: function () {
        console.log(this.city);
        return axios
            .get("http://api.openweathermap.org/data/2.5/weather?q=" + this.city + "&appid=" + API_KEY)
            .then(data => {
              console.log("data : ");
              console.log(data);
              return data;
            })
            .catch(error => {
              console.log("Error :");
              console.log(error);
              return null;
            });
      }
    }
  }

</script>

<style scoped>
  .meteoContainer {
    background-color: aqua;
  }
</style>
