<template>
    <div>
        <b-icon-droplet v-if="humidity<100/3" variant="primary">
             <b-badge variant="light">humidity</b-badge>
        </b-icon-droplet>
        <b-icon-droplet-half v-else-if="humidity>=100/3 && humidity<=200/3" variant="primary">
            <b-badge variant="light">humidity</b-badge>
        </b-icon-droplet-half>
        <b-icon-droplet-fill v-else-if="humidity>200/3" variant="primary">
            <b-badge variant="black">taux d'humidité : {{humidity}}</b-badge>
        </b-icon-droplet-fill>
    </div>
</template>

<script>
    export default {
        name: "DropIcon",
        props: {
            humidity: Number,
        },
    }
</script>

<style scoped>

</style>
