<template>
  <div class="goods">
    <div class="nav">
      <div class="w">
        <a
          href="javascript:;"
          v-for="(navItem, i) in navList"
          :key="i"
          :class="{ active: i === isIndex }"
          @click="handleSort(i)"
          >{{ navItem.title }}</a
        >
        <div class="price-interval">
          <input type="number" class="input" placeholder="价格" v-model="min" />
          <span style="margin: 0 5px">-</span>
          <input type="number" placeholder="价格" v-model="max" />
          <el-button
            type="primary"
            size="small"
            style="margin-left: 10px"
            @click="reset()"
            >确定</el-button
          >
        </div>
      </div>
    </div>

    <!-- ------------------------------ -->
    <div>
      <!-- 渲染所有商品 -->
      <div class="goods-box w">
        <mall-goods
          :goods="goods"
          v-for="goods in allGoods"
          :key="goods.id"
        ></mall-goods>
      </div>
      <!-- 分页 -->
      <div class="w">
        <el-pagination
          style="float: right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[8, 16, 40, 64]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import MallGoods from "../../components/MallGoods.vue";
export default {
  components: {
    MallGoods,
  },
  data() {
    return {
      max: "", //输入框里输入的最大值，对应请求参数priceLte
      min: "", //输入框里输入的最大值，对应请求参数priceGt
      navList: [
        { title: "综合排序" },
        { title: "价格由低到高" },
        { title: "价格由高到低" },
      ],
      isIndex: 0,
      currentPage: 1, //默认商品第一页开始
      pageSize: 16, //一页的数量，默认设为20
      sort: "", //价格排序参数
      total: 0, //请求到的商品总数
      allGoods: [], //所有商品
    };
  },

  created() {
    this.getAllGoods(); //获取所有商品数据
  },

  watch:{
    $route: 'getAllGoods'
  },

  methods: {
    //element分页的方法
    handleSizeChange(val) {
      this.pageSize = val;
      this.getAllGoods();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAllGoods();
      console.log(`当前页: ${val}`);
    },

    //获取所有商品数据
    getAllGoods() {
      const url = this.$route.query.cid
        ? `/api/goods/allGoods?page=${this.currentPage}&size=${this.pageSize}&sort=${this.sort}&priceGt=${this.min}&priceLte=${this.max}&cid=${this.$route.query.cid}`
        : `/api/goods/allGoods?page=${this.currentPage}&size=${this.pageSize}&sort=${this.sort}&priceGt=${this.min}&priceLte=${this.max}`;
      try {
         this.$http.getAllGoods(url).then((res) => {
        this.allGoods = res.data.data;
        this.total = res.data.total;
        // console.log(this.allGoods);
        // console.log(this.total);
      });
      } catch (error) {
        console.log(error);
      }

     
    },

    //排序
    priceSort(i) {
      this.sort = i;
      this.getAllGoods();
    },

    //综合排序
    reset() {
      this.currentPage = 1;
      this.sort = "";
      this.getAllGoods();
    },

    handleSort(i) {
      this.isIndex = i;
      switch (i) {
        case 0:
          //综合排序
          this.reset();
          break;
        case 1:
          //价格由低到高
          this.priceSort(1);
          break;
        case 2:
          //价格由高到低
          this.priceSort(-1);
          break;

        default:
          break;
      }
    },
  },

  // watch: {
  //   $route: "getAllGoods",
  // },
  // created() {
  //   this.getAllGoods();
  // },
  // methods: {
  //   handleSizeChange(val) {
  //     this.pageSize = val;
  //     this.getAllGoods();
  //   },
  //   handleCurrentChange(val) {
  //     this.currentPage = val;
  //     this.getAllGoods();
  //   },
  //   async getAllGoods() {
  //     const url = this.$route.query.cid
  //       ? `/api/goods/allGoods?page=${this.currentPage}&size=${this.pageSize}&sort=${this.sort}&priceGt=${this.min}&priceLte=${this.max}&cid=${this.$route.query.cid}`
  //       : `/api/goods/allGoods?page=${this.currentPage}&size=${this.pageSize}&sort=${this.sort}&priceGt=${this.min}&priceLte=${this.max}`;
  //     try {
  //       const res = await this.$http.get(url);

  //       this.allGoods = res.data.data;
  //       this.total = res.data.total;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  //   // 排序
  //   priceSort(v) {
  //     this.sort = v;
  //     this.getAllGoods();
  //   },
  //   reset() {
  //     this.currentPage = 1;
  //     this.sort = "";
  //     this.getAllGoods();
  //   },
  //   handleSort(i) {
  //     this.isIndex = i;
  //     switch (i) {
  //       case 0:
  //         //   综合排序
  //         this.reset();
  //         break;
  //       case 1:
  //         this.priceSort(1);
  //         //   正序
  //         break;
  //       case 2:
  //         this.priceSort(-1);
  //         //   倒序
  //         break;

  //       default:
  //         break;
  //     }
  //   },
  // },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixin";
@import "../../assets/style/theme";

.nav {
  height: 60px;
  line-height: 60px;
  > div {
    display: flex;
    align-items: center;
    a {
      padding: 0 30px 0 0;
      height: 100%;
      @extend %block-center;
      font-size: 12px;
      color: #999;
      &.active {
        color: #5683ea;
      }
      &:hover {
        color: #5683ea;
      }
    }
    input {
      @include wh(80px, 30px);
      border: 1px solid #ccc;
    }
    input + input {
      margin-left: 10px;
    }
  }
  .price-interval {
    padding: 0 15px;
    @extend %block-center;
    input[type="number"] {
      border: 1px solid #ccc;
      text-align: center;
      background: none;
      border-radius: 5px;
    }
  }
}

.goods-box {
  overflow: hidden;
  > div {
    float: left;
    border: 1px solid #efefef;
  }
}

.no-info {
  padding: 100px 0;
  text-align: center;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  .no-data {
    align-self: center;
  }
}

.img-item {
  display: flex;
  flex-direction: column;
}

.el-pagination {
  align-self: flex-end;
  margin: 3vw 10vw 2vw;
}

.section {
  padding-top: 8vw;
  margin-bottom: -5vw;
  width: 1218px;
  align-self: center;
}

.recommend {
  display: flex;
  > div {
    flex: 1;
    width: 25%;
  }
}
</style>