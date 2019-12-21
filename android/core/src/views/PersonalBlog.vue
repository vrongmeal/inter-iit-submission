<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Dashboard</span>
        <h3 class="page-title">Map Overview</h3>
      </d-col>
    </d-row>

    <d-row>
      <d-col lg="12" md="12" sm="12" class="mb-4">
        <bo-map/>
      </d-col>
    </d-row>
  </d-container>
</template>

<style scoped>
.active {
  display: block;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0,0 ,0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 6969;
}

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
import SmallStats from '@/components/common/SmallStats.vue';
import TopReferrals from '@/components/common/TopReferrals.vue';
import UsersOverview from '@/components/blog/UsersOverview.vue';
import UsersByDevice from '@/components/blog/UsersByDeviceLite.vue';
import NewDraft from '@/components/blog/NewDraft.vue';
import Discussions from '@/components/blog/Discussions.vue';
import Map from '@/components/senpai/NMap.vue';
import Footer from '@/components/layout/MainFooter/MainFooter.vue';
import Video from '@/views/Video.vue';

export default {
  components: {
    SmallStats,
    boUsersOverview: UsersOverview,
    boUsersByDevice: UsersByDevice,
    boNewDraft: NewDraft,
    boDiscussions: Discussions,
    boTopReferrals: TopReferrals,
    boMap: Map,
  },
  data() {
    return {
      dateRange: {
        from: null,
        to: null,
      },
      videoToggle: false
    };
  },
  methods: {
    capture() {
      console.log("kekw");
      // this.videoToggle = !this.videoToggle;
      window.location = "/video";
    },
    handleApprove(id) {
      alert(`Approving discussion id: ${id}`); // eslint-disable-line no-alert
    },
    handleReject(id) {
      alert(`Rejecting discussion id: ${id}`); // eslint-disable-line no-alert
    },
    handleEdit(id) {
      alert(`Editing discussion id: ${id}`); // eslint-disable-line no-alert
    },
    handleViewAllComments() {
      alert('Viewing all comments!'); // eslint-disable-line no-alert
    },
  },
  computed: {
    smallStats() {
      return [];
    },
  },
};
</script>

