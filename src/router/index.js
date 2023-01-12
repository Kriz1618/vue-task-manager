import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import store from '@/store/store';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { unlogged: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: { unlogged: true }
  },
  {
    path: '/deleted',
    name: 'Deleted Projects',
    // route level code-splitting
    // this generates a separate chunk (deleted.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "deleted" */ '../views/DeletedProjects.vue'),
    meta: { protect: true }
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/Projects.vue'),
    meta: { protect: true }
  },
  {
    path: '/new-project',
    name: 'create',
    component: () => import('../views/CreateProjects.vue'),
    meta: { protect: true }
  },
  {
    path: '/edit-project/:id',
    name: 'Edit Project',
    component: () => import('../views/CreateProjects.vue'),
    meta: { protect: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(
  (to, from, next) => {
    if (to.meta.protect) {
      if (store.isUserLogged()) {
        return next();
      }
      return next('/login');
    } else if (to.meta.unlogged) {
      if (!store.isUserLogged()) {
        return next();
      }
      return next('/projects');
    } else {
      next();
    }
  }
)

export default router
