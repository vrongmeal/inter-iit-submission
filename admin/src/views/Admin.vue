<template>
  <d-container fluid class="main-content-container px-4">
    <d-row no-gutters class="page-header py-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Project</span>
        <h3 class="page-title">{{ project.name }}</h3>
      </d-col>
    </d-row>

    <!-- Small Stats Blocks -->
    <d-row>
      <d-col lg v-for="(stats, idx) in smallStats" :key="idx" class="mb-4">
        <span>
          <small-stats
            :id="`small-stats-${idx}`"
            variation="1"
            :chart-data="stats.datasets"
            :label="stats.label"
            :value="stats.value"
            :percentage="stats.percentage"
            :increase="stats.increase"
            :decrease="stats.decrease"
          />
          <d-button
            v-if="idx === 2"
            @click="handleProgressUpdate"
            size="sm"
            outline
            theme="success"
            class="mb-2 mr-1 progress-button"
          >Update</d-button>
        </span>
      </d-col>
    </d-row>
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
                  <td>Name</td>
                  <td>{{ project.name }}</td>
                </tr>
                <tr>
                  <td>Started on</td>
                  <td>{{ startDate }}</td>
                </tr>
                <tr>
                  <td>Ended on</td>
                  <td>{{ endDate }}</td>
                </tr>
                <tr>
                  <td>Project Deadline</td>
                  <td>{{ expectedEnd }}</td>
                </tr>
                <tr>
                  <td>Latitude</td>
                  <td>{{ latitude }}</td>
                </tr>
                <tr>
                  <td>Longitude</td>
                  <td>{{ longitude }}</td>
                </tr>
                <tr>
                  <td>Area</td>
                  <td>{{ area }}</td>
                </tr>
                <tr>
                  <td>Progress</td>
                  <td>{{ progress }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <d-col lg="8" md="6" sm="12" class="mb-4">
        <LineGraph title="Survey Summary" v-bind:chartData="lineChartData" />
      </d-col>
      <d-col sm="12" class="mb-4">
        <d-card class="card-small card-post card-post--1">
          <d-card-body>
            <carousel :per-page="3" :mouse-drag="true">
              <slide v-for="(surv, i) in project.surveys" :key="i">
                <img
                  @click="handleSurveyModalOpen"
                  :aria-id="i"
                  class="carousel-image"
                  :src="`${APII}/uploads/${ surv.image }`"
                />
              </slide>
            </carousel>
          </d-card-body>
        </d-card>
      </d-col>
    </d-row>

    <d-modal v-if="showSurveyModal" @close="handleSurveyModalClose" size="lg">
      <d-modal-header>
        <d-modal-title>Survey Response</d-modal-title>
      </d-modal-header>
      <d-modal-body>
        <img class="modal-image" :src="`${API}/uploads/${ survey.image }`" />
        <table class="table mb-0">
          <tbody>
            <tr>
              <td style="font-weight: bold;">Submitted by:</td>
              <td>{{ survey.user.username }}</td>
            </tr>
            <tr>
              <td style="font-weight: bold;">Verified User:</td>
              <td>{{ survey.user.is_verified }}</td>
            </tr>
            <tr>
              <td style="font-weight: bold;">Is Admin:</td>
              <td>{{ survey.user.is_admin }}</td>
            </tr>
          </tbody>
        </table>
        <div class="responses" v-for="(ans, ques, i) in survey.ques" :key="i">
          <p style="font-weight: bold;">{{ ques }}</p>
          <p>{{ ans }}</p>
        </div>
      </d-modal-body>
    </d-modal>

    <d-modal v-if="showProgress" @close="handleProgressClose" size="lg">
      <d-modal-header>
        <d-modal-title>Upgrade Progress</d-modal-title>
      </d-modal-header>
      <d-modal-body>
        <span>Progress: {{ progressVal }} %</span>
        <d-slider
          v-model="progressVal"
          :range="{ min: project.progress[project.progress.length-1], max: 100 }"
        />
        <d-button @click="submitProgress" outline theme="primary" class="mb-2 mr-1">Update</d-button>
      </d-modal-body>
    </d-modal>

    <d-container
      v-bind:class="{animate : showSlide1}"
      fluid
      class="main-content-container px-4 render"
    ></d-container>
  </d-container>
</template>

<style lang="scss">
.carousel-image {
  height: 10rem;
  width: 22rem;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
}

.modal-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: center;
}

.responses {
  margin-top: 1rem;
  text-transform: capitalize;

  p {
    margin: 0;
  }
}
</style>

<script>
import LineGraph from "../components/senpai/LineGraph";
import SmallStats from "@/components/common/SmallStats.vue";

import { API } from "@/utils/config";

import Error from "./Errors";

import $ from "jquery";

