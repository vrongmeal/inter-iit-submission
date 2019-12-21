<template>
  <div>
    <!--<div v-on:click="addMarker" class="map"></div>-->
    <div class="map"></div>
    <d-slider v-model="sliderValue" :value="20" />
    <span>Slider Value: {{ sliderValue }}</span>
  </div>
</template>
<script>
import gmapsInit from "../../utils/gmaps";

const locations = [
  {
    position: {
      lat: 28.644800,
      lng: 77.216721
    }
  }
  // ...
];

export default {
  name: "SMap",
  async mounted() {
    try {
      this.google = await gmapsInit();
      this.geocoder = new google.maps.Geocoder();
      this.map = new google.maps.Map(document.getElementsByClassName("map")[0]);

      this.geocoder.geocode({ address: "India" }, (results, status) => {
        if (status !== "OK" || !results[0]) {
          throw new Error(status);
        }

        this.map.setCenter(results[0].geometry.location);
        this.map.fitBounds(results[0].geometry.viewport);
      });
      let lol = this.map;
      const markers = locations.map(x => new google.maps.Marker({ ...x, lol }));
      // Add the circle for this city to the map.
      this.circle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map: this.map,
        center: locations[0].position,
        radius: this.sliderValue * 10,
      });
    } catch (error) {
      console.error(error);
    }
  },
  data() {
    return {
      sliderValue: 20,
      circle : null,
      map: null,
      google: null,
      geocoder: null
    };
  },
  watch: {
    // whenever question changes, this function will run
    sliderValue: function() {
      console.log(this.sliderValue);
      this.circle.setMap(null);
      this.circle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map: this.map,
        center: locations[0].position,
        radius: this.sliderValue * 10,
      });
    }
  }
};
</script>

<style scoped>
.map {
  height: 80vh;
}
</style>