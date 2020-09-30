import Vue from 'vue';
import Vuex  from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        namePage: "Météo +",
        isMenuVisible: false,
        path:"/",
    },
    getters: {
        namePage: state => state.namePage,
        isMenuVisible: state => state.isMenuVisible,
        lastPath: state => state.path,

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
        setPath(state, newPath) {
            state.path = newPath;
        },
    }
});
