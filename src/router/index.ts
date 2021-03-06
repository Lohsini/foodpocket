import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/LandingPage.vue'),
  },
  {
    path: '/landingpage',
    name: 'LandingPage',
    component: () => import('../views/LandingPage.vue'),
  },
  {
    path: '/registerpage',
    name: 'RegisterPage',
    component: () => import('../views/RegisterPage.vue'),
  },
  {
    path: '/confirmationpage',
    name: 'ConfirmationPage',
    component: () => import('../views/ConfirmationPage.vue'),
  },
  {
    path: '/successpage',
    name: 'SuccessPage',
    component: () => import('../views/SuccessPage.vue'),
  },
  {
    path: '/loginpage',
    name: 'LoginPage',
    component: () => import('../views/LoginPage.vue'),
  },
  {
    path: '/forgetpasswordpage',
    name: 'ForgetpasswordPage',
    component: () => import('../views/ForgetpasswordPage.vue'),
  },
  {
    path: '/foodpocket',
    name: 'FoodPocket',
    component: () => import('../views/FoodPocket.vue'),
    children: [
      {
        path: '',
        name: 'MainPocket',
        component: () => import('../components/pages/MainPocket.vue'),
      },
      {
        path: 'choosepocket',
        name: 'ChoosePocket',
        component: () => import('../components/pages/ChoosePocket.vue'),
      },
      {
        path: 'userinfo',
        name: 'UserInfo',
        component: () => import('../components/pages/UserInfo.vue'),
      },
      // {
      //   path: 'setting',
      //   name: 'Setting',
      //   component: () => import('../components/pages/Setting.vue')
      // }
    ],
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'activee',
});

export default router;
