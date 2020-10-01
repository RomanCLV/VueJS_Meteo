<template>
  <div class="home">
    <div class="flexCenter">
      <b-form-group
              class="mb-0"
              label-for="input-search"
              description="ajouter une nouvelle carte de ville"
      >
        <b-form-input size="sm" id="input-search" class="mr-sm-2" v-model="cityName" v-on:keyup.enter="addCity" placeholder="Search city"></b-form-input>
      </b-form-group>
    </div>
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
      cityName:"",
    }

  },
  mounted() {
    this.$store.commit('setNamePage', "Météo +");
    this.$store.commit('setIsMenuVisible', false);
  },
  methods:{
    getCities(){
      this.cities = this.$store.getters.cities;
    },
    addCity(){
        this.$store.commit('addCities', {name:this.cityName, img:"default"});
        this.getCities()
    },

  },
}

</script>

<style scoped>
  .home {
    margin: 5%;
  }
  .flexCenter{
    display: flex; justify-content: center;
  }
</style>
