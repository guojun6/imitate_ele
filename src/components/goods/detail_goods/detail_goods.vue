<template>
  <ul v-if="foodsList" class="detail-foods">
    <li v-for="(item, index) of foodsList" class="clear" @click="gotoFood(item)">
      <div class="pic">
        <img :src="item.icon">
      </div>
      <div class="desc">
        <p class="title">{{item.name}}</p>
        <p v-if="item.description" class="description">{{item.description}}</p>
        <p class="reply">
          <span class="sell-amount">月销{{item.sellCount}}份</span>
          <span class="rating">好评率: {{item.rating}}%</span>
        </p>
        <p class="price">
          <span><span class="money-icon">￥</span>{{item.price}}</span>
          <del v-if="item.oldPrice" class="old">{{item.oldPrice}}</del>
        </p>
        <div class="cartcontrol-wrap">
          <cartcontrol :food="item"></cartcontrol>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import Cartcontrol from '../../cartcontrol/cartcontrol';
export default {
  props: {
    foodsList: {
      type: Array
    }
  },
  methods: {
    gotoFood (food) {
      this.$emit('getFood', food);
    }
  },
  mounted () {
  },
  components: {
    Cartcontrol
  }
};
</script>

<style lang="scss">
.detail-foods {
  font-size: 12px;
  li {
    display: flex;
    margin: 20px 0 0 20px;

    .pic {
      flex: 0 0 80px;
      width: 80px;
      height: 80px;
      margin-right: 10px;
      >img {
        width: 100%;
      }
    }
    .desc {
      position: relative;
      flex: 1;
      .title {
        font-size: 18px;
        font-weight: bold;
      }
      .description {
        color: #a5a5a5;
      }
      .reply {
        color: #a5a5a5;
        >span {
          display: inline-block;
        }
        .rating {
          margin-left: 24px;
        }
      }
      .price {
        color: red;
        font-size: 16px;
        font-weight: bold;
        margin-top: 4px;
        >span {
          line-height: 16px;
        }
        .money-icon {
          font-size: 12px;
        }
        .old {
          text-decoration: line-through;
          color: #aaa;
          font-size: 12px;
        }
      }
      .cartcontrol-wrap {
        position: absolute;
        right: 14px;
        bottom: 4px;
      }
    }
  }
}
</style>
