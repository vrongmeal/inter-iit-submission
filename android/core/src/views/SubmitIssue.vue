<template>
  <div>

    <d-container fluid class="main-content-container px-4">

      <!-- Page Header -->
      <d-row no-gutters class="page-header py-2 pb-4 mb-3 border-bottom">
        <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
          <span class="text-uppercase page-subtitle">Report</span>
          <h3 class="page-title">Submit an Issue</h3>
        </d-col>
      </d-row>

      <d-row>
      <d-col lg="12" sm="12" mb="12" xs="12" class="mb-4">
      <d-card class="card-small">

            <!-- Form Example -->
            <d-card-header class="border-bottom">
              <h6 class="m-0">Submit an Issue</h6>
            </d-card-header>

            <d-list-group flush>
              <d-list-group-item class="p-3">
                <d-row>
                  <d-col>
                    <d-form @submit="handleSubmit">
                      <d-form-row>
                        <d-col md="4" class="form-group">
                          <label for="feInputState">Project</label>
                          <select class="form-control custom-select" @change="updateForm">
                            <option value="-1" selected>Submit an issue</option>
                            <option v-for="(p, i) in projects" :value="i" :key="i">{{ p.name }}</option>
                          </select>
                        </d-col>
                      </d-form-row>

                      <template v-if="isIssue">
                        <d-form-row>
                          <d-col md="6" class="form-group">
                            <label>Title</label>
                            <d-input class="title-input" type="text" placeholder="Title" />
                          </d-col>
                        </d-form-row>
                        <d-form-row>
                          <d-col md="6" class="form-group">
                            <label>Description</label>
                            <d-textarea class="description-input" placeholder="Description" />
                          </d-col>
                        </d-form-row>
                      </template>

                      <template v-else>
                        <d-form-row v-for="(ques, i) in projects[currentProject].schema" :key="i">
                          <d-col md="6" class="form-group" style="margin-bottom:1rem">
                            <label style="display:block;font-weight:bold;">{{ ques.q }}</label>
                            <label v-for="j in 5" :key="j" style="margin-right:0.6rem;cursor:pointer"><input type="radio" :name="`ques_${i}`" :value="j" style="margin-right:0.3rem" />{{j}}</label>
                          </d-col>
                        </d-form-row>
                      </template>

                      <d-button type="submit">Submit</d-button>
                    </d-form>
                  </d-col>
                </d-row>
              </d-list-group-item>
            </d-list-group>
          </d-card>
          </d-col>
        </d-row>
    </d-container>
  </div>
</template>

<script>
import Vue from "vue";
import { API } from "@/utils/config";
import $ from "jquery";
import store from "@/store.js";
import Swal from 'sweetalert2';

export default {
  name: "SubmitIssue",
  created() {
    const self = this;
    $.ajax({
      type: "GET",
      url: `${API}/c/projects`,
      error: function(res, status) {
        alert(status);
      },
      success: function(res) {
        self.projects = res;
      }
    });
  },
  methods: {
    updateForm(e) {
      if (e.target.value === '-1') {
        this.isIssue = true;
        return;
      }
      this.isIssue = false;
      this.currentProject = parseInt(e.target.value);
    },
    handleSubmit(e) {
      e.preventDefault();
      const self = this;
      navigator.geolocation.getCurrentPosition(function(position) {
        const crds = position.coords;
        const loc = `${crds.latitude.toFixed(2) * 100}|${crds.longitude.toFixed(2) * 100}|100`
        console.log(position);
        const form = $(e.target);
        let fd = new FormData();
        fd.append('image', self.$store.state.img, 'capture.png');
        fd.append('user', '0');
        fd.append('location', loc);
        if (self.isIssue) {
          fd.append('title', form.find('.title-input').val());
          fd.append('description', form.find('.description-input').val());
        } else {}
        $.ajax({
          type: 'POST',
          url: `${API}/m/issues/new`,
          data: fd,
          enctype: 'multipart/form-data',
          cache: false,
          contentType: false,
          processData: false,
          success: function(res) { 
            //////////////////////////////
            ////// do anything here //////
            //////////////////////////////
            Swal.fire({
              title: '<strong>Congrats, collected <i>1302</i> coins!</strong>',
              icon: 'success',
              html:
                'You have successfully completed the trip and provided important data for road survey.',
              showCloseButton: true,
              showCancelButton: true,
              focusConfirm: false,
              confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Great!',
              confirmButtonAriaLabel: 'Thumbs up, great!',
            })
          },
          error: function(res, status) {
            alert(status);
          },
        });
      });
    }
  },
  data() {
    return {
      projects: [],
      isIssue: true,
      currentProject: 0,
    };
  }
};
</script>