export default {
  name: "Admin",
  components: {
    LineGraph,
    SmallStats,
    Error
  },
  mounted() {
    this.renderProject();
  },
  watch: {
    "$route.params.project": function(project) {
      this.renderProject();
    }
  },
  methods: {
        showSlide() {
      console.log("WTF")
      this.showSlide1 = !this.showSlide1;
      console.log(showSlide1);
    },
    submitProgress() {
      const self = this
      let send = parseInt(self.progressVal)
      $.ajax({
        type: "GET",
        url: `${API}/c/projects/${self.$route.params.project}/progress/${send}`,
        error: function(res, status) {
          alert(status);
        },
        success: function(res) {
          self.progressVal = res.progress[res.progress.length - 1];
          self.project.progress = res.progress
          self.handleProgressClose()
        }
      });
    },
    handleProgressUpdate() {
      this.showProgress = true;
    },
    handleProgressClose() {
      this.showProgress = false;
    },
    handleSurveyModalClose() {
      this.showSurveyModal = false;
    },
    handleSurveyModalOpen(e) {
      const surveyID = parseInt(e.target.getAttribute("aria-id"));
      this.survey = this.project["surveys"][surveyID];
      this.showSurveyModal = true;
      console.log(this.survey);
    },
    renderProject() {
      const self = this;
      $.ajax({
        type: "GET",
        url: `${API}/c/projects/${self.$route.params.project}`,
        error: function(res, status) {
          alert(status);
        },
        success: function(res) {
          self.project = res;
          self.progressVal = res.progress[res.progress.length - 1];
        }
      });
    },
    timestampToDate(timestamp) {
      var date = new Date(timestamp * 1000);
      return `${date.getDate()} / ${date.getMonth() +
        1} / ${date.getFullYear()}`;
    }
  },
  computed: {
    projectId() {
      return this.$route.params.project;
    },
    startDate() {
      return this.timestampToDate(this.project.start_date);
    },
    endDate() {
      if (this.project.end_date !== -1) {
        return this.timestampToDate(this.project.end_date);
      }
      return "Project ongoing";
    },
    expectedEnd() {
      return this.timestampToDate(this.project.expected_end);
    },
    latitude() {
      return this.project.location[0] / 100;
    },
    longitude() {
      return this.project.location[1] / 100;
    },
    area() {
      return `${Math.pow(this.project.location[2], 2) * 3.14} sq. m`;
    },
    progress() {
      return `${this.project.progress[this.project.progress.length - 1]} %`;
    },
    incProgress() {
      if (this.project.progress.length <= 1) {
        return `0 %`;
      }
      const diff =
        this.project.progress[this.project.progress.length - 1] -
        this.project.progress[this.project.progress.length - 2];
      return `${(
        diff / this.project.progress[this.project.progress.length - 2]
      ).toFixed(2)} %`;
    },
    incSurvey() {
      if (this.project.summary.ans.length <= length) {
        return [`0 %`, true];
      }
      const ans = this.project.summary.ans;
      let diff = [];
      for (let i = ans.length - 2; i < ans.length; i++) {
        const ansi = ans[i];
        let d = 0;
        const key = Object.keys(ansi)[0];
        for (let v in ansi[key]) {
          d += ansi[key][v];
        }
        diff.push(d);
      }
      return [
        `${(Math.abs(diff[1] - diff[0]) / diff[0]).toFixed(2)} %`,
        diff[1] - diff[0] >= 0
      ];
    },
    lineChartData() {
      let datasets = [];
      const ans = this.project.summary.ans;
      for (let i = 0; i < ans.length; i++) {
        const ansi = ans[i];
        if (i === 0) {
          for (let key in ansi) {
            datasets.push({
              label: key,
              data: []
            });
          }
        }
        for (let key in ansi) {
          for (let j = 0; j < datasets.length; j++) {
            if (key === datasets[j]["label"]) {
              datasets[j]["data"].push(
                ansi[key][this.project.summary.avg[i][key]]
              );
            }
          }
        }
      }
      return {
        labels: Array.from(new Array(ans.length), (_, i) => i + 1),
        datasets: datasets
      };
    },
    smallStats() {
      return [
        {
          label: "Images",
          value: `${this.project.surveys.length}`,
          percentage: this.incSurvey[0],
          increase: this.incSurvey[1],
          // labels: ["Label", "Label", "Label", "Label", "Label", "Label"],
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: "rgba(0, 184, 216, 0.1)",
              borderColor: "rgb(0, 184, 216)",
              data: [1, 2, 1, 3, 5, 4, 7]
            }
          ]
        },
        {
          label: "Number of questions answered",
          value: `${this.project.surveys.length * this.project.schema.length}`,
          percentage: this.incSurvey[0],
          increase: this.incSurvey[1],
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: "rgba(23,198,113,0.1)",
              borderColor: "rgb(23,198,113)",
              data: [1, 2, 3, 3, 3, 4, 4]
            }
          ]
        },
        {
          label: "Progress",
          value: this.progress,
          percentage: this.incProgress,
          increase: true,
          decrease: false,
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: "rgba(255,180,0,0.1)",
              borderColor: "rgb(255,180,0)",
              data: [2, 3, 3, 3, 4, 3, 3]
            }
          ]
        }
      ];
    }
  },
  data() {
    return {
      showSlide1: false,
      showProgress: false,
      showSurveyModal: false,
      project: {},
      survey: {},
      progressVal: 1,
      APII : API
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
.map {
  width: 100%;
  height: calc(100vh - 8rem);
}

.render {
  position: fixed;
  top: 3.75rem;
  left: 100%;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 333;
  transition: all 2s;
}
.animate {
  left: 50%;
}
.progress-button {
  position: absolute;
  top: 10px;
  right: 20px;
}
</style>
