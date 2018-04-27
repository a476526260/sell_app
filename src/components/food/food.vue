<template>
  <transition name="move">
    <div class="food" v-show="showFlag">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
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
      }
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
    transform translate3d(0,0,0)
    &.move-enter,&.move-leave-to
      transform translate3d(100%,0,0)
    &.move-enter-active,&.move-leave-active
      transition all 0.5s
</style>
