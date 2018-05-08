<template>
  <div id="app">
    <headerComponent :seller="seller"></headerComponent>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import headerComponent from 'components/header/header';
  import axios from 'axios';

  const ERR_OK = 0;
  export default {
    data() {
      return {
        seller: {}
      };
    },
    created() {
      let _this = this;
      axios.get('/api/seller').then(function (response) {
        if (response.data.errno === ERR_OK) {
          _this.seller = response.data.data;
        }
      }).catch(function (response) {
        console.log(response);
      });
    },
    components: {
      headerComponent
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  .tab
    display flex
    width 100%
    height 40px
    line-height 40px
    border-1px-bottom(rgba(0, 0, 0, 1))
    .tab-item
      flex 1
      text-align center
      & > a
        display block
        font-size 14px
        color rgb(77, 85, 93)
        &.active
          color rgb(240, 20, 20)
</style>
