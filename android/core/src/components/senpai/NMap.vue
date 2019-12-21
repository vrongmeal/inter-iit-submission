<template>
  <div>
    <!--<div v-on:click="addMarker" class="map"></div>-->
    <div class="map"></div>
  </div>
</template>
<script>
import Vue from "vue";
import gmapsInit from "../../utils/gmaps";
import { API } from "@/utils/config";
import $ from "jquery";
const locations = [
  {
    id: 69,
    position: {
      lat: 89,
      lng: 2
    },
    radius: 1000
  }
  // ...
];
var projectCircles = {
  chicago: {
    center: { lat: 41.878, lng: -87.629 },
    population: 2714856
  },
  newyork: {
    center: { lat: 40.714, lng: -74.005 },
    population: 8405837
  },
  losangeles: {
    center: { lat: 34.052, lng: -118.243 },
    population: 3857799
  },
  vancouver: {
    center: { lat: 49.25, lng: -123.1 },
    population: 603502
  }
};
export default {
  name: "NMap",
  async mounted() {
    $.ajax({
      type: "GET",
      url: `${API}/c/projects`,
      error: function(res, status) {
        alert(status);
      },
      success: function(res) {
        for (let x = 0; x < res.length; x++) {
          console.log(res, x);
          let location = {
            id: x,
            position: {
              lat: res[x].location[0]/100,
              lng: res[x].location[1]/100
            },
            radius: res[x].location[2]
          };
          locations.push(location)
        }
        console.log(locations);
      }
    });
    var lol = this;
    setTimeout(async function() {
      try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(
        document.getElementsByClassName("map")[0]
      );
      geocoder.geocode({ address: "delhi" }, (results, status) => {
        if (status !== "OK" || !results[0]) {
          throw new Error(status);
        }
        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
      });
      for (var location in locations) {
        console.log(locations[location])
        // Add the circle for this city to the map.
        var cityCircle = new google.maps.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          map: map,
          center: locations[location].position,
          radius: locations[location].radius
        });
      }
      const markers = locations.map(x => new google.maps.Marker({ ...x, map }));
      //markers[0].id = "id1";
      let iie=0
      markers.map(function(marker) {
        const iiee = iie - 1;
        google.maps.event.addListener(marker, "click", function() {
          console.log('yaha aaya')
          lol.$emit("senddetails", iiee);
        });
        iie++;
      });
      this.google = google;
      this.geocoder = geocoder;
      this.map = map;
      /*
      var point = new google.maps.LatLng(29.6448, 77.216721);
      var data = "Hello World!";
      var infowindow = new google.maps.InfoWindow({
        content: data
      });
      console.log(point);
      var marker = new google.maps.Marker({
        position: point,
        title: "Hello World!"
      });
      google.maps.event.addListener(marker, "click", function() {
        infowindow.open(map, marker);
      });*/
    } catch (error) {
      console.error(error);
    }
    }, 1000);

  },
  data() {
    return {
      google: null,
      geocoder: null,
      map: null
    };
  }
};
</script>
<style scoped>
.map {
  height: 80vh;
}
</style>
