<template>
  <div style="height: calc(100vh - 50px)">
    <!-- map -->
    <GMap
      v-if="location && !loading"
      :key="mapKey"
      ref="gMap"
      language="en"
      class="h-100"
      :center="center"
      :options="{
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false,
        styles: mapStyle,
      }"
      :zoom="10"
    >
      <GMapMarker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
        :clickable="true"
        :draggable="false"
        @click="currentLocation = marker"
      >
        <GMapInfoWindow :options="{ maxWidth: 200 }">
          <LocationInfo
            :country="location.country"
            :postalCode="location['post code']"
            :place="marker"
          />
        </GMapInfoWindow>
      </GMapMarker>
      <GMapCircle :options="circleOptions" />
    </GMap>
    <!-- loading -->
    <b-row v-else-if="loading" class="h-100 text-center" align-v="center">
      <div class="w-100 text-center vertical-center">
        <b-spinner variant="primary" label="Spinning"></b-spinner>
      </div>
    </b-row>
    <!-- no location -->
    <b-row v-else class="h-100 text-center" align-v="center">
      <div class="w-100" style="font-size: 5vw">
        Oops. No location to show...
      </div>
      <div class="w-100" style="font-size: 3vw; opacity: 0.4">
        Please enter a Postal Code
      </div>
    </b-row>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
import LocationInfo from '@/components/LocationInfo.vue'

export default Vue.extend({
  name: 'IndexPage',
  head() {
    return {
      title: 'Map page',
    }
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('countries/fetchCountries')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch countries events at this time',
      })
    }
  },
  data() {
    return {
      mapKey: 0,
      currentLocation: {},
      circleOptions: {},
      mapStyle: [],
      clusterStyle: [
        {
          url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
          width: 56,
          height: 56,
          textColor: '#fff',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      location: 'place/location',
      loading: 'place/loading',
      center: 'place/center',
      markers: 'place/markers',
    }),
  },
  mounted() {
    // this.$bus.$on('refreshMap', () => {
    //   console.log(this.$refs.gMap)
    //   this.mapKey++ //hack to reload the map with new found location (throw error) !!!!
    // })
  },
  components: {
    LocationInfo,
  },
})
</script>

<style lang="scss">
.GMap__Wrapper {
  height: 100%;
}
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>
