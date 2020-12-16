<template>
  <div id="index">
    <!-- <h3>导航</h3> -->
    <m-header></m-header>
    <!-- 这里的routerview渲染home这些子组件 -->
      <router-view></router-view>
  </div>
</template>

<script>

import MHeader from '../common/MHeader.vue'
export default {
  data() {
    return {
      
    }
  },
  components:{
    MHeader
  }

}
</script>

<style>

</style>