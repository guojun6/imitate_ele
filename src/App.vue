<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div id="router">
      <nav class="nav border1px">
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
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import header from './components/header/header';
import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

export default {
  data () {
    return {
      seller: {}
    };
  },
  components: {
    'v-header': header
  },
  created () {
    this.$http.get('/api/seller').then((response) => {
      response.json().then((res) => {
        this.seller = res.data;
      });
    });
  }
};
</script>

<style lang="scss">
@import "./common/style/function";
@import "./common/style/base";
#app {
  .nav {
    position: relative;
    display: flex;
    width: 100%;
    height: REM(80);
    line-height: REM(80);
    .nav-item {
      flex: 1;
      text-align: center;
      >a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &.router-link-active {
          color: rgb(240, 20, 20);
        }
      }
    }

    &:after {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      border-top: 1px solid rgba(7, 17, 27, 0.1);
      content: ' ';
    }
  }
}
</style>
