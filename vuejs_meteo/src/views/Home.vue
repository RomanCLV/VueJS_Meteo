<template>
  <div class="home">
    <MeteoCard city="cergy"/>
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

</style>