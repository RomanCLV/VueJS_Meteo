import Vue from 'vue';
import Vuex  from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        name: "Roro"
    },
    getters: {
        name: state => state.name
    },
    mutations: {
        setName(state, value) {
            state.name = value;
        }
    }
});
