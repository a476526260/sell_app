import Vue from 'vue';
import Router from 'vue-router';
import goods from '../components/goods/goods';
import seller from '../components/seller/seller';
import ratings from '../components/ratings/ratings';

Vue.use(Router);

const routers = [
  {
    path: '/',
    redirect: '/goods'
  },
  {
    path: '/goods',
    components: goods
  },
  {
    path: '/ratings',
    components: ratings
  },
  {
    path: '/seller',
    components: seller
  }
];

export default new Router({
  routers
});
