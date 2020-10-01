<template>
  <div>
    <label>
      <input type="checkbox">
      <span class="check"></span>
      <label>change theme</label>
    </label>
    <div >
      <b-navbar toggleable type="dark" variant="dark" class="bgNav">
        <b-navbar-brand href="/">
          Météo +
        </b-navbar-brand>

        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" v-model="cityName" v-on:keyup.enter="searchWeatherCity" placeholder="Search city"></b-form-input>
        </b-nav-form>
        <b-navbar-toggle target="navbar-toggle-collapse">
          <template v-slot:default="{ expanded }">
            <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
            <b-icon v-else icon="chevron-bar-down"></b-icon>
          </template>
        </b-navbar-toggle>

        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto route">
            <router-link :to="{name: 'Home'}" class="md-list-item-text"><span>Page principale</span></router-link>
            <router-link :to="{name: 'VuePresenter'}" class="md-list-item-text"><span>Vue JS</span></router-link>
            <router-link v-bind:to="/weather/ + cityName" class="md-list-item-text"><span>Meteo</span></router-link>

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <div class="center">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue';
// import VueMaterial from 'vue-material';
//
// Vue.use(VueMaterial);

export default {
  name: 'App',
  data() {
    return {
      cityName:"",
    }
  },
  computed: {
    isMenuVisible: {
      get() {
        return this.$store.getters.isMenuVisible;
      },
      set(value) {
        this.$store.commit('setIsMenuVisible', value);
      }
    }
  },
  methods: {
    searchWeatherCity() {
      this.$store.commit('setCity', this.cityName);
      this.$router.push('/weather/'+this.cityName);
    },
    getCityStore(){
      this.cityName = this.$store.getters.lastCity;
    }
  },
  mounted() {
    this.getCityStore();
  }
}
</script>

<style lang="scss" scoped>

.md-app {
  height: 100%;
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.center {
  text-align: center;
  margin-top: 5%;
}

.bgNav{
  background: #0280a2 !important;
  color: aliceblue !important;
}

.route span{
  color: #ddeffc;
}

input[type="checkbox"]{
  -webkit-appearance: none;
  visibility: hidden;
  display: none;
}
.check
{
  position: relative;
  display: block;
  width: 40px;
  height: 20px;
  background: #092c3e;
  cursor: pointer;
  border-radius: 20px;
  overflow: hidden;
  transition: ease-in 0.5s;
}
input[type="checkbox"]:checked ~ .check
{
  background: #fff;
  box-shadow: 0 0 0 2500px #091c3e;
}
.check:before
{
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  background: #fff;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  transition: 0.5s;
}
input[type="checkbox"]:checked ~ .check:before
{
  transform: translate(-50px);
}
.check:after
{
  content: '';
  position: absolute;
  top: 2px;
  right: 2px;
  background: #092c3e;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  transition: 0.5s;
  transform: translate(50px);
}
input[type="checkbox"]:checked ~ .check:after
{
  transform: translate(0px);
}

</style>
