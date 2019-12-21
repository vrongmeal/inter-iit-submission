<template>
  <d-container fluid class="main-content-container px-4">
    <d-row class="py-4">
      <div class="col">
        <div class="card card-small mb-4 card1">
          <div class="card-header border-bottom">
            <h6 class="m-0">Project Details</h6>
          </div>
          <div class="card-body p-0 pb-3 text-center">
            <table class="table mb-0">
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Ali</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Clark</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Jerry</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Colt</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <d-col lg="8" md="6" sm="12" class="mb-4">
        <LineGraph title="L O L" v-bind:chartData="lineChartData" />
      </d-col>
      <d-col sm="12">
        <d-card class="card-small card-post card-post--1">
          <d-card-body>
            <carousel :per-page="4" :mouse-drag="false">
              <slide class="slide">Slide 1 Content</slide>
              <slide>Slide 2 Content</slide>
              <slide>Slide 1 Content</slide>
              <slide>Slide 2 Content</slide>
              <slide>Slide 1 Content</slide>
              <slide>Slide 2 Content</slide>
              <slide>Slide 1 Content</slide>
              <slide>Slide 2 Content</slide>
              <slide>Slide 1 Content</slide>
              <slide>Slide 2 Content</slide>
              <slide>Slide 1 Content</slide>
              <slide>Slide 2 Content</slide>
            </carousel>
          </d-card-body>
        </d-card>
      </d-col>
      <div class='map'>
      </div>
    </d-row>
  </d-container>
</template>

<script>
import LineGraph from "../components/senpai/LineGraph";
import gmapsInit from '../utils/gmaps';

export default {
  name: "Admin",
  components: {
    LineGraph
  },
  async mounted() {
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(document.getElementsByClassName('map')[0]);

      geocoder.geocode({ address: 'Austria' }, (results, status) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status);
        }

        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
      });
    } catch (error) {
      console.error(error);
    }
  },
  data() {
    return {
      lineChartData: {
        labels: Array.from(new Array(30), (_, i) => i + 1),
        datasets: [
          {
            label: "Current Month",
            data: [
              500,
              800,
              320,
              180,
              240,
              320,
              230,
              650,
              590,
              1200,
              750,
              940,
              1420,
              1200,
              960,
              1450,
              1820,
              2800,
              2102,
              1920,
              3920,
              3202,
              3140,
              2800,
              3200,
              3200,
              3400,
              2910,
              3100,
              4250
            ]
          },
          {
            label: "Past Month",
            data: [
              380,
              430,
              120,
              230,
              410,
              740,
              472,
              219,
              391,
              229,
              400,
              203,
              301,
              380,
              291,
              620,
              700,
              300,
              630,
              402,
              320,
              380,
              289,
              410,
              300,
              530,
              630,
              720,
              780,
              1200
            ]
          },
          {
            label: "Next Month",
            data: [
              410,
              740,
              472,
              219,
              391,
              229,
              400,
              203,
              301,
              380,
              291,
              620,
              700,
              300,
              630,
              402,
              320,
              380,
              289,
              410,
              300,
              530,
              630,
              720,
              780,
              1200,
              380,
              430,
              120,
              230
            ]
          },
          {
            label: "DIO Month",
            data: [
              380,
              291,
              620,
              700,
              300,
              630,
              402,
              320,
              380,
              289,
              410,
              300,
              530,
              630,
              720,
              780,
              1200,
              380,
              430,
              120,
              230,
              410,
              740,
              472,
              219,
              391,
              229,
              400,
              203,
              301
            ]
          }
        ]
      }
    };
  }
};
</script>

<style scoped>
.card1 {
  height: 30.188rem;
}
.slide {
  height: 12.5rem;
}
.map{
    width:100%;
    height: 100px;
}
</style>
