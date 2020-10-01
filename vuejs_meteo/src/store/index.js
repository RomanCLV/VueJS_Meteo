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
    },
    getters: {
        cities: state => state.cities,
        defaultCities: state => state.defaultCities,
        location : state => state.location,
    },
    mutations: {
        addCities(state, city) {

            const inDefault = state.defaultCities.filter(item => item.name === city.name).length > 0;
            const inCities = state.cities.filter(item => item.name === city.name).length > 0;

            if (!inCities && !inDefault) {
                if (state.cities.length < 3) {
                    state.cities.push(city);
                }
                else if (state.cities.length === 3) {
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
        }
    },
    plugins: [createPersistedState({
        cities: ['cities']
    })]
});
