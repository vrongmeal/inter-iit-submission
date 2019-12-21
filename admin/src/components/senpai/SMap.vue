<template>
  <div>
    <!--<div v-on:click="addMarker" class="map"></div>-->
    <div class="map"></div>
    <d-slider v-model="sliderValue" :value="20" />
    <span>Radius: {{displayValue}} meters</span>
  </div>
</template>
<script>
import gmapsInit from "../../utils/gmaps";

const locations = [
  {
    position: {
      lat: 89,
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

      this.geocoder.geocode({ address: "New Delhi" }, (results, status) => {
        if (status !== "OK" || !results[0]) {
          throw new Error(status);
        }

        this.map.setCenter(results[0].geometry.location);
        this.map.fitBounds(results[0].geometry.viewport);
      });
      let lol = this.map;

      this.drawMarkerCircle();
      let self = this;
      google.maps.event.addListener(lol, "click", function(event) {
        self.changeMarker(event.latLng);
      });
    } catch (error) {
      console.error(error);
    }
  },
  data() {
    return {
      sliderValue: 20,
      circle: null,
      map: null,
      google: null,
      geocoder: null,
      displayValue: 20,
      markers: []
    };
  },
  methods: {
    async setMap(s) {
      console.log(s);
      this.geocoder.geocode({ address: s }, (results, status) => {
        if (status !== "OK" || !results[0]) {
          throw new Error(status);
        }

        this.map.setCenter(results[0].geometry.location);
        this.map.fitBounds(results[0].geometry.viewport);
      });
    },
    getLocation() {
      return [locations[0], this.displayValue];
    },
    changeMarker(pos) {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers.length = 0;
      this.circle.setMap(null);
      locations[0].position = pos;
      this.drawMarkerCircle();
    },
    drawMarkerCircle() {
      let lol = this.map;
      this.markers = locations.map(x => new google.maps.Marker({ ...x, lol }));
      var marker = new google.maps.Marker({
        position: locations[0].position,
        map: lol
      });
      // Add the circle for this city to the map.
      this.circle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map: this.map,
        center: locations[0].position,
        radius: this.sliderValue * 20
      });
      this.displayValue = this.sliderValue * 20;
    }
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
        radius: this.sliderValue * 20
      });
      this.displayValue = parseInt(this.sliderValue * 20);
    }
  }
};
</script>

<style scoped>
.map {
  height: 69vh;
}
</style>
