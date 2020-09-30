<template>
  <div>
    <b-navbar toggleable type="dark" variant="dark">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="navbar-toggle-collapse">
        <template v-slot:default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <router-link :to="{name: 'Home'}" class="md-list-item-text">Page principale</router-link>
          <router-link :to="{name: 'VuePresenter'}" class="md-list-item-text">Vue JS</router-link>
          <router-link :to="{name: 'Weather'}" class="md-list-item-text">Meteo</router-link>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="center">
      <router-view></router-view>
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
    return {}
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
    ChangeMenuVisibility: function () {
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
