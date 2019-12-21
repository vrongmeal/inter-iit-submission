<template>
  <d-container fluid class="main-content-container px-4">
    <d-row no-gutters class="page-header py-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Road</span>
        <h3 class="page-title">Issue Tracker</h3>
      </d-col>
    </d-row>

    <d-row>
      <d-col col sm="12" lg="6">
        <div class="card card-small mb-4">
          <div class="card-header border-bottom">
            <h6 class="m-0">Issue List</h6>
          </div>

          <div class="card-body p-0 pb-3 text-center">
            <table class="table mb-0">
              <thead class="bg-light">
                <tr>
                  <th scope="col" style="width:10rem" class="border-0">#</th>
                  <th scope="col" class="border-0">Issue Title</th>
                  <th scope="col" style="width:10rem;" class="border-0">Level</th>
                </tr>
              </thead>
              <tbody>
                <tr @mouseover="showDetails(i)" :key="i" v-for="(issue, i) in issueList">
                  <td>{{issue.id + 1}}</td>
                  <td>{{issue.title}}</td>
                  <td>{{issue.level}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </d-col>
      <d-col col sm="12" lg="6">
        <div class="card card-small mb-4">
          <div class="card-header border-bottom">
            <h6 class="m-0" col sm="4">Issue Details</h6>
          </div>

          <div style="margin-bottom:-5rem" class="card-body p-0 pb-3 text-center">
            <d-row class="border-bottom p-2">
              <d-col style="text-align:right" class="ml-3 p-2" col sm="4">Title:</d-col>
              <d-col style="text-align:left" class="ml-3 p-2" col sm="4">{{displayIssue.title}}</d-col>
            </d-row>
            <d-row class="border-bottom p-2">
              <d-col style="text-align:right" class="ml-3 p-2" col sm="4">Location:</d-col>
              <d-col
                style="text-align:left"
                class="ml-3 p-2"
                col
                sm="4"
              >({{displayIssue.location[0]/100}}, {{displayIssue.location[1]/100}})</d-col>
            </d-row>
            <d-row class="border-bottom p-2">
              <d-col style="text-align:right" class="ml-3 p-2" col sm="4">Description:</d-col>
              <d-col
                style="text-align:left"
                class="ml-3 p-2"
                col
                sm="4"
              >{{displayIssue.description}}</d-col>
            </d-row>
            <d-row class="border-bottom p-2" style="margin-bottom:20px">
              <d-col style="text-align:right" class="ml-3 p-2" col sm="4">Level:</d-col>
              <d-col style="text-align:left" class="ml-3 p-2" col sm="4">{{displayIssue.level}}</d-col>
            </d-row>
            <img style="margin-bottom:30px"
              @click="handleSurveyModalOpen"
              :aria-id="i"
              class="carousel-image"
              :src="`${APII}/uploads/${ image }`"
            />
            <div @click="incrementLevel"
              v-for="index in [0,1,2,3,4]"
              :key="index"
              class="orderstatus"
              :class="{ 'done' : index<=level }"
            >
              <div  class="orderstatus-check">
                <span class="orderstatus-number">{{ index }}</span>
              </div>
              <div class="orderstatus-text">
                <time></time>
                <p>Phase: {{index}}</p>
              </div>
            </div>
            
          </div>
        </div>
      </d-col>
    </d-row>
  </d-container>
</template>
<script>
import $ from "jquery";
import { API } from "@/utils/config";

export default {
  name: "Tracker",
  data() {
    let temp;

    return {
      issueList: [],
      displayIssue: {},
      image: "",
      APII : API,
      level: 1,
    };
  },
  mounted() {
    console.log("lole");
    let self = this;
    $.ajax({
      type: "GET",
      url: `${API}/m/issues`,
      error: function(res, status) {
        alert(status);
      },
      success: function(res) {
        self.issueList = res;
        self.displayIssue = res[0];
        self.image = res[0].image;
      }
    });
  },
  methods: {
    showDetails() {},
    incrementLevel() {
        this.level++
        $($('.orderstatus')[this.level]).addClass('done')
    }
  }
};
</script>

<style scoped>
.orderstatus {
  color: #939393;
  display: block;
  padding: 1em 0;
  position: relative;
  text-align: center;
  min-height: 150px;
}

.orderstatus.done:before {
  background: #32841f;
}
.orderstatus:before {
  content: "";
  height: 100%;
  position: absolute;
  left: 50%;
  width: 2px;
  background: #939393;
  margin: 0 25px;
}

.orderstatus:last-child:before {
  height: 0;
}

.orderstatus.done {
  color: #333;
}

@media only screen and (max-width: 40em) {
  .orderstatus {
    text-align: left;
  }
  .orderstatus:before {
    left: 0;
  }
  .orderstatus .orderstatus-text {
    left: 0;
    width: 100%;
  }
}

.orderstatus-text {
  position: relative;
  width: 50%;
  left: 50%;
  text-align: left;
  padding-left: 60px;
}

@media only screen and (min-width: 40em) {
  .orderstatus:nth-child(2n) .orderstatus-text {
    left: 10px;
    text-align: right;
    padding-right: 20px;
  }
}

.orderstatus-container {
  padding: 2em 0;
}

.orderstatus time {
  display: block;
  font-size: 1em;
  color: #939393;
}

.orderstatus.done time {
  color: #368d22;
}

@media only screen and (max-width: 40em) {
  .orderstatus-container {
    text-align: center;
  }
}

.orderstatus-check {
  font-family: "Helvetica", Arial, sans-serif;
  border: 2px solid #939393;
  width: 50px;
  height: 50px;
  display: inline-block;
  text-align: center;
  line-height: 48px;
  border-radius: 50%;
  margin-bottom: 0.5em;
  background: #fff;
  z-index: 2;
  position: absolute;
  color: #939393;
  left: 50%;
}

.done .orderstatus-check {
  color: #368d22;
  border-color: #368d22;
}

@media only screen and (max-width: 40em) {
  .orderstatus-check {
    left: 0;
  }
}

.orderstatus-active {
  text-align: center;
  position: relative;
  left: 25px;
  top: 20px;
  color: #939393;
}

@media only screen and (max-width: 40em) {
  .orderstatus-active {
    display: none;
  }
}
</style>