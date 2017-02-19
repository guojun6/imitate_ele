import Vue from 'vue';
import VueRouter from 'vue-router';
import Goods from '../components/goods/goods';
import Seller from '../components/seller/seller';
import Ratings from '../components/ratings/ratings';
Vue.use(VueRouter);

var routes = [
  {path: '/seller', component: Seller},
  {path: '/goods', component: Goods},
  {path: '/ratings', component: Ratings}
];
var router = new VueRouter({
  routes
});

export default router;
