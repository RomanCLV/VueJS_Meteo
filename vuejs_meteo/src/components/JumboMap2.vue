<template>

    <b-jumbotron>
        <div  class="mapContainer">
            <span v-if="loading">Loading...</span>
            <label for="checkbox">GeoJSON Visibility </label>
            <input
                    id="checkbox"
                    v-model="show"
                    type="checkbox"
            >
            <label for="checkboxTooltip">Enable tooltip </label>
            <input
                    id="checkboxTooltip"
                    v-model="enableTooltip"
                    type="checkbox"
            >
            <input
                    v-model="fillColor"
                    type="color"
            >
            <br>
        </div>
        <l-map
                :zoom="zoom"
                :center="[this.$store.getters.location.lat, this.$store.getters.location.lon]"
                style="height: 500px; width: 100%"
        >
            <l-tile-layer
                    :url="url"
                    :attribution="attribution"
            />
            <l-marker :lat-lng="[this.$store.getters.location.lat, this.$store.getters.location.lon]">
            </l-marker>
            <l-geo-json
                    v-if="show"
                    :geojson="geojson"
                    :options="options"
                    :options-style="styleFunction"
            />
        </l-map>

    </b-jumbotron>
</template>

<script>
    import { LMap, LTileLayer, LGeoJson, LMarker } from "vue2-leaflet";
   //region si probleme affichage du marqueur
    import L from 'leaflet';

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    });
    //endregion
    export default {
        name: "JumboMap2",
        components: {
            LMap,
            LTileLayer,
            LGeoJson,
            LMarker
        },
        data() {
            return {
                loading: false,
                show: true,
                enableTooltip: true,
                zoom: 10,
                geojson: null,
                fillColor: "#e4ce7f",
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution:
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            };
        },
        computed: {
            options() {
                return {
                    onEachFeature: this.onEachFeatureFunction
                };
            },
            styleFunction() {
                const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
                return () => {
                    return {
                        weight: 2,
                        color: "#ECEFF1",
                        opacity: 1,
                        fillColor: fillColor,
                        fillOpacity: 1
                    };
                };
            },
            onEachFeatureFunction() {
                if (!this.enableTooltip) {
                    return () => {};
                }
                return (feature, layer) => {
                    layer.bindTooltip(
                        "<div>code:" +
                        feature.properties.code +
                        "</div><div>nom: " +
                        feature.properties.nom +
                        "</div>",
                        { permanent: false, sticky: true }
                    );
                };
            }
        },
        async created() {
            this.loading = true;
            const response = await fetch("https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson")
            const data = await response.json();
            this.geojson = data;
            this.loading = false;
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../node_modules/bootstrap/scss/bootstrap";
    @import "src/assets/custom.scss";

    div[class="mapContainer"]{
        color: var(--tx-color);
    }
</style>
