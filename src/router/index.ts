import { createRouter, createWebHistory } from "vue-router";
import firebase from "firebase/app";
import Home from "../views/Home.vue";

export const AppRoutes = {
  home: "/",
  login: "/login",
  register: "/register",
  image: "/image",
  tour: "/tour",
  slider: "/slider"
};

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: AppRoutes.home,
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: AppRoutes.login,
      component: () =>
        import(/* webpackChunkName: "login" */ "../views/Login.vue"),
      meta: {
        requiresGuest: true
      }
    },
    {
      path: AppRoutes.register,
      component: () =>
        import(/* webpackChunkName: "register" */ "../views/Register.vue"),
      meta: {
        requiresGuest: true
      }
    },
    {
      path: AppRoutes.image,
      component: () =>
        import(/* webpackChunkName: "image" */ "../views/Image.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: AppRoutes.tour,
      component: () =>
        import(/* webpackChunkName: "tour" */ "../views/Tour.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: AppRoutes.slider,
      component: () =>
        import(/* webpackChunkName: "slider" */ "../views/Slider.vue"),
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser && !localStorage.getItem("user")) {
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
    if (firebase.auth().currentUser && localStorage.getItem("user")) {
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
