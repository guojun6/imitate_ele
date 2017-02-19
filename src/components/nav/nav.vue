<template>
  <div id="router">
    <nav class="nav">
      <div class="nav-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import Goods from '../goods/goods';
import Seller from '../seller/seller';
import Ratings from '../ratings/ratings';

Vue.use(VueRouter);
var routes = [
  {path: '/seller', component: Seller},
  {path: '/goods', component: Goods},
  {path: '/ratings', component: Ratings}
];
var router = new VueRouter({
  routes
});

export default {

};
</script>

<style lang="scss">
@function REM($n){
    @return ($n/24)*1rem;
}
#app {
  .nav {
    display: flex;
    width: 100%;
    height: REM(80);
    line-height: REM(80);
    .nav-item {
      flex: 1;
      text-align: center;
    }
  }
}
</style>
