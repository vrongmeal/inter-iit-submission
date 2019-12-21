import Vue from 'vue';
import Router from 'vue-router';

import PersonalBlog from './views/PersonalBlog.vue';
import UserProfileLite from './views/UserProfileLite.vue';
import AddNewPost from './views/AddNewPost.vue';
import Errors from './views/Errors.vue';
import SubmitIssue from './views/SubmitIssue.vue';
import Tables from './views/Tables.vue';
import BlogPosts from './views/BlogPosts.vue';
import Experiments from './views/Experiments.vue';
import Admin from './views/Admin.vue';
import Video from './views/Video.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: PersonalBlog,
    },
    {
      path: '/settings',
      name: 'settings',
      component: UserProfileLite,
    },
    {
      path: '/your-orders',
      name: 'your-orders',
      component: AddNewPost,
    },
    {
      path: '/errors',
      name: 'errors',
      component: Errors,
    },
    {
      path: '/submit-issue',
      name: 'submit-issue',
      component: SubmitIssue,
    },
    {
      path: '/issue-tracker',
      name: 'issue-tracker',
      component: Tables,
    },
    {
      path: '/marketplace',
      name: 'marketplace',
      component: BlogPosts,
    },
    {
      path: '/experiments',
      name: 'experiments',
      component: Experiments,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    },
    {
      path: '/video',
      name: 'video',
      component: Video,
    },
    {
      path: '*',
      redirect: '/errors',
    },
  ],
});
