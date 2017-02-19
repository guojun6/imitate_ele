<template>
  <div v-if="ratings" class="assess">
    <div class="btns-assess-type">
      <div class="btn-all" :class="{active: ratingType === 'all'}" @click="changeToAll">全部<span>{{ratings.length}}</span></div>
      <div class="btn-good" :class="{active: ratingType === 'good'}" @click="changeToGood">{{goodTxt}}<span>{{getRateAmount().good}}</span></div>
      <div class="btn-bad" :class="{active: ratingType === 'bad'}" @click="changeToBad">{{badTxt}}<span>{{getRateAmount().bad}}</span></div>
    </div>
    <div class="tick" @click="onlySeeContent">
      <div class="icon" :class="{active: onlySee}">√</div>
      <div class="txt" :class="{active: onlySee}">只看有内容的评价</div>
    </div>
    <ul class="assess-list">
      <li v-for="(item, index) of ratings" v-if="showRatingMethod(item)">
        <div class="user-info">
          <p class="time">{{getTime(item.rateTime)}}</p>
          <p class="username">{{item.username}}</p>
          <p class="avatar">
            <img :src="item.avatar">
          </p>
        </div>
        <div class="assess-content">
          <div class="icon" :class="{good:item.rateType === 0, bad: item.rateType === 1}"></div>
          <div class="txt">{{item.text?item.text:'无'}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    goodTxt: {
      type: String
    },
    badTxt: {
      type: String
    },
    ratings: {
      type: Array
    }
  },
  data () {
    return {
      ratingType: 'all',
      onlySee: false
    };
  },
  created () {

  },
  methods: {
    getTime (num) {
      let time = new Date(num);
      let year = time.getFullYear();
      let month = time.getMonth();
      let date = time.getDate();
      let hour = time.getHours();
      let min = time.getMinutes();
      let second = time.getSeconds();
      let str = `${year}-${month}-${date} ${hour}:${min}:${second}`;
      return str;
    },
    getRateAmount () {
      let good = 0;
      let bad = 0;
      this.ratings.forEach((rating) => {
        if (rating.rateType === 0) {
          good++;
        } else if (rating.rateType === 1) {
          bad++;
        }
      });
      return {
        good,
        bad
      };
    },
    changeToAll () {
      this.ratingType = 'all';
    },
    changeToGood () {
      this.ratingType = 'good';
    },
    changeToBad () {
      this.ratingType = 'bad';
    },
    showRatingMethod (item) {
      if (this.ratingType === 'all') {
        return this.onlySee ? (item.rateType === 0 || item.rateType === 1) && item.text : (item.rateType === 0 || item.rateType === 1);
      } else if (this.ratingType === 'good') {
        return this.onlySee ? (item.rateType === 0) && item.text : (item.rateType === 0);
      } else {
        return this.onlySee ? (item.rateType === 1) && item.text : (item.rateType === 1);
      }
    },
    onlySeeContent () {
      this.onlySee = !this.onlySee;
    }
  }

};
</script>

<style lang="scss">
@import "../../common/style/function";
@import "../../common/style/common";
.assess {
  .btns-assess-type {
    >div {
      display: inline-block;
      width: 5em;
      line-height: 50px;
      background: #e6e6e6;
      font-size: 18px;
      border-radius: 4px;
      text-align: center;
      &.active {
        background: #1515ee;
        color: #f5f5f5;
      }
      span {
        padding-left: 5px;
        font-size: 12px;
        line-height: 52px;
      }
    }
  }
  .tick {
    margin: 10px 0;
    padding: 5px 0;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    font-size: 16px;
    .icon {
      display: inline-block;
      padding: 0.2em;
      width: 24px;
      border-radius: 1.5em;
      font-weight: bold;
      background: #cacaca;
      text-align: center;
      color: #fff;
      &.active {
        background: #1515ee;
      }
    }
    .txt {
      display: inline-block;
      line-height: 1.9;
      color: #aaa;
      &.active {
        color: #1515ee;
      }
    }
  }
  .assess-list {
    li {
      border-bottom: 1px solid rgba(7,17,27,0.1);
      margin-top: 6px;
      .user-info {
        display: flex;
        color: #777;
        p {
          display: inline-block;
          &.time {
            flex: 0 0 REM(400);
            width: REM(400);
          }
          &.username {
            flex: 1;
            text-align: right;
            padding-right: 8px;
          }
          &.avatar {
            flex: 0 0 REM(30);
            width: REM(30);
            >img {
              width: 100%;
            }
          }
        }
      }
      .assess-content {
        font-size: 16px;
        line-height: 22px;
        padding: 8px 0;
        >.icon {
          display: inline-block;
          width: 18px;
          height: 18px;
          background-position-x: center;
          background-position-y: center;
          background-repeat: no-repeat;
          background-size: 18px 18px;
          &.good {
            background-image: url(./images/good.png);
          }
          &.bad {
            background-image: url(./images/bad.png);
          }
        }
        .txt {
          display: inline-block;

        }
      }
    }
  }


}
</style>
