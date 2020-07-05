<template>
<scroll :data="discList" class="app" ref="scroll">
  <div>
    <div class="swiper-container">
      <swiper ref="mySwiper" :options="swiperOptions" class="swiper-wrapper">
        <swiper-slide class="swiper-slide" v-for="(item,index) in banner" :key="index">
          <a :href="item.linkUrl">
            <img v-on:load="imgOnload" v-bind:src="item.picUrl" alt />
          </a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!-- 推荐歌单 -->
    <div class="gedanTitle">热门歌单推荐</div>
    <ul v-if="discList.length" class="discList-ul" ref="discListUl">
      <li
        @click="selectItem(item)"
        class="discList-li"
        v-for="(item,index) in discList"
        :key="index"
      >
        <img alt="歌单" :title="item.creator.name" v-lazy="item.imgurl" />
        <div class="discList-con">
          <h2>{{item.creator.name}}</h2>
          <p>{{item.dissname}}</p>
        </div>
      </li>
    </ul>
    <div class="loading" v-if="!discList.length">
      <loading></loading>
    </div>
  </div>
  </Scroll>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import Scroll from '@/common/scroll'
import Loading from '@/common/loading'
import { getRecommend, getDiscList } from '@/api/recommend'
import { ERR_OK } from '@/api/config'

export default {
  name: 'Recommend',
  data () {
    return {
      banner: [],
      discList: [],
      swiperOptions: {
        loop: true,
        auto: true,
        pagination: {
          el: '.swiper-pagination'
        }
        // Some Swiper option/callback...
      }
    }
  },
  created () {
    this.getRecommend()
    this.getDiscList()
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    },
    isShowSwiper () {
      return Boolean(this.banner.length)
    }
  },
  mounted () {
    this.swiper.slideTo(0, 1000, false)
  },
  components: {
    Swiper,
    SwiperSlide,
    Scroll,
    Loading
  },
  methods: {
    getRecommend () {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.banner = res.data.slider
        }
      })
    },
    getDiscList () {
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        }
      })
    },
    imgOnload () {},
    selectItem () {}
  }
}
</script>
<style scoped lang="scss">
@import "@/assets/css/mixin.scss";
.app {
  width: 100vw;
  height: 86vh;
  overflow: hidden;
}
.swiper-container {
  width: 100%;
  height: rem(150);
  background: #fff;
}
.swiper-container img {
  width: 100%;
  height: rem(150);
}
.gedanTitle {
  width: 100%;
  height: rem(65);
  text-align: center;
  line-height: rem(65);
  color: #ffcd32;
  font-size: rem(15);
  letter-spacing: rem(2);
}
.discList-ul {
  width: 100%;
  // padding-bottom: rem(30);
}
.discList-li {
  width: 100%;
  min-height: rem(80);
  box-sizing: border-box;
  padding: 0 rem(20) rem(20) rem(20);
  position: relative;
}
.discList-li img {
  width: rem(60);
  height: rem(60);
  left: rem(20);
  position: absolute;
}
.discList-con {
  padding-left: rem(80);
}
.discList-con h2 {
  margin-bottom: rem(10);
  font-size: rem(15);
  padding-top: rem(6);
}
.discList-con p {
  color: hsla(0, 0%, 100%, 0.3);
  font-size: rem(14);
}
.loading {
  position: fixed;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  // z-index: 200;
}
/* 子路由进去动画 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
