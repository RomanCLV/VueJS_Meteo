<template>
    <div >

        <b-card
                v-bind:title="weatherData.dt | formatDate(this.lang)"
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
        >
            <b-card-text>
                <img v-bind:src="weatherImg" width="50px">
                <div><strong> nom a venir</strong></div>
                <div>température : {{weatherData.main.temp}} °C</div>
                <div>température moyenne : {{ (weatherData.main.temp_min + weatherData.main.temp_max)/2}} °C</div>

                <div>ressentie : {{weatherData.main.feels_like}}</div>
                <div>humidité : {{weatherData.main.humidity}}</div>
                <div>temps : {{weatherData.weather[0].description}}</div>
                <p v-if="weatherData.dt!=null">{{ weatherData.dt | formatDate(this.lang)  }}</p>

            </b-card-text>
        </b-card>
    </div>
</template>

<script>
    import moment from 'moment'

    export default {
        name: 'WeatherCard',
        props: {
            weatherData: Object,
            weatherImg: String,
        },
        data() {
            return {
                lang:'fr',
            };
        },
        /* computed: {
          weatherImgUrl: {
            get() {
              return `http://openweathermap.org/img/w/${this.weather.weather[0].icon}.png`;
            },
          },
        }, */
        filters:{
            formatDate: function(date, lang) {
                return moment(date*1000).locale(lang).format('Do MMMM YYYY HH:mm');
            },
            tempAverage: function(date, lang) {
                return moment(date).locale(lang).format('Do MMMM YYYY ');
            }
        }
    };
</script>

<style scoped>
    .mb-2, .my-2, .card{
        margin: auto !important;
    }
</style>
