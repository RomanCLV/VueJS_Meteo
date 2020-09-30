<template>
    <div >
        <b-card
                v-bind:title="weatherData.dt | formatDate(this.lang)"
                tag="article"
                style="max-width: 40rem;"
                class="mb-2"
        >

            <b-card-text>
                <div><strong>{{$route.params.city}}</strong></div>

                <b-list-group>
                    <b-list-group-item>
                        <b-container class="bv-example-row">
                            <b-row>
                                <b-col md="2"><img v-bind:src="weatherImg" width="50" alt=""></b-col>
                                <b-col align="left">
                                    <div>
                                        temps : {{weatherData.weather[0].description}}
                                    </div>
                                </b-col>
                            </b-row>
                        </b-container>
                    </b-list-group-item>
                    <b-list-group-item>
                        <b-container class="bv-example-row">
                            <b-row>
                                <b-col md="2" class="h1 mb-2">
                                    <b-icon-thermometer variant="danger" size="50"></b-icon-thermometer>
                                </b-col>
                                <b-col align="left">
                                    <div>température moyenne : {{ (weatherData.main.temp_min + weatherData.main.temp_max)/2 | tempFormat}}</div>
                                    <div>température : {{weatherData.main.temp | tempFormat}}</div>
                                    <div>ressentie : {{weatherData.main.feels_like | tempFormat}}</div>
                                </b-col>
                            </b-row>
                        </b-container>
                    </b-list-group-item>

                    <b-list-group-item>

                        <b-container class="bv-example-row">
                            <b-row>
                                <b-col md="2"><img src='https://picsum.photos/200/200/?image=20' width="50" alt=""></b-col>
                                <b-col align="left">
                                    {{weatherData.main.humidity}}%

                                </b-col>
                            </b-row>
                        </b-container>
                    </b-list-group-item>

                </b-list-group>
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
            },
            tempFormat: function(temperature) {
                return `${Math.round(temperature*100)/100} °C`;
            },
        }
    };
</script>

<style scoped>
    .mb-2, .my-2, .card{
        margin: auto !important;
    }
</style>
