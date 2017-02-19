<template>
  <section class="ratings">
    <div class="top clear">
      <div class="left">
        <p class="score">{{seller.score}}</p>
        <p class="title">综合评分</p>
        <p class="rank-rate">高于周边商家<span>{{seller.rankRate}}%</span></p>
      </div>
      <div class="right">
        <div class="item">
          <div class="title">服务态度</div>
          <star :star-size="36" :score="seller.serviceScore"></star>
        </div>
        <div class="item">
          <div class="title">商品评分</div>
          <star :star-size="36" :score="seller.foodScore"></star>
        </div>
        <div class="item">
          <div class="title">送达时间</div>
          <div class="deliver">{{seller.deliveryTime}}</div>
        </div>
      </div>
    </div>
    <div class="assess-wrap">
      <assess v-if="ratings" goodTxt="好评" badTxt="差评" :ratings="ratings"></assess>
    </div>
  </section>
</template>

<script>
import Star from '../star/star';
import Assess from '../assess/assess';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      ratings: []
    };
  },
  watch: {
    ratings () {
      console.log(this.ratings);
    }
  },
  created () {
    this.$http.get('/api/ratings').then((response) => {
      response.json().then((res) => {
        this.ratings = res.data;
      });
    });
  },
  components: {
    Star,
    Assess
  }
};
</script>

<style lang="scss">
@import "../../common/style/function";
@import "../../common/style/common";
.ratings {
  position: absolute;
  top: REM(346);
  bottom: 0;
  width: 100%;
  overflow: scroll;
  .top {
    margin-bottom: 12px;
    .left {
      margin-top: 10px;
      margin-right: 6px;
      min-width: REM(240);
      min-height: 80px;
      float: left;
      text-align: center;
      .score {
        font-size: 22px;
        color: #ffaa44;
      }
      .title {
        font-size: 16px;
        color: #353535;
      }
      .rank-rate {
        font-size: 12px;
        color: #aaa;
      }
    }
    .right {
      margin-top: 14px;
      min-height: 80px;
      .item {
        padding: 4px 0;
        line-height: 15px;
        font-size: 14px;
        >div {
          display: inline-block;
          &.title {
            padding: 0 6px;
          }
          &.deliver {
            color: #999;
          }
        }
      }
    }
  }
  .assess-wrap {
    padding: 0 14px;
  }
}
</style>
