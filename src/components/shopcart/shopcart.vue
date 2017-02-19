<template>
  <section class="shopcart-wrap">
    <article class="shopcart">
      <div class="bottom">
        <section class="icon" :class="{active:totalAmount > 0}" @click="openCartDetail">
          <div v-if="totalAmount > 0" class="amount">{{totalAmount}}</div>
        </section>
        <section class="cost">
          <span>￥</span><span class="number">{{totalCost}}</span>元
        </section>
        <section class="tip">另需配送费{{deliveryPrice}}元</section>
        <section class="btn-ensure" :class="{active: this.ensureCost <= 0}">
          <span>{{ensureTxt}}</span>
        </section>
      </div>

      <transition name="slideup">
        <section v-show="showCartDetail" class="detail">
          <div class="top">
            <div class="title">购物车</div>
            <div class="btn-clear-cart" @click="clearCart">清空</div>
          </div>
          <div class="cart-content" ref="cartContent">
            <div v-for="(item, index) of selectedFoods" class="cart-item">
              <span class="name">{{item.name}}</span>
              <span class="price">￥{{item.price}}</span>
              <div class="cartcontrol-wrap">
                <cartcontrol :food="item"></cartcontrol>
              </div>
            </div>
          </div>
        </section>
      </transition>
    </article>
    <div v-show="showCartDetail" class="barrier"></div>
  </section>
</template>

<script>
import Cartcontrol from '../cartcontrol/cartcontrol';
import Barrier from '../barrier/barrier';
export default {
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number
    },
    selectedFoods: {
      type: Array,
      default () {
        return [];
      }
    },
    goodsAmount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      totalCost: 0,
      totalAmount: 0,
      ensureTxt: '',
      showCartDetail: false
    };
  },
  watch: {
    selectedFoods () {
      var cost = 0;
      var amount = 0;
      for (let i = 0, l = this.selectedFoods.length; i < l; i++) {
        cost += this.selectedFoods[i].count * this.selectedFoods[i].price;
        amount++;
      }
      this.totalCost = cost;
      this.totalAmount = amount;
    },
    ensureCost () {
      if (this.ensureCost === this.minPrice) {
        this.ensureTxt = `￥${this.minPrice}起送`;
      } else if (this.ensureCost <= 0) {
        this.ensureTxt = `去结算`;
      } else {
        this.ensureTxt = `还差￥${this.ensureCost}`;
      }
    }
  },
  computed: {
    ensureCost () {
      var result = this.minPrice - this.totalCost;
      return result;
    }
  },
  methods: {
    openCartDetail () {
      this.showCartDetail = !this.showCartDetail;
    },
    clearCart () {
      this.selectedFoods.forEach((food) => {
        food.count = 0;
      });
    }
  },
  components: {
    Cartcontrol,
    Barrier
  }
};
</script>

<style lang="scss">
@import "../../common/style/function";
@import "../../common/style/common";
.shopcart-wrap {
  width: 100%;
  //height: 100%;
}
.shopcart-wrap>.barrier {
  position: absolute;
  top: REM(-346);
  height: calc(100% + 14.42rem);
  width: 100%;
  background: rgba(0,0,0,0.7);
  z-index: 1;
}
.shopcart {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 2;
  .bottom {
    display: flex;
    background: #333;
    line-height: 60px;
    font-size: 14px;
    color: rgba(255,255,255,0.5);
  }
  .icon {
    flex: 0 0 44px;
    position: relative;
    top: -10px;
    width: 44px;
    height: 44px;
    margin-left: 16px;
    border: 8px solid #333;
    border-radius: 30px;
    background: #6e6e6e url(./images/icon_shopcart.png) no-repeat center center;
    background-size: 33px 33px;
    &.active {
      background-color: #1515ee;
    }
    .amount {
      position: absolute;
      top: -14px;
      right: -8px;
      height: 2.2em;
      width: 2.2em;
      background: #f00;
      line-height: 2;
      text-align: center;
      color: #fff;
      font-size: 12px;
      border-radius: 30px;
    }
  }
  .cost {
    flex: 0.4;
    padding-right: 6px;
    margin-right: 10px;
    border-right: 1px solid #6e6e6e;;
  }
  .tip {
    flex: 1;
    font-size: 12px;
    opacity: 0.5;
    text-align: center;
  }
  .btn-ensure {
    width: 100px;
    height: 60px;
    flex: 0 0 100px;
    text-align: center;
    background: #6e6e6e;
    &.active {
      background: #8fcc17;
      color: #fff;
    }
  }

  .detail {
    position: absolute;
    top: -300px;
    left: 0;
    height: 300px;
    width: 100%;
    background: #fafafa;
    z-index: -1;
    transition: all 0.3s ease;
    &.slideup-enter, &.slideup-enter-active, &.slideup-leave-active {
      transform: translate3d(0, 300px, 0);
      //opacity: 0
    }
    &.slideup-enter-to, &.slideup-leave {
      transform: translate3d(0, 0, 0);
      //opacity: 1;
    }
    .top {
      position: relative;
      background: #f3f5f7;
      font-size: 14px;
      color: rgb(7,17,27);
      line-height: 40px;
      z-index: 2;
      >div {
        display: inline-block;
        &.title {
          padding: 0 REM(20);
          width: REM(460);
        }
        &.btn-clear-cart {
          width: REM(130);
          text-align: center;
          color: #1515ee;
        }
      }
      &::after {
        position: absolute;
        display: block;
        left: 0;
        bottom: 0;
        width: 100%;
        border-top: 1px solid rgba(7,17,27,0.4);
        content: ' ';
      }
    }
    .cart-content {
      position: relative;
      z-index: 1;
      height: 260px;
      overflow: scroll;
      font-size: 14px;
      .cart-item {
        display: flex;
        padding: 8px 0;
        margin: 8px;
        line-height: 22px;
        .name {
          flex: 2;
          font-size: 16px;
          color: rgb(7,17,27);
        }
        .price {
          flex: 1;
          color: red;
          font-weight: bold;
          text-align: center;
        }
        .cartcontrol-wrap {
          flex: 0 0 72px;
        }
      }
    }
  }
}
</style>
