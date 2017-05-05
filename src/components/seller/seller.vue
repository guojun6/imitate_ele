<template>
  <div class="seller">
    <div class="overview">
      <p class="name">{{seller.name}}</p>
      <div class="score">
        <div class="star-wrap">
          <star :star-size="48" :score="seller.score"></star>
        </div>
        <div class="rating-count"><span>评论数</span>{{seller.ratingCount}}</div>
        <div class="sell-count"><span>总销量</span>{{seller.sellCount}}</div>
      </div>
      <div class="simple-txt">
        <div class="item">
          <p class="title">起送费</p>
          <p class="info">{{seller.minPrice}}<span>元</span></p>
        </div>
        <div class="item">
          <p class="title">商家配送</p>
          <p class="info">{{seller.deliveryPrice}}<span>元</span></p>
        </div>
        <div class="item">
          <p class="title">平均配送时间</p>
          <p class="info">{{seller.deliveryTime}}<span>分钟</span></p>
        </div>
      </div>
    </div>
    <split></split>
    <div v-if="seller.supports" class="bulletin">
      <p class="title">公告和活动</p>
      <p class="txt">{{seller.bulletin}}</p>
      <p class="supports" v-for="i in seller.supports.length">
        <span class="icon" :class="getSupportsType(i-1).cls">{{getSupportsType(i-1).txt}}</span>
        <span>{{seller.supports[i-1].description}}</span>
      </p>
    </div>
    <split></split>
    <div class="shop-view-wrap" ref="shopViewWrap">
      <div class="title">店铺实景</div>
      <ul class="shop-view" ref="shopView">
        <li v-for="(item, index) of seller.pics">
          <img :src="item">
        </li>
      </ul>
    </div>
    <split></split>
    <div class="shop-info">
      <div class="title">商家信息</div>
      <div class="txt">
        <p v-for="(item, index) of seller.infos">{{item}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Star from '../star/star';
import Split from '../split/split';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  watch: {},
  data () {
    return {
      viewScroll: {},
      a: {}
    };
  },
  mounted () {
    // this.$nextTick(() => {
    //   this._initBScroll();
    // });
  },
  methods: {
    getSupportsType (index) {
      var type = this.seller.supports[index]['type'];
      if (type === 0) {
        return {txt: '减', cls: 'icon1'};
      } else if (type === 1) {
        return {txt: '折', cls: 'icon2'};
      } else if (type === 2) {
        return {txt: '特', cls: 'icon3'};
      } else if (type === 3) {
        return {txt: '票', cls: 'icon4'};
      } else if (type === 4) {
        return {txt: '保', cls: 'icon5'};
      }
    }
  },
  components: {
    Star,
    Split
  }
};
</script>

<style lang="scss">
@import "../../common/style/function";
@import "../../common/style/base";
.seller {
  position: absolute;
  top: REM(346);
  bottom: 0;
  width: 100%;
  overflow: scroll;
  .overview {
    padding: 10px 18px 0;
    .name {
      padding-bottom: 10px;
      font-size: 18px;
      font-weight: bold;
    }
    .score {
      padding-bottom: 10px;
      .rating-count, .sell-count {
        display: inline-block;
        margin-left: 10px;
        font-size: 16px;
        color: #000;
        line-height: 20px;
        span {
          padding-right: 5px;
          font-size: 12px;
          color: #999;
        }
      }
    }
    .simple-txt {
      display: flex;
      margin-bottom: 10px;
      .item {
        flex: 1;
        text-align: center;
        margin: 0 6px;
        background: #f3f3f3;
        border-radius: 8px;
        .title {
          color: #969696;
          line-height: 2;
        }
        .info {
          font-size: 18px;
          padding-bottom: 4px;
          span {
            vertical-align: baseline;
            font-size: 12px;
          }
        }
      }
    }

  }
  .bulletin {
    padding: 10px 18px 0;
    font-size: 18px;
    line-height: 1.8;
    .title {
      font-weight: bold;
    }
    .txt {
      color: #686868;
    }
    .supports {
      padding: 2px 0;
      .icon {
        padding: 2px;

        &.icon1 {
          background: #fff;
          color: #f00;
        }
        &.icon2 {
          background: #20B2AA;
        }
        &.icon3 {
          background: #20B2AA;
        }
        &.icon4 {
          background: #FAEBD7;
          color: #8B008B;
        }
        &.icon5 {
          background: #DCDCDC;
          color: #FF8C00;
        }
      }
    }
  }
  .shop-view-wrap {
    box-sizing: border-box;
    margin: 0 5% 10px;
    padding: 10px 0 0;
    width: 90%;
    .title {
      font-size: 18px;
      font-weight: bold;
    }
  }
  .shop-view {
    font-size: 0;
    overflow: scroll;
    white-space: nowrap;
    >li {
      display: inline-block;
      margin-right: 10px;
    }
  }
  .shop-info {
    padding: 10px 18px 0;
    .title {
      font-size: 18px;
      font-weight: bold;
    }
    .txt {
      font-size: 14px;
      line-height: 2;
    }
  }
}
</style>
