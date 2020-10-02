import Vue from 'vue';
import Vuex  from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        defaultCities:[
            {name : "cergy", img:"cergy"},
            {name : "paris", img:"paris"},
            {name : "gdansk", img:"gdansk"},
            {name : "new york", img:"new_york"},
            {name : "sydney", img:"sydney"},
            {name : "moscou", img:"moscou"},
        ],
        cities: [],
        location:{lat:"", lon:""},
        theme:"light",
    },
    getters: {
        cities: state => state.cities,
        defaultCities: state => state.defaultCities,
        location : state => state.location,
        theme: state => state.theme,
    },
    mutations: {
        addCities(state, city) {
            const inDefault = state.defaultCities.filter((item) => item.name.toUpperCase() === city.name.toUpperCase()).length > 0;
            const inCities = state.cities.filter(item => item.name.toUpperCase() === city.name.toUpperCase()).length > 0;

            const max = 3;

            if (!inCities && !inDefault) {
                if (state.cities.length < max) {
                    state.cities.push(city);
                }
                else if (state.cities.length === max) {
                    state.cities.splice(0, 1);
                    state.cities.push(city);
                }
            }
        },
        delCities(state, cityName) {
            if (state.cities.length > 0) {
                state.cities = state.cities.filter(function( obj ) {
                    return obj.name !== cityName;
                });
            }
        },
        updateLocation(state, coords){
            state.location=coords;
        },
        updateImg(state, value) {
            for (let i = 0; i < state.cities.length; i++) {
                if (state.cities[i].name.toLowerCase() === value.name.toLowerCase()) {
                    switch (value.img) {
                        case "Thunderstorm":
                        case "Tornado":
                            state.cities[i].img = "thunderstorm";
                            break;
                        case "Drizzle":
                        case "Rain":
                            state.cities[i].img = "rain";
                            break;
                        case "Snow":
                            state.cities[i].img = "snow";
                            break;
                        case "Clear":
                            state.cities[i].img = "clear";
                            break;
                        case "Clouds":
                            state.cities[i].img = "clouds";
                            break;
                        case "Mist":
                        case "Smoke":
                        case "Haze":
                        case "Dust":
                        case "Fog":
                        case "Sand":
                        case "Ash":
                        case "Squall":
                            state.cities[i].img = "wind";
                            break;
                        default:
                            console.log("Can't find good weather for :");
                            console.log(value.img);
                            break;
                    }
                    break;
                }
            }
        },
        updateTheme(state, value){
            state.theme = value;
        }
    },
    plugins: [createPersistedState({
        cities: ['cities'], theme:['theme']
    })]
});
