<template>
    <div>
        <div>
            <b-carousel
                id="carousel-1"
                v-model="slide"
                :interval="10000"
                controls
                indicators
                background="aliceblue"
                img-width="1080"
                img-height="480"
                style="text-shadow: 1px 1px 2px #333;"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
            >
                <b-carousel-slide v-for="(item, index) in this.weatherDataList" v-bind:key="index" img-blank>
                    <template v-slot:img>
                        <WeatherCard class="d-block class-name"
                                     v-bind:weatherData=item
                                     v-bind:weather-img="`http://openweathermap.org/img/w/${item['weather'][0].icon}.png`"
                                     v-bind:hour="(item.dt + item.tz - 7200).toString()"
                        >
                        </WeatherCard>
                    </template>
                </b-carousel-slide>
            </b-carousel>
            <div>
                <b-form-input id="range-2" v-model="value" type="range" min="0" v-bind:max="this.weatherDataList.length-1" step="1" @update="setSlide" @change="setSlide"></b-form-input>
            </div>
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
        data() {
            return {
                forecast: null,
                value: 0,
                slide: 0,
                sliding: null,
                coord: null
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
                    return await axios.get('http://api.openweathermap.org/data/2.5/forecast?q=' + this.$route.params.city + '&appid=' +API_KEY + '&units=metric&lang=fr')
                        .then((response) => {
                          for(let i = 0; i < response.data.list.length; i++) {
                            response.data.list[i].tz = response.data.city.timezone;
                            response.data.list[i].city = response.data.city.name;
                            response.data.list[i].country = response.data.city.country;
                            this.coord = response.data.city.coord;
                          }
                          return response.data.list;
                        });
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
    .class-name{
        min-height:60vh;
        height: 100%;
    }
</style>
