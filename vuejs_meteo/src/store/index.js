import Vue from 'vue';
import Vuex  from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        namePage: "Météo +",
        isMenuVisible: false,
        city:"",
    },
    getters: {
        namePage: state => state.namePage,
        isMenuVisible: state => state.isMenuVisible,
        lastCity: state => state.city,

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
    }
});
