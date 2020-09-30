<template>
    <div>

        <b-card
                v-bind:title="weatherData.dt_txt"
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
            </b-card-text>
        </b-card>
    </div>
</template>

<script>

    export default {
        name: 'WeatherCard',
        props: {
            weatherData: Object,
            weatherImg: String,
        },
        data() {
            return {

            };
        },
        /* computed: {
          weatherImgUrl: {
            get() {
              return `http://openweathermap.org/img/w/${this.weather.weather[0].icon}.png`;
            },
          },
        }, */
    };
</script>

<style scoped>

</style>
