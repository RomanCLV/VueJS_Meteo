<template>
  <div class="notFound">
    <md-button class="md-accent  md-raised">Vous vous êtes perdu dans les nuages ?</md-button>
  </div>
</template>

<script>
  export default {
    name: 'NotFound',
    mounted() {
      this.$store.commit('setNamePage', "Not found");
      this.$store.commit('setIsMenuVisible', false);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notFound {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
