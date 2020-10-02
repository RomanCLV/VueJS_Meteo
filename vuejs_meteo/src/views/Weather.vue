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
                <b-carousel-slide v-for="(item, index) in this.weatherDataList.list" v-bind:key="index" img-blank>
                    <template v-slot:img name="item.dt">
                        <WeatherCard class="d-block class-name" name="item.dt_text"
                                     v-bind:weatherData=item
                                     v-bind:weather-img="`http://openweathermap.org/img/w/${item['weather'][0].icon}.png`"
                                     v-bind:hour="(item.dt + item.tz - 7200).toString()"
                        >
                        </WeatherCard>
                    </template>
                </b-carousel-slide>
            </b-carousel>
            <div>
                <b-form-input id="range-2" v-model="value" type="range" min="0" v-bind:max="this.weatherDataList.list.length-1" step="1" @update="setSlide" @change="setSlide"></b-form-input>
            </div>
            <b-button v-b-toggle="'collapse-2'" >voir la table</b-button>
            <b-collapse id="collapse-2">
                <TableCustom v-bind:weatherDataList="this.weatherDataList" />
                <b-button v-b-toggle="'collapse-2'" >Fermer</b-button>
            </b-collapse>
            <JumboMap2></JumboMap2>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import WeatherCard from '../components/WeatherCard.vue';
    import { API_KEY } from "@/API/OpenWeatherMap/API_KEY";
    import JumboMap2 from "../components/JumboMap2";
    import TableCustom from "../components/TableCustom";

    export default {
        name: 'Weather',
        components: {TableCustom, JumboMap2, WeatherCard },
        data() {
            return {
                forecast: null,
                value: 0,
                slide: 0,
                sliding: null,
                coord: null,
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
          },
        },
        asyncComputed: {
            weatherDataList: {
                async get() {
                    return await axios.get('http://api.openweathermap.org/data/2.5/forecast?q=' + this.$route.params.city + '&appid=' +API_KEY + '&units=metric&lang=fr')
                        .then((response) => {
                            console.log(response.data.city.coord)
                            this.$store.commit("updateLocation", response.data.city.coord);
                            for(let i = 0; i < response.data.list.length; i++) {
                            response.data.list[i].tz = response.data.city.timezone;
                            response.data.list[i].city = response.data.city.name;
                            response.data.list[i].country = response.data.city.country;
                          }
                          return response.data;
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
