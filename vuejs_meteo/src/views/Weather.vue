<template>
    <div>
        <div>
            <!--{{meteoData}}
            <WeatherCard v-bind:meteo=this.meteoData></WeatherCard>-->
          <b-carousel
              id="carousel-1"
              v-model="slide"
              :interval="4000"
              controls
              indicators
              background="#ababab"
              img-width="1024"
              img-height="300"
              style="text-shadow: 1px 1px 2px #333;"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
          >
            <b-carousel-slide v-for="(weather, index) in this.weatherDataList" v-bind:key="index" img-blank>

              <WeatherCard v-bind:weatherData=weather v-bind:weather-img="`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`"></WeatherCard>
            </b-carousel-slide>

          </b-carousel>
        </div>
      <div>
        <b-form-input id="range-2" v-model="value" type="range" min="0" v-bind:max="this.weatherDataList.length-1" step="1" @change="setSlide"></b-form-input>
      </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import WeatherCard from '../components/WeatherCard.vue';
    import { API_KEY } from "@/API/OpenWeatherMap/API_KEY";

    export default {
        name: 'Weather',
        components: { WeatherCard },
        props:{
            city:String,
        },
        data() {
            return {
              forecast: null,
              value: 0,
              slide: 0,
              sliding: null,
            };
        },
        methods: {
          onSlideStart() {
            this.sliding = true;
            this.value = this.slide
          },
          onSlideEnd() {
            this.sliding = false
            this.value = this.slide
          },
          setSlide(){
            this.slide = this.value
          }
        },
        asyncComputed: {
            weatherDataList: {
                async get() {
                    return await axios.get('http://api.openweathermap.org/data/2.5/forecast?q=cergy&appid=' +API_KEY + '&units=metric&lang=fr')
                        .then((response) => response.data.list);
                    /* return axios.get('http://api.openweathermap.org/data/2.5/weather?q=cergy&appid=f2580a158c61ea6ae4b9faad15db864b&units=metric&lang=fr')
                      .then((response) => response.data); */
                },
                default() {
                    return 'Chargement';
                },
            },
        },
    };
</script>

<style scoped>
    li{
        display: block;
    }

</style>
