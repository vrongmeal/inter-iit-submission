<template>
  <d-row class="main-footer d-flex p-2 px-3 bg-white border-top">
    <div :class="[contained ? 'container' : 'container-fluid']">
      <div class="record-button text-centre">
        <d-button class="myClass1">Start Recording</d-button>
      </div>
      <!-- <div class="row">
        <ul class="nav">
          <li v-for="(item, idx) in menuItems" :key="idx" class="nav-item">
            <d-link class="nav-link" :to="item.to">{{ item.title }}</d-link>
          </li>
        </ul>
        <span class="copyright ml-auto my-auto mr-2">{{ copyright }}</span>
      </div> -->
    </div>
  </d-row>
</template>

<style scoped>
.main-footer {
  /* position: fixed; */
  display: flex;
  justify-content: center;
}

.myClass1 {
  position: relative;
  left: 50%;
  margin-left: -60px;
}
</style>

<script>
// const defaultMenuItems = [{
//   title: 'Home',
//   to: '#',
// }, {
//   title: 'Services',
//   to: '#',
// }, {
//   title: 'About',
//   to: '#',
// }, {
//   title: 'Products',
//   to: '#',
// }, {
//   title: 'Blog',
//   to: '#',
// }];

export default {
  name: 'main-footer',
  props: {
    /**
       * The footer menu items.
       */
    // menuItems: {
    //   type: Array,
    //   default() {
    //     return defaultMenuItems;
    //   },
    // },
    /**
       * The copyright information.
       */
    // copyright: {
    //   type: String,
    //   default: 'Copyright © 2018 DesignRevision',
    // },
    /**
       * Whether the footer should be wrapped in a container, or not.
       */
    contained: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
