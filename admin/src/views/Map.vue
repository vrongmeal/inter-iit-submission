<template>
  <d-container fluid class="main-content-container px-4 py-4">
    <d-row>
      <d-col sm="12" class="mb-4">
        <d-card class="card-small card-post card-post--1">
          <NMap @senddetails="showSlide" />
        </d-card>
      </d-col>
    </d-row>
  </d-container>
</template>
<script>
import NMap from "../components/senpai/NMap";
import $ from "jquery";
export default {
    name: 'Map',
    components: {
        NMap
    },
    methods : {
        showSlide(a) {
            console.log('lole ', a)
            this.$router.push({
                name: 'project',
                params: {
                    project: a
                }
            })
        }
    }
}
</script>
