<template>
  <div class="home">
    <b-row align-h="around">
      <b-col sm="4" >
        <MeteoCard city="cergy" v-bind:img-url="require('../assets/cergy.jpg')" />
      </b-col>
      <b-col sm="4">
        <MeteoCard city="paris" v-bind:img-url="require('../assets/paris.jpg')"/>
      </b-col>
      <b-col sm="4">
        <MeteoCard city="gdansk" v-bind:img-url="require('../assets/gdansk.jpg')" />
      </b-col>
    </b-row>

    <b-row align-h="around">
      <b-col sm="4">
        <MeteoCard city="new york" v-bind:img-url="require('../assets/new_york.jpg')" />
      </b-col>
      <b-col sm="4">
        <MeteoCard city="sydney" v-bind:img-url="require('../assets/sydney.jpg')"/>
      </b-col>
      <b-col sm="4">
        <MeteoCard city="moscou" v-bind:img-url="require('../assets/moscou.jpg')" />
      </b-col>
    </b-row>

  </div>
</template>

<script>

import MeteoCard from "@/components/MeteoCard";

export default {
  name: "Home",
  components: {
    MeteoCard
  },
  mounted() {
    this.$store.commit('setNamePage', "Météo +");
    this.$store.commit('setIsMenuVisible', false);
  }
}

</script>

<style scoped>
  .home {
    margin: 5%;
  }
</style>
