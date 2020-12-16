<template>
  <el-input-number
    v-model="num"
    @change="handleChange"
    :min="1"
    :max="10"
    label="数量"
  ></el-input-number>
</template>

<script>
export default {
  data() {
    return {
      num: 1,
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
      //提交到父组件GoodsDetail中,handleValue在父组件中绑定该方法
      this.$emit('handleValue',value)
    },
  },
};
</script>

<style>
</style>