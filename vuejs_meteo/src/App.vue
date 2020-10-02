<template>
  <div class="backgroundCustom">
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
        <b-button @click="setTheme"></b-button>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto route">
          <router-link :to="{name: 'Home'}" class="md-list-item-text"><span>Page principale</span></router-link>
          <router-link :to="{name: 'About'}" class="md-list-item-text"><span>About GERS</span></router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="center backgroundCustom">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      cityName: "",
    }
  },
  methods: {
    searchWeatherCity() {
      this.$router.push('/weather/' + this.cityName);
      this.cityName = "";
    },
    setTheme(){

    /*  const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

      function switchTheme(e) {
        if (e.target.checked) {
          document.documentElement.setAttribute('data-theme', 'dark');
        }
        else {
          document.documentElement.setAttribute('data-theme', 'light');
        }
      }

      toggleSwitch.addEventListener('change', switchTheme, false);
*/
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../node_modules/bootstrap/scss/bootstrap";

  @import "src/assets/custom.scss";
div[class="backgroundCustom"]{
  background: var(--darkgrey-color);
}
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

</style>
