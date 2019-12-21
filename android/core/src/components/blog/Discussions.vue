<template>
  <d-card class="card-small blog-comments">

    <!-- Card Header -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">{{ title }}</h6>
    </d-card-header>

    <d-card-body class="p-3">
      <div v-for="(discussion, idx) in itemsData" :key="idx" class="blog-comments__item d-flex p-3">

        <!-- Avatar -->
        <div class="blog-comments__avatar mr-3">
          <img :src="discussion.author.image" :alt="discussion.author.name" />
        </div>

        <!-- Content -->
        <div class="blog-comments__content">

          <!-- Content - Title -->
          <div class="blog-comments__meta text-muted">
            <a class="text-secondary" :href="discussion.author.url">{{ discussion.author.name }}</a> on <a class="text-secondary" :href="discussion.post.url">{{ discussion.post.title }}</a> <span class="text-muted">– Coins {{ discussion.price }} <i class="material-icons">sports_volleyball</i></span>
          </div>

          <!-- Content - Body -->
          <p class="m-0 my-1 mb-2 text-muted">{{ discussion.body }}</p>

          <!-- Content - Actions -->
          <div class="blog-comments__actions">
            <d-button-group size="small">
              <d-button class="btn-white" @click="handleClick('approve', discussion.price, discussion.id)">
                <span class="text-success"><i class="material-icons">check</i></span> Buy
              </d-button>
              <d-button class="btn-white" @click="handleClick('reject', discussion.price, discussion.id)">
                <span class="text-danger"><i class="material-icons">clear</i></span> Remove from list
              </d-button>
              <!-- <d-button class="btn-white" @click="handleClick('edit', discussion.id)">
                <span class="text-light"><i class="material-icons">more_vert</i></span> Edit
              </d-button> -->
            </d-button-group>
          </div>
        </div>

      </div>
    </d-card-body>

    <!-- <d-card-footer class="border-top">
      <d-row> -->

        <!-- View All Comments -->
        <!-- <d-col class="text-center view-report">
          <d-button type="submit" class="btn-white" @click="handleClick('view-all-comments')">View All Comments</d-button>
        </d-col> -->

      <!-- </d-row>
    </d-card-footer> -->
  </d-card>
</template>

<script>

export default {
  name: 'discussions',
  props: {
    /**
       * The component's title.
       */
    title: {
      type: String,
      default: 'Most Viewed Items',
    },
    /**
       * The discussions data.
       */
    itemsData: {
      type: Array,
    },
  },
  methods: {
    /**
       * Emits an action and passes the discussions' ID for reference.
       * @param  {String} action The action type. One of: approve,reject,edit,view-all-comments
       */
    handleClick(action, id) {
      this.$emit(action, id);
    },
  },
};
</script>
