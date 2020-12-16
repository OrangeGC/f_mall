import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import Login from "./views/Login/Login.vue";
import Home from "./views/Home/Home.vue";
import Goods from './views/Goods/Goods.vue';
import Thanks from './views/Thanks/Thanks.vue'
import GoodsDetail from './views/GoodsDetail/GoodsDetail.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      //先渲染到App.vue的routview中
      path: "/",
      redirect: "/home",
      name: "home",
      component: Index,
      children: [
        {
          path: "home",
          component: Home,
        },
        {
          path: "goods",
          component: Goods,
        },
        {
          path: "thanks",
          component: Thanks,
        },
        {
          path:'goodsDetail',
          name:'goodsDetail',
          component:GoodsDetail
        }
      ],
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ],
});
