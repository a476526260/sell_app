<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide"><i class="icon-arrow_lift"></i></div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
        </div>
        <div class="cartcontrol-wrapper">
          <cartControl :food="food"  v-on:add="addFood"></cartControl>
        </div>
        <transition name="fade">
          <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count||food.count===0">加入购物车</div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import cartControl from '../cartControl/cartControl';

  export default {
    name: 'food',
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false
      };
    },
    methods: {
      show() {
        this.showFlag = true;
        this.$nextTick(function () {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(event) {
        console.log('dadad');
        if (!event._constructed) {
          return;
        }
        this.$emit('add', event.target);
        Vue.set(this.food, 'count', 1);
      },
      addFood(target) {
        this.$emit('add', target);
      }
    },
    components: {
      cartControl
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed
    left 0
    top 0
    bottom 40px
    z-index 30
    width 100%
    background #fff
    transform translate3d(0, 0, 0)
    &.move-enter, &.move-leave-to
      transform translate3d(100%, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition all 0.5s
    .image-header
      position: relative
      width 100%
      height 0
      padding-bottom 100%
      img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .back
        position absolute
        left 0
        top 10px
        .icon-arrow_lift
          display block
          padding 10px
          font-size 20px
          color #fff
    .content
      padding 18px
      .title
        line-height 14px
        margin-bottom 8px
        font-size 14px
        font-weight 700
        color rgb(7, 17, 27)
      .detail
        margin-bottom 18px
        line-height 10px
        font-size 0
        height 10px
        .sell-count, .rating
          font-size 10px
          color rgb(147, 153, 159)
        .sell-count
          padding-right 12px
      .price
        font-weight 700
        line-height 24px
        .now
          margin-right 8px
          font-size 14px
          color rgb(240, 20, 20)
        .old
          text-decoration line-through
          font-size 10px
          color rgb(147, 153, 159)
    .cartcontrol-wrapper
      position absolute
      right 12px
      bottom 12px
    .buy
      position absolute
      right 18px
      bottom 18px
      z-index 10
      height 24px
      line-height 24px
      padding 0 12px
      box-sizing border-box
      border-radius 12px
      font-size 10px
      color #fff
      background rgb(0, 160, 220)
      opacity: 1
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.2s
      &.fade-enter, &.fade-leave-active
        opacity: 0
        z-index: -1
</style>
