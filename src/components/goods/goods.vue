<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{'current':currentIndex===index}"
            @click="selectMenu(index,$event)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="food-list food-list-hook" ref="foodList">
          <h2 class="title">{{item.name}}</h2>
          <ul>
            <li @click="selectFood(food,$event)" v-for="(food,index) in item.foods" :key="index" class="food-item">
              <div class="icon">
                <img :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old"
                                                                v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="carControl-wrapper">
                  <cartControl :food="food" v-on:add="addFood"></cartControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopCart ref="shopcart" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"
              :selectFoods="selectFoods"></shopCart>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import BScroll from 'better-scroll';
  import shopCart from '../shopcart/shopcart';
  import cartControl from '../cartControl/cartControl';
  import food from '../food/food';

  const ERR_OK = 0;
  export default {
    name: 'goods',
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach(function (good) {
          good.foods.forEach(function (food) {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created() {
      let _this = this;
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      axios.get('/api/goods').then(function (response) {
        if (response.data.errno === ERR_OK) {
          _this.goods = response.data.data;
          _this.$nextTick(function () {
            _this._initScroll();
            _this._calculateHeight();
          });
        }
      }).catch(function (response) {
        console.log(response);
      });
    },
    methods: {
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      },
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodList;
        let foodItem = foodList[index];
        this.foodsScroll.scrollToElement(foodItem, 300);
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menu, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foods, {
          click: true,
          probeType: 3
        });
        this.foodsScroll.on('scroll', (pos) => {
          if (pos.y) {
            this.scrollY = Math.abs(Math.round(pos.y));
          }
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodList;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      addFood(target) {
        this._drop(target);
      },
      _drop(target) {
        // 效果优化，异步执行
        this.$nextTick(function () {
          this.$refs.shopcart.drop(target);
        });
      }
    },
    components: {
      shopCart,
      cartControl,
      food
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        padding 0 12px
        line-height 14px
        &.current
          position relative
          margin-top: -1px
          z-index 10
          background #fff
          font-weight 700
          .text
            border-1px-none()
        .icon
          display inline-block
          vertical-align top
          width 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          font-size 12px
          display table-cell
          vertical-align middle
          width 56px
          border-1px-bottom(rgba(7, 17, 27, .1))
    .foods-wrapper
      flex 1
      .title
        padding-left: 14px
        height: 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px-bottom(rgba(7, 17, 27, .1))
        &:last-child
          margin-bottom 0
          border-1px-none()
        .icon
          flex 0 0 57px
          width 57px
          height 57px
          margin-right: 10px
          img
            width 100%
            height: 100%
        .content
          flex: 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)
          .desc
            margin-bottom 8px
            line-height 12px
          .extra
            .count
              margin-right 12px
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
          .carControl-wrapper
            position absolute
            right 0
            bottom 12px
</style>
