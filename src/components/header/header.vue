<template>
  <section class="header">
    <section class="avatar-blur">
      <img :src="seller.avatar">
    </section>
    <header class="title-header">
      <div class="content-wrap">
        <div class="avatar">
          <img :src="seller.avatar">
        </div>
        <div class="header-right">
          <div class="shop-title clear">
            <span class="brand">品牌</span>
            <span>{{seller.name}}</span>
          </div>
          <div class="distribution">
            <span>{{seller.description}}</span>
            <span>/</span>
            <span>{{seller.deliveryTime}}分钟送达</span>
          </div>
          <div v-if="ifGetedSupports" class="supports clear">
            <p>
              <span class="icon" :class="getSupportsType(0).cls">{{getSupportsType(0).txt}}</span>
              <span>{{seller.supports[0].description}}</span>
            </p>
            <button type="button" @click="toggleDetail">{{seller.supports.length}}个 &gt;</button>
          </div>
        </div>

      </div>
      <div class="bulletin-wrap">
        <span>公告</span>
        <span>{{seller.bulletin}}</span>
        <span>&gt;</span>
      </div>
    </header>
    <transition name="fade">
      <section v-show="detailDOM" class="bulletin-detail">
        <div class="detail-wrap">
          <div class="detail-main">
            <h1>{{seller.name}}</h1>
            <div class="detail-star">
              <star :star-size="starSize" :score="seller.score"></star>
            </div>
            <div class="title-discount">
              <span class="line"></span>
              <span class="name">优惠信息</span>
              <span class="line"></span>
            </div>
            <div v-if="ifGetedSupports" class="discount-content">
              <p v-for="i in seller.supports.length">
                <span class="icon" :class="getSupportsType(i-1).cls">{{getSupportsType(i-1).txt}}</span>
                <span>{{seller.supports[i-1].description}}</span>
              </p>
            </div>

            <div class="title-bulletin">
              <span class="line"></span>
              <span class="name">商家公告</span>
              <span class="line"></span>
            </div>
            <div class="bulletin-content">
              {{seller.bulletin}}
            </div>
          </div>
        </div>
        <div class="detail-close" @click="toggleDetail">×</div>
      </section>
    </transition>
  </section>
</template>

<script>
  import Star from '../star/star';
  export default {
    props: ['seller'],
    data () {
      return {
        ifGetedSupports: false,
        detailDOM: false,
        starSize: 48
      };
    },
    created () {

    },
    watch: {
      seller () {
        if (this.seller.supports) {
          this.ifGetedSupports = true;
        }
      }
    },
    methods: {
      // return {
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
      },
      toggleDetail () {
        this.detailDOM = !this.detailDOM;
      }
      // };
    },
    components: {
      Star
    }
  };
</script>

<style lang="scss">
@import "../../common/style/function";
@import "../../common/style/common";
.header {
  overflow-x: hidden;
  overflow-y: auto;
  .avatar-blur {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: REM(266);
    >img {
      width: 100%;
      height: 100%;
      filter: blur(10px);
    }
  }
  .title-header {
    width: 100%;
    //height: REM(268);
    background: rgba(0,0,0,0.4);
    &::before {
      display: table;
      content: ' ';
    }
    >.content-wrap {
      height: REM(128);
      width: REM(592);
      margin: REM(48) 0 REM(36) REM(48);
    }
    .avatar {
      float: left;
      width: REM(128);
      height: REM(128);
      border-radius: 4px;
      >img {
        width: 100%;
      }
    }
    .header-right {
      float: left;
      height: REM(128);
      margin-left: REM(32);
      color: #fff;
    }
    .brand {
      display: inline-block;
      font-size: 12px;
      padding: 2px;
      background: #FF4500;
    }
    .shop-title {
      font-size: 16px;
      >span {
        vertical-align: middle;
      }
    }
    .supports {
      margin: REM(6) 0;
      font-size: 16px;
      @include prefixer(transform, webkit moz, scale3d(0.625, 0.625, 0.625));
      @include prefixer(transform-origin, webkit moz, 0 0 0);
      &>p, &>button {
        float: left;
      }

      >button {
        position: relative;
        left: REM(180);
        bottom: REM(12);
        padding: REM(18);
        border-radius: REM(40);
        font-size: 18px;
        background: rgba(0,0,0,0.4);
      }
    }
    .bulletin-wrap {
      //height: REM(54);
      line-height: REM(54);
      white-space: nowrap;
      background: rgba(0,0,0,0.6);
      //font-size: 0;
      >span {
        display: inline-block;
        font-size: 12px;
        //line-height: 1;
        vertical-align: middle;
        &:first-child {
          margin: 0 REM(10);
          padding: REM(4);
          line-height: 1;
          color: #151515;
          background: #fff;
        }
        &:nth-child(2) {
          width: REM(520);
          color: #f5f5f5;
          //white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &:last-child {
          color: #f5f5f5;
        }
      }
    }
  }
  .bulletin-detail {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    color: #fff;
    overflow: auto;
    background: rgba(7,17,27,0.8);
    transition: all 0.5s ease;
    backdrop-filter: blur(30px);
    &.fade-enter-active, &.fade-leave {
      opacity: 1;
    }
    &.fade-enter, &.fade-leave-active {
      opacity: 0;
    }
    .detail-wrap {
      min-height: 100%;
      .detail-main {
        padding-top: REM(128);
        padding-bottom: REM(128);
        h1 {
          text-align: center;
          font-size: 16px;
          font-weight: bold;
        }
        .detail-star {
          margin: REM(16) 0;
          text-align: center;
        }
        .title-discount, .title-bulletin {
          display: flex;
          width: 80%;
          margin: auto;
          font-size: 16px;
          text-align: center;
          .line {
            flex: 1;
            height: 1px;
            margin-top: 11px;
            background: rgba(200,200,200,0.3);
          }
          .name {
            flex: 1;
          }
        }
        .discount-content {
          width: 80%;
          margin: REM(18) auto;
          font-size: 14px;
          line-height: 28px;
        }
      }
      .bulletin-content {
        width: 80%;
        margin: REM(16) auto;
        font-size: 14px;
      }
    }
    .detail-close {
      position: relative;
      width: REM(64);
      height: REM(64);
      margin: REM(-128) auto 0;
      font-size: REM(64);
      line-height: 1;
      clear: both;
    }
  }
  .supports, .discount-content {
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
</style>
