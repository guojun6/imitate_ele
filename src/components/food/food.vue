<template>
  <div v-if="food" class="food">
    <div class="back" @click="backToGoods">&lt;</div>
    <div class="big-pic">
      <img :src="food.image">
    </div>
    <div class="p-1">
      <div class="name">{{food.name}}</div>
      <p class="reply">
        <span class="sell-amount">月销{{food.sellCount}}份</span>
        <span class="rating">好评率: {{food.rating}}%</span>
      </p>
      <p class="price">
        <span>￥{{food.price}}</span>
        <del v-if="food.oldPrice" class="old">{{food.oldPrice}}</del>
      </p>
      <div v-show="!food.count" class="btn-add-cart" @click="pressFirst">加入购物车</div>
      <div class="cartcontrol-wrap">
        <cartcontrol :food="food"></cartcontrol>
      </div>
    </div>
    <split></split>
    <div class="p-2">
      <p class="food-desc-title">商品介绍</p>
      <p class="food-desc">{{food.info}}</p>
    </div>
    <split></split>
    <div class="p-3">
      <div class="title">商品评价</div>
      <assess goodTxt="推荐" badTxt="吐槽" :ratings="food.ratings"></assess>
    </div>
  </div>
</template>

<script>
import Cartcontrol from '../cartcontrol/cartcontrol';
import Split from '../split/split';
import Vue from 'vue';
import Assess from '../assess/assess';
export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      // pressedBtn: false
    };
  },
  components: {
    Cartcontrol,
    Split,
    Assess
  },
  methods: {
    pressFirst () {
      Vue.set(this.food, 'count', 1);
    },
    backToGoods () {
      this.$emit('foodToGood');
    }
  }
};
</script>

<style lang="scss">
@import "../../common/style/function";
@import "../../common/style/common";
.food {
  position: absolute;
  top: REM(-346);
  left: 0;
  height: calc(100% + 14.42rem - 60px);
  width: 100%;
  background: #fff;
  transition: all 0.3s ease;
  overflow-y: scroll;
  z-index: 1;
  .back {
    position: absolute;
    left: REM(16);
    top: REM(16);
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    text-align: center;
    color: #fff;
    font-weight: bold;
    background: rgba(0,0,0,0.7);
    border-radius: 15px;
    z-index: 100;
  }
  .big-pic {
    width: 100%;
    >img {
      width: 100%;
    }
  }
  .p-1 {
    position: relative;
    padding: 10px 20px;
  }
  .name {
    font-size: 20px;
    font-weight: bold;
  }
  .reply {
    font-size: 14px;
    color: #777;
  }
  .price {
    font-size: 18px;
    color: red;
    font-weight: bold;
    .old {
      font-weight: normal;
      color: #aaa;
    }
  }
  .btn-add-cart {
    position: absolute;
    right: 20px;
    bottom: 12px;
    padding: 5px 10px;
    font-size: 14px;
    color: #fff;
    border-radius: 16px;
    background: #1515ee;
    z-index: 2
  }
  .cartcontrol-wrap {
    position: absolute;
    right: 20px;
    bottom: 12px;
    z-index: 1;
  }
  .p-2 {
    position: relative;
    padding: 10px 20px;
    .food-desc-title {
      font-size: 20px;
    }
    .food-desc {
      font-size: 16px;
      line-height: 2;
      color: #777;
    }
  }
  .p-3 {
    position: relative;
    padding: 10px 20px;
    .title {
      font-size: 20px;
    }
  }
}
</style>
