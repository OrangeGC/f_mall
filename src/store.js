import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login:false, //用户是否登录
    userInfo: null,   //用户信息
    cartList:[], //加入购物车
    showCart:false //是否显示购物车里的内容

  },
  mutations: {
    isShowCart(state,{showCart}){
      state.showCart=showCart
    }
  },
  actions: {

  }
})
