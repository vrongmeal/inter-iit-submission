<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <!-- <span class="text-uppercase page-subtitle">Components</span> -->
        <h3 class="page-title">Marketplace</h3>
      </div>
    </div>

    <!-- Market Items -->
    <d-col lg="5" md="12" sm="12" class="mb-4">
      <bo-discussions @approve="handleApprove" @reject="handleReject" @edit="handleEdit" :itemsData="discussionsData" />
    </d-col>
  </d-container>
</template>

<script>
import Discussions from '@/components/blog/Discussions.vue';
import Swal from 'sweetalert2';

const discussionsData = [{
  id: 1,
  date: '3 days ago',
  price: 150,
  author: {
    image: require('@/assets/images/marketplace/band.jpg'),
    name: 'Mi Fitness Band',
    url: '#',
  },
  post: {
    title: 'Technology',
    url: '#',
  },
  body: 'The all-new Mi Band 3 has an OLED touch display allowing you to read messages and notification without taking your phone',
}, {
  id: 2,
  date: '4 days ago',
  price: 100,
  author: {
    image: require('@/assets/images/marketplace/cutlery.jpg'),
    name: 'Cutlery Set',
    url: '#',
  },
  post: {
    title: 'Utensils',
    url: '#',
  },
  body: 'Includes any hand implement used in preparing, serving, and especially eating food in Western culture',
}, {
  id: 3,
  date: '5 days ago',
  price: 400,
  author: {
    image: require('@/assets/images/marketplace/drone.jpg'),
    name: 'Parrot AR Drone 2.0',
    url: '#',
  },
  post: {
    title: 'Technology',
    url: '#',
  },
  body: 'It manoeuvres intuitively with a smartphone or tablet and offers exceptional sensations right from take-off',
}, {
  id: 1,
  date: '3 days ago',
  price: 700,
  author: {
    image: require('@/assets/images/marketplace/earrings.jpg'),
    name: 'Gold Earrings',
    url: '#',
  },
  post: {
    title: 'Jewellery',
    url: '#',
  },
  body: 'The offered earring is crafted with the aid of high-end technology under the stern supervision of our deft professionals by using supreme quality gold',
}, {
  id: 2,
  date: '4 days ago',
  price: 300,
  author: {
    image: require('@/assets/images/marketplace/headphones.jpg'),
    name: 'JBL Headphones',
    url: '#',
  },
  post: {
    title: 'Technology',
    url: '#',
  },
  body: 'It is flat-folding, lightweight, comfortable and compact allowing you to listen to music wirelessly from any Bluetooth-enabled device',
}];

export default {
  components: {
    boDiscussions: Discussions,
  },
  data() {
    return {
      discussionsData,
    };
  },
  methods: {
    handleApprove(price, id) {
      // alert(`Approving discussion id: ${id}`);
      if (this.$store.state.broke || (this.$store.state.coins - price < 0)) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href>Why do I have this issue?</a>'
        })
      } else {
        Swal.fire(
          'Order placed successfully',
          '',
          'success'
        ); // eslint-disable-line no-alert
        this.$store.commit('purchaseItems', price);
      }
    },
    handleReject(price, id) {
      Swal.fire(
        'Are you sure?',
        '',
        'question',
      ); // eslint-disable-line no-alert
      this.$store.commit('cancelItems', price);
    },
    handleEdit(id) {
      alert(`Editing discussion id: ${id}`); // eslint-disable-line no-alert
    },
    handleViewAllComments() {
      alert('Viewing all comments!'); // eslint-disable-line no-alert
    },
  },
};
</script>

