<template>
  <div class="home">

    <b-row align-h="around">
      <b-col sm="4"  v-for="(city, index) in this.$store.getters.cities" v-bind:key="index">
        <MeteoCard v-bind:city="city.name" v-bind:img-url="require('../assets/' + city.img +  '.jpg')" />
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
  data() {
    return{
      cities:[],
    }

  },
  mounted() {
    this.$store.commit('setNamePage', "Météo +");
    this.$store.commit('setIsMenuVisible', false);
  },
  methods:{
    getCities(){
      this.cities = this.$store.getters.cities;
    }

  },
}

</script>

<style scoped>
  .home {
    margin: 5%;
  }
</style>
