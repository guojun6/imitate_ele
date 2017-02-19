<template>
  <article class="goods">
    <div class="middle">
      <section class="menu-wrap" ref="menuWrap">
        <ul v-if="goods.length">
          <li v-for="(item, index) of goods" class="border1px" :class="{active: curMenuIndex === index}" @click="changeActive(index, $event)">{{item.name}}</li>
        </ul>
      </section>
      <section class="goods-wrap" ref="foodsWrap">
        <ul>
          <li v-for="(item, index) of goods" class="goods-list goods-list-hook">
            <h4>{{item.name}}</h4>
            <detail-foods :foods-list="item.foods" @getFood="getFood"></detail-goods>
          </li>
        </ul>
        <h4></h4>
      </section>
    </div>
    <food v-show="showFoodDetail" :food="activeFood" @foodToGood="back"></food>
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :selected-foods="selectedFoods"></shopcart>

  </article>
</template>

<script>
import detailFoods from './detail_goods/detail_goods';
import BScroll from 'better-scroll';
import Shopcart from '../shopcart/shopcart';
import Food from '../food/food';
export default {
 props: {
   seller: {
     type: Object
   }
 },

 data () {
   return {
     goods: [],
     foodsScroll: {},
     menuScroll: {},
     listHeight: [],
     scrollY: 0,
     activeFood: {},
     showFoodDetail: false
   };
 },
 computed: {
   curMenuIndex () {
     let height1, height2;
     let a = this.scrollY;
     for (let i = 0, l = this.listHeight.length; i < l; i++) {
       height1 = this.listHeight[i];
       height2 = this.listHeight[i + 1];
       if (!height2 || (a >= height1 && a <= height2)) {
         return i;
       }
     }
   },
   selectedFoods () {
     var result = [];
     this.goods.forEach((good) => {
       good.foods.forEach((food) => {
         if (food.count) {
           result.push(food);
         }
       });
     });
     return result;
   }
 },
 created () {
   this.$http.get('/api/goods').then((response) => {
     response.json().then((res) => {
       this.goods = res.data;
       this.$nextTick(() => {
         this._initBScroll();
         this._calHeight();
       });
     });
   });
 },
 methods: {
   changeActive (index, ev) {
     if (!ev._constructed) {
       return;
     }
     let goodsList = document.querySelectorAll('.goods-wrap .goods-list-hook');
     this.foodsScroll.scrollToElement(goodsList[index], 300);
   },
   _initBScroll () {
     this.menuScroll = new BScroll(this.$refs.menuWrap, {
       click: true
     });
    this.foodsScroll = new BScroll(this.$refs.foodsWrap, {
      click: true,
      probeType: 3
    });
    this.foodsScroll.on('scroll', (pos) => {
      this.scrollY = Math.abs(Math.round(pos.y));
    });
  },
  _calHeight () {
    let height = 0;
    this.listHeight.push(height);
    for (let i = 0, l = this.goods.length - 1; i < l; i++) {
      height += document.getElementsByClassName('goods-list-hook')[i].clientHeight;
      this.listHeight.push(height);
    }
  },
  getFood (food) {
    this.activeFood = food;
    this._gotoFood();
  },
  _gotoFood () {
    this.showFoodDetail = true;
  },
  back () {
    this.showFoodDetail = false;
  }
 },
 components: {
   detailFoods,
   Shopcart,
   Food
 }
};
</script>

<style lang="scss">
@import "../../common/style/function";
@import "../../common/style/common";
.goods {
  position: absolute;
  top: REM(346);
  bottom: 0;
  width: 100%;
  .middle{
    position: absolute;
    display: flex;
    top: 0;
    bottom: REM(96);
    width: 100%;
    font-size: 0;
    >section {
      display: inline-block;
      overflow: hidden;
    }
    .menu-wrap {
      box-sizing: border-box;
      flex: 0 0 80px;
      width: 80px;
      height: 100%;
      font-size: 14px;
      background: #f3f5f7;
      li {
        position: relative;
        padding: 14px 8px;
        &:after {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          border-top: 1px solid rgba(7, 17, 27, 0.3);
          content: ' ';
        }
        &.active {
          position: relative;
          top: -1px;
          font-weight: bold;
          background: #fff;
          &:after {
            border-color: transparent;
          }
        }
      }
    }
    .goods-wrap {
      flex: 1;
      height: 100%;
      .goods-list {
        margin-bottom: 10px;
        &:last-child {
          margin-bottom: 0;
        }
        h4 {
          padding-left: 10px;
          font-size: 18px;
          color: #a5a5a5;
          background: #e5e5e5;
        }
      }
    }
  }


}
</style>
