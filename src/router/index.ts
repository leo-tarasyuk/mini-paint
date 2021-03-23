import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import firebase from "firebase/app";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      component: () =>
        import(/* webpackChunkName: "login" */ "../views/Login.vue"),
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/register",
      component: () =>
        import(/* webpackChunkName: "register" */ "../views/Register.vue"),
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/image",
      component: () =>
        import(/* webpackChunkName: "image" */ "../views/Image.vue"),
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      next({
        path: "/",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
