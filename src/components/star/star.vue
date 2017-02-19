<template>
  <section class="star-wrap" :class="sizeClass">
    <span v-for="starClass of starClasses" class="star" :class="starClass"></span>
  </section>
</template>

<script>
const STAR_AMOUNT = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';
export default {
  props: {
    starSize: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    sizeClass () {
      return 'size-' + this.starSize;
    },
    starClasses () {
      let result = [];
      let starScore = Math.floor(this.score * 2) / 2;
      let integer = Math.floor(starScore);
      let half = starScore % 1 !== 0;
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      if (half) {
        result.push(CLS_HALF);
      }
      for (let i = result.length; i < STAR_AMOUNT; i++) {
        result.push(CLS_OFF);
      }

      return result;
    }
  }
};
</script>

<style lang="scss">
@import "../../common/style/function";
@import "../../common/style/common";
/*48 20 20 22
36 15 15 16
24 10 10 3*/
.star-wrap {
  display: inline-block;
  font-size: 0;
  .star {
    display: inline-block;
    background-repeat: no-repeat;
  }
  &.size-48 {
    .star {
      width: REM(40);
      height: REM(40);
      margin-right: REM(24);
      background-size: REM(40) REM(40);
      &.on {
        background-image: url(./images/star48_on@2x.png);
      }
      &.half {
        background-image: url(./images/star48_half@2x.png);
      }
      &.off {
        background-image: url(./images/star48_off@2x.png);
      }
    }
  }
  &.size-36 {
    .star {
      width: REM(30);
      height: REM(30);
      margin-right: REM(16);
      background-size: REM(30) REM(30);
      &.on {
        background-image: url(./images/star36_on@2x.png);
      }
      &.half {
        background-image: url(./images/star36_half@2x.png);
      }
      &.off {
        background-image: url(./images/star36_off@2x.png);
      }
    }
  }
  &.size-24 {
    .star {
      width: REM(20);
      height: REM(20);
      margin-right: REM(6);
      background-size: REM(20) REM(20);
      &.on {
        background-image: url(./images/star24_on@2x.png);
      }
      &.half {
        background-image: url(./images/star24_half@2x.png);
      }
      &.off {
        background-image: url(./images/star24_off@2x.png);
      }
    }
  }
  .star:last-child {
    margin-right: 0;
  }
}
</style>
