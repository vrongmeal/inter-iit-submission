import Vue from 'vue';
import Router from 'vue-router';

import PersonalBlog from './views/PersonalBlog.vue';
import UserProfileLite from './views/UserProfileLite.vue';
import AddNewPost from './views/AddNewPost.vue';
import Errors from './views/Errors.vue';
import ComponentsOverview from './views/ComponentsOverview.vue';
import Tables from './views/Tables.vue';
import BlogPosts from './views/BlogPosts.vue';
import Experiments from './views/Experiments.vue';
import Admin from './views/Admin.vue';
import NewProject from './views/NewProject.vue';
import Map from './views/Map.vue';
import Tracker from './views/Tracker.vue';


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
      redirect: '/blog-overview',
    },
    {
      path: '/blog-overview',
      name: 'blog-overview',
      component: PersonalBlog,
    },
    {
      path: '/user-profile-lite',
      name: 'user-profile-lite',
      component: UserProfileLite,
    },
    {
      path: '/add-new-post',
      name: 'add-new-post',
      component: AddNewPost,
    },
    {
      path: '/errors',
      name: 'errors',
      component: Errors,
    },
    {
      path: '/components-overview',
      name: 'components-overview',
      component: ComponentsOverview,
    },
    {
      path: '/tables',
      name: 'tables',
      component: Tables,
    },
    {
      path: '/blog-posts',
      name: 'blog-posts',
      component: BlogPosts,
    },
    {
      path: '/experiments',
      name: 'experiments',
      component: Experiments,
    },
    {
      path: '/project/:project',
      name: 'project',
      component: Admin,
    },
    {
      path: '/newproject',
      name: 'newproject',
      component: NewProject,
    },
    {
      path: '/tracker',
      name: 'tracker',
      component: Tracker,
    },
    {
      path: '/map',
      name: 'map',
      component: Map,
    },
    {
      path: '*',
      redirect: '/errors',
    },
  ],
});
