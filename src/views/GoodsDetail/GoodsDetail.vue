<template>
  <div class="w store-content">
    <div class="gray-box">
      <div class="gallery-wrapper">
        <div class="gallery">
          <div class="thumbnail">
            <ul>
              <li
                v-for="(item, i) in smallimg"
                :key="i"
                :class="{ on: item === bigimg }"
                @click="handleClick(item)"
              >
                <img :src="item" />
              </li>
            </ul>
          </div>
          <div class="thumb">
            <div class="big">
              <img :src="bigimg" />
            </div>
          </div>
        </div>
      </div>
      <!--右边-->
      <div class="banner">
        <div class="sku-custom-title">
          <h4>{{ productDetail.productName }}</h4>
          <h6>
            <span>{{ productDetail.subTitle }}</span>
            <span class="price">
              <em>¥</em>
              <!-- v-if="productDetail.salePrice"判断是否存在，不能使用v-show -->
              <!-- 或者转数值 -->
              <i>{{ Number(productDetail.salePrice).toFixed(2) }}</i>
            </span>
          </h6>
        </div>
        <div class="num">
          <span class="params-name">
            <!-- 子组件传来的handleValue -->
            数量：<BugNumber @handleValue="handleNum"></BugNumber
          ></span>
        </div>
        <div class="buy">
          <el-button type="primary">加入购物车</el-button>
          <el-button type="danger">现在购买</el-button>
        </div>
      </div>
    </div>
    <!--产品信息-->
    <div class="item-info">
      <m-shelf title="产品信息">
        <div slot="content">
          <div v-if="productDetail.detail">
            <div v-html="productDetail.detail"></div>
          </div>
          <div class="no-info" v-else>
            <img src="/static/imgages/no-data.png" alt="" />
            <br />该商品暂无内容数据
          </div>
        </div>
      </m-shelf>
    </div>
  </div>
</template>

<script>
import BugNumber from "../../components/BugNumber";
import MShelf from "../../components/Shelf";
export default {
  data() {
    return {
      productDetail: {},
      bigimg: "",
      smallimg: [],
    };
  },
  components: {
    MShelf,
    BugNumber,
  },
  methods: {
    //接收子组件bugnumber传来的num商品数量值
    handleNum(num) {
      console.log(num);
    },

    //选中小图片详情时大图片详情变为选中的小图片
    handleClick(img) {
      this.bigimg = img;
    },

    getGoodsDetail() {
      var id = this.$route.query.productId;
      this.$http
        .getGoodsDetail("/api/goods/productDet", {
          productId: id,
        })
        .then((res) => {
          this.productDetail = res.data;
          this.bigimg = res.data.productImageBig;
          this.smallimg = res.data.productImageSmall;
          console.log(this.productDetail);
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log(res);
    },
  },
  created() {
    this.getGoodsDetail();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixin";

.store-content {
  clear: both;
  width: 1220px;
  min-height: 600px;
  padding: 0 0 25px;
  margin: 0 auto;
}

.gray-box {
  display: flex;
  padding: 60px;
  margin: 20px 0;
  .gallery-wrapper {
    .gallery {
      display: flex;
      width: 540px;
      .thumbnail {
        li:first-child {
          margin-top: 0px;
        }
        li {
          @include wh(80px);
          margin-top: 10px;
          padding: 12px;
          border: 1px solid #f0f0f0;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 5px;
          cursor: pointer;
          &.on {
            padding: 10px;
            border: 3px solid #ccc;
            border: 3px solid rgba(0, 0, 0, 0.2);
          }
          img {
            display: block;
            @include wh(100%);
          }
        }
      }
      .thumb {
        .big {
          margin-left: 20px;
        }
        img {
          display: block;
          @include wh(440px);
        }
      }
    }
  }
  // 右边
  .banner {
    width: 450px;
    margin-left: 10px;
    h4 {
      font-size: 24px;
      line-height: 1.25;
      color: #000;
      margin-bottom: 13px;
    }
    h6 {
      font-size: 14px;
      line-height: 1.5;
      color: #bdbdbd;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .sku-custom-title {
      overflow: hidden;
      padding: 8px 8px 18px 10px;
      position: relative;
    }
    .params-name {
      padding-right: 20px;
      font-size: 14px;
      color: #8d8d8d;
      line-height: 36px;
    }
    .num {
      padding: 29px 0 8px 10px;
      border-top: 1px solid #ebebeb;
      display: flex;
      align-items: center;
    }
    .buy {
      position: relative;
      border-top: 1px solid #ebebeb;
      padding: 30px 0 0 10px;
    }
  }
}

.item-info {
  .gray-box {
    padding: 0;
    display: block;
  }
  .img-item {
    width: 1220px;
    // padding: 1vw;
    text-align: center;
    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }
}

.no-info {
  padding: 200px 0;
  text-align: center;
  font-size: 30px;
}

.price {
  display: block;
  color: #d44d44;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  text-align: right;
  i {
    padding-left: 2px;
    font-size: 24px;
  }
}
</style>