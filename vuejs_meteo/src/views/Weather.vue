<template>
    <div>
        <div>
            <!--{{meteoData}}
            <WeatherCard v-bind:meteo=this.meteoData></WeatherCard>-->
            <ul>
                <li v-for="(weather, index) in this.weatherDataList" v-bind:key="index">
                    <WeatherCard v-bind:weatherData=weather v-bind:weather-img="`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`"></WeatherCard>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import WeatherCard from '../components/WeatherCard.vue';

    export default {
        name: 'Weather',
        components: { WeatherCard },
        data() {
            return {
                forecast: null,
            };
        },
        methods: {

        },
        asyncComputed: {
            weatherDataList: {
                async get() {
                    return await axios.get('http://api.openweathermap.org/data/2.5/forecast?q=cergy&appid=f2580a158c61ea6ae4b9faad15db864b&units=metric&lang=fr')
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
