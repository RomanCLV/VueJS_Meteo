<template>
  <div class="backgroundCustom">
    <b-navbar toggleable type="dark" variant="dark" class="bgNav">
      <b-navbar-brand href="/">
        Météo +
      </b-navbar-brand>

      <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" v-model="cityName" v-on:keyup.enter="searchWeatherCity" placeholder="Search city"></b-form-input>
        <b-button v-model="checked" @click="setTheme" name="check-button"/>

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
      checked:false
    }
  },
  mounted() {
    this.setTheme();
  },
  methods: {
    searchWeatherCity() {
      this.$router.push('/weather/' + this.cityName);
      this.cityName = "";
    },
    setTheme(){
      if (this.checked) {
        console.log("dark")
        document.getElementsByClassName("backgroundCustom")[0].setAttribute('data-theme', 'dark');
      }
      else {
        console.log("light")
        document.getElementsByClassName("backgroundCustom")[0].setAttribute('data-theme', 'light');
      }
      this.checked = !this.checked
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../node_modules/bootstrap/scss/bootstrap";

  @import "src/assets/custom.scss";
div[class="backgroundCustom"]{
  background: var(--bg-color);
  color: var(--tx-color);
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
  background: #0280a2;
  background: var(--nav-color) !important;
  color: var(--tx-color) !important;
}

.route span{
  color: #ddeffc;
}

</style>
