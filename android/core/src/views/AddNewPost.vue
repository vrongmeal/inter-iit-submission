<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <!-- <span class="text-uppercase page-subtitle">Blog Posts</span> -->
        <h3 class="page-title">Your Orders</h3>
      </d-col>
    </d-row>

        <!-- First Row of Posts -->
   <d-row>
      <d-col v-for="(post, idx) in PostsListTwo" :key="idx" lg="6" sm="12" class="mb-4">
        <d-card class="card-small card-post card-post--aside card-post--1">
          <div class="card-post__image" :style="{ backgroundImage: 'url(\'' + post.backgroundImage + '\')' }">
            <d-badge pill :class="['card-post__category', 'bg-' + post.categoryTheme ]">{{ post.category }}</d-badge>
            <div class="card-post__author d-flex">
              <a href="#" class="card-post__author-avatar card-post__author-avatar--small" :style="{ backgroundImage: 'url(\'' + post.authorAvatar + '\')' }">Written by Anna Ken</a>
            </div>
          </div>
          <d-card-body>
            <h5 class="card-title">
              <a class="text-fiord-blue" href="#">{{ post.title }}</a>
            </h5>
            <!-- <p class="card-text d-inline-block mb-3">{{ post.body }}</p> -->
            <span class="text-muted" ><span v-bind:class="post.date">{{ post.date }}</span></span>
          </d-card-body>
        </d-card>
      </d-col>
    </d-row>

       <!-- Second Row of Posts -->

    <!-- <d-row> -->
      <!-- Editor -->
      <!-- <d-col lg="9" md="12">
        <anp-editor />
      </d-col> -->

      <!-- Sidebar Widgets -->
      <!-- <d-col lg="3" md="12">
        <anp-sidebar-actions />
        <anp-sidebar-categories />
      </d-col> -->
    <!-- </d-row> -->
  </d-container>
</template>

<script>
import SidebarActions from '@/components/add-new-post/SidebarActions.vue';
import SidebarCategories from '@/components/add-new-post/SidebarCategories.vue';
import Editor from '@/components/add-new-post/Editor.vue';

import 'quill/dist/quill.snow.css';

// Second Row of posts
const PostsListTwo = [{
  backgroundImage: require('@/assets/images/marketplace/band.jpg'),
  category: 'Technology',
  categoryTheme: 'info',
  author: 'Anna Ken',
  authorAvatar: require('@/assets/images/avatars/0.jpg'),
  title: 'Mi Fitness Band',
  body: 'Conviction up partiality as delightful is discovered. Yet jennings resolved disposed exertion you off. Left did fond drew fat head poor jet pan flying over...',
  date: 'Delivered',
}, {
  backgroundImage: require('@/assets/images/marketplace/cutlery.jpg'),
  category: 'Utensils',
  categoryTheme: 'warning',
  author: 'John James',
  authorAvatar: require('@/assets/images/avatars/1.jpg'),
  title: 'Cutlery Set',
  body: 'Discovered had get considered projection who favourable. Necessary up knowledge it tolerably. Unwilling departure education to admitted speaking...',
  date: 'Delivered',
}, {
  backgroundImage: require('@/assets/images/marketplace/drone.jpg'),
  category: 'Technology',
  categoryTheme: 'info',
  author: 'John James',
  authorAvatar: require('@/assets/images/avatars/1.jpg'),
  title: 'Parrot AR Drone 2.0',
  body: 'Discovered had get considered projection who favourable. Necessary up knowledge it tolerably. Unwilling departure education to admitted speaking...',
  date: 'Cancelled',
}, {
  backgroundImage: require('@/assets/images/marketplace/earrings.jpg'),
  category: 'Jewellery',
  categoryTheme: 'dark',
  author: 'John James',
  authorAvatar: require('@/assets/images/avatars/1.jpg'),
  title: 'Gold Earrings',
  body: 'Discovered had get considered projection who favourable. Necessary up knowledge it tolerably. Unwilling departure education to admitted speaking...',
  date: 'Shipped',
}, {
  backgroundImage: require('@/assets/images/marketplace/headphones.jpg'),
  category: 'Technology',
  categoryTheme: 'info',
  author: 'John James',
  authorAvatar: require('@/assets/images/avatars/1.jpg'),
  title: 'JBL Headphones',
  body: 'Discovered had get considered projection who favourable. Necessary up knowledge it tolerably. Unwilling departure education to admitted speaking...',
  date: 'Shipped',
}];

export default {
  components: {
    anpEditor: Editor,
    anpSidebarActions: SidebarActions,
    anpSidebarCategories: SidebarCategories,
  },
  data() {
    return {
      PostsListTwo,
    };
  },
};
</script>
<style scoped>
.Delivered {
  color: #a5dc85;
}
.Cancelled {
  color: #ff7171;
}
.Shipped {
  color: #ecb95c;
}
</style>