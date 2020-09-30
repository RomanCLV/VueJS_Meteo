<!--<template>
  <div id="app">
    <md-app md-waterfall md-mode="overlap">

      <md-app-toolbar class="md-primary md-large">
        <div class="md-toolbar-row">
          <md-button class="md-icon-button" @click="ChangeMenuVisibility">
            <md-icon>menu</md-icon>
          </md-button>
          <span class="md-title">
            {{ $store.getters.namePage }}
          </span>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="isMenuVisible">
        <md-toolbar class="md-primary" md-elevation="0">
          Météo +
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <router-link :to="{name: 'Home'}" class="md-list-item-text">Page principale</router-link>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <router-link :to="{name: 'VuePresenter'}" class="md-list-item-text">Vue JS</router-link>
          </md-list-item>

        </md-list>
      </md-app-drawer>

      <md-app-content class="center">
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>
-->
<template>
  <div id="app">
    <router-link :to="{name: 'Home'}" class="md-list-item-text">Page principale</router-link>
    <router-link :to="{name: 'VuePresenter'}" class="md-list-item-text">Vue JS</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  // import Vue from 'vue';
  // import VueMaterial from 'vue-material';
  //
  // Vue.use(VueMaterial);

  export default {
    name: 'App',
    data () {
      return {
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
      ChangeMenuVisibility : function () {
        this.isMenuVisible = !this.isMenuVisible;
      }
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
  }

</style>
