import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home';
import About from "@/views/About";
import NotFound from "../views/NotFound";
import Weather from "../views/Weather";

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/', name: 'Home', component: Home},
        {path: '/about', name: 'About', component: About},
        {path: '/weather/:city', name: 'Weather', component: Weather},
        {path: '/weather/:city/*', name: 'NotFound', component: NotFound},

        {path: '*', name: 'NotFound', component: NotFound}
    ]
});
