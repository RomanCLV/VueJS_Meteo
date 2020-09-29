<template>
  <div id="app">
    <md-button class="md-primary md-raised">
      <router-link :to="{name: 'Home'}" v-bind:style="{color: 'white'}">Home</router-link>
    </md-button>
    <md-button class="md-primary md-raised">
      <router-link :to="{name: 'VuePresenter'}" v-bind:style="{color: 'white'}">Made with VueJS</router-link>
    </md-button>
    <router-view></router-view>
  </div>
</template>

<script>

  import Vue from 'vue';
  import VueMaterial from 'vue-material';

  Vue.use(VueMaterial);

  export default {
    name: 'App',
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
