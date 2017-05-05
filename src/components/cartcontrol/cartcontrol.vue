<template>
  <section class="cartcontrol">
    <div v-show="food.count" class="reduce" @click="reduceAmount">-</div>
    <div v-show="food.count" class="food-amount">{{food.count}}</div>
    <div class="add" @click="addAmount">+</div>
  </section>
</template>

<script>
import Vue from 'vue';
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    reduceAmount (e) {
      e.stopPropagation();
      this.food.count--;
    },
    addAmount (e) {
      e.stopPropagation();
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
    }
  }
};
</script>

<style lang="scss">
.cartcontrol {
  font-size: 0;
  >div {
    display: inline-block;
    text-align: center;
    font-size: 16px;
    line-height: 18px;
  }
  .reduce {
    width: 18px;
    height: 18px;
    border: 2px solid #1515ee;
    color: #1515ee;
    border-radius: 10px;
  }
  .add {
    width: 18px;
    height: 18px;
    border: 2px solid #1515ee;
    background: #1515ee;
    color: #fff;
    border-radius: 10px;
  }
  .food-amount {
    min-width: 24px;
    padding: 0 10px;
    color: #252525;
    font-size: 12px;
    line-height: 22px;
  }
}
</style>
