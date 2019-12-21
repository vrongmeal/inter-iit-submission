<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Road</span>
        <h3 class="page-title">Add New Project</h3>
      </d-col>
    </d-row>
    <d-row>
      <d-col sm="6" class="text-center text-sm-left mb-4 mb-sm-0">
        <d-card-header class="border-bottom">
          <h6 class="m-0">Form</h6>
        </d-card-header>
        <d-list-group flush>
          <d-list-group-item class="p-3">
            <d-row>
              <d-col>
                <d-form @submit="onSubmitForm">
                  <d-form-row>
                    <d-col class="form-group">
                      <label>Project Name</label>
                      <d-input class="name-of-project" />
                    </d-col>
                  </d-form-row>

                  <d-form-row>
                    <d-col col sm="6" class="text-center text-sm-left mb-4 mb-sm-0">
                      <label for="start-date">Start Date</label>
                    </d-col>
                    <d-col col sm="6" class="text-center text-sm-left mb-4 mb-sm-0">
                      <label for="end-date">Expected End Date</label>
                    </d-col>
                    <d-col col sm="6" class="text-center text-sm-left mb-4 mb-sm-0">
                      <d-datepicker
                        id="start-date"
                        v-model="startd"
                        @opened="handleOpened"
                        @closed="handleClosed"
                        typeable
                      />
                    </d-col>
                    <d-col col sm="6" class="text-center text-sm-left mb-4 mb-sm-0">
                      <d-datepicker
                        id="end-date"
                        v-model="expecd"
                        @opened="handleOpened"
                        @closed="handleClosed"
                        typeable
                      />
                    </d-col>
                  </d-form-row>

                  <d-form-row style="margin-top:1rem; margin-bottom:1rem;">
                    <d-col col sm="6" class="text-center text-sm-left mb-4 mb-sm-0">
                      <label for="feInputState">State</label>
                    </d-col>
                    <d-col col sm="6" class="text-center text-sm-left mb-4 mb-sm-0">
                      <label for="feInputCity">City</label>
                    </d-col>
                    <d-col col sm="6" class="text-center text-sm-left mb-4 mb-sm-0">
                      <d-select id="feInputState">
                        <option>Choose...</option>
                        <option @click="setMap('Uttarakhand')">Uttarakhand</option>
                      </d-select>
                    </d-col>
                    <d-col col sm="6" class="text-center text-sm-left mb-4 mb-sm-0">
                      <d-select id="feInputCity">
                        <option>Choose...</option>
                        <option
                          v-for="city in cities"
                          :key="city"
                          @click="setMap(city+' ,Uttarakhand')"
                        >{{city}}</option>
                      </d-select>
                    </d-col>
                  </d-form-row>

                  <d-form-row >
                    <d-col style="margin-top:20px;" col sm="6" class="form-group">
                      <label>Survey</label>
                    </d-col>
                    <d-col style="margin-top:20px;" col sm="6" class="text-center text-sm-left mb-4 mb-sm-0">
                      <d-button type="button" theme="secondary" @click="addNewQues">Add Question</d-button>
                    </d-col>
                    <input class="form-control ques" v-for="i in numQues" :key="i" placeholder="Enter your question" />
                  </d-form-row>
                  <d-form-row>
                    <d-col style="margin-top:20px;" col sm="6" class="text-center text-sm-left mb-4 mb-sm-0">
                      <d-button type="submit">Create New Project</d-button>
                    </d-col>
                  </d-form-row>
                </d-form>
              </d-col>
            </d-row>
          </d-list-group-item>
        </d-list-group>
      </d-col>
      <d-col col sm="6" class="text-center text-sm-left mb-4 mb-sm-0">
        <SMap ref="smap" />
      </d-col>
    </d-row>
  </d-container>
</template>

<style lang="scss">
.ques:nth-child(n + 2) {
  margin-top: 1rem;
}
</style>

<script>
import SMap from "../components/senpai/SMap";
import {API} from '@/utils/config';
import $ from 'jquery';

export default {
  name: "NewProject",
  methods: {
    handleOpened() {
      this.opened = true;
    },
    handleClosed() {
      this.opened = false;
    },
    setMap(s) {
      console.log(s);
      this.$refs.smap.setMap(s);
    },
    addNewQues() {
      this.numQues++;
    },
    newSchema(q) {
      return {q: q, a: ['1', '2', '3', '4', '5']};
    },
    onSubmitForm(e) {
      e.preventDefault();
      const self = this;

      const form = $(e.target);
      const req = {
        name: '',
        start_date: 0,
        expected_end: 0,
        location: [0, 0, 0],
        schema: [],
      };
      req.name = form.find('.name-of-project').val();
      req.start_date = this.startd.getTime();
      req.expected_end = this.expecd.getTime();
      const loc = this.$refs.smap.getLocation();
      req.location = [ parseInt(100 * loc[0].position.lat), parseInt(100 * loc[0].position.lng), loc[1] ];

      const surveyQues = $('.form-control.ques');
      for (let i = 0; i < surveyQues.length; i++) {
        req.schema.push(self.newSchema(surveyQues[i].value));
      }

      console.log(req);

      $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: `${API}/c/projects/new`,
        data: JSON.stringify(req),
        success: function(res) {
          self.$router.push({ name: 'project', params: { project: res.id } });
        },
        error: function(res, status) {
          alert(status);
        },
      });
    },
  },
  data() {
    return {
      startd: new Date(),
      expecd: new Date(),
      cities: ["Haridwar", "Nainital", "Roorkee", "Haldwani"],
      numQues: 1,
    };
  },
  components: {
    SMap
  }
};
</script>
