import Vue from 'vue';
import Vuex  from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);


export const store = new Vuex.Store({
    state: {
        namePage: "Météo +",
        isMenuVisible: false,
        city:"",
        cities:[
            {name : "cergy", img:"cergy"},
            {name : "paris", img:"paris"},
            {name : "gdansk", img:"gdansk"},
            {name : "new york", img:"new_york"},
            {name : "sydney", img:"sydney"},
            {name : "moscou", img:"moscou"},
        ],
    },
    getters: {
        namePage: state => state.namePage,
        isMenuVisible: state => state.isMenuVisible,
        lastCity: state => state.city,
        cities: state => state.cities,

    },
    mutations: {
        setNamePage(state, value) {
            state.namePage = value;
        },
        setIsMenuVisible(state, value) {
            state.isMenuVisible = value;
        },
        inverseIsMenuVisible(state) {
            state.isMenuVisible = !state.isMenuVisible;
        },
        setCity(state, newCity) {
            state.city = newCity;
        },
        addCities(state, cities){
            if (state.cities.length<9){
                state.cities.push(cities);
            }
        },
        delCities(state, cityName){
            if (state.cities.length>6){
                state.cities = state.cities.filter(function( obj ) {
                    return obj.name !== cityName;
                });
            }
        }
    },
    plugins: [createPersistedState({
        cities: ['cities']
    })]

});
