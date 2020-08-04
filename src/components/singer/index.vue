<template>
  <div class="app">
    <Scroll
      v-if="singers.length"
      :data="singers"
      class="scroll"
      ref="scrollView"
      :probeType="probeType"
      :listenScroll="listenScroll"
      @scroll="scroll"
    >
      <ul ref="singerUl">
        <li class="li-box" v-for="(item1, index) in singers" :key="index" ref="listView">
          <h2 class="title">{{index}}</h2>
          <ul>
            <li
              @click="toSingerDetail(item2)"
              class="li-con"
              v-for="(item2, index) in item1"
              :key="index"
            >
              <img
                v-lazy="`https://y.gtimg.cn/music/photo_new/T001R300x300M000${
                  item2.Fsinger_mid
                }.jpg?max_age=2592000`"
                alt
              />
              <span class="name">{{item2.Fother_name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <h2
        id="fixed"
        class="title"
        :style="{transform:`translateY(${tittransform}px)`}"
        v-show="fixshow"
      >{{activeIndex}}</h2>
    </Scroll>
    <div class="tab-right">
      <ul ref="indexViewList">
        <li
          :data-index="index"
          v-for="(item, index) in singers"
          :key="index"
          :class="{curren:index===activeIndex}"
          @touchstart.stop.prevent="toTouchScroll(index)"
          @touchmove.stop.prevent="(e)=>toTouchMove(e,index)"
        >{{ litter[index]}}</li>
      </ul>
    </div>
    <!-- 歌手详情子路由 -->
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <!-- loading -->
    <div class="loading" v-show="singers.length === 0?1:0">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import { getSingerList } from '@/api/singer'
import { mapMutations } from 'vuex'
import Scroll from '@/common/scroll'
import Loading from '@/common/loading'
export default {
  components: {
    Scroll,
    Loading
  },
  data () {
    return {
      singers: [],
      litter: 'ABCDEFGHIKLMNOPQRSTUVWXYZ',
      scrollY: -1,
      activeIndex: 0,
      fixshow: false,
      tittransform: 0
    }
  },
  created () {
    this.getSingerList()
    this.listenScroll = true
    this.probeType = 3
    this.hightY = []
  },
  methods: {
    getSingerList () {
      getSingerList().then(res => {
        this.singers = res
      })
    },
    toTouchScroll (index) {
      this.hoverindex = this.litter[index]
      this.$refs.scrollView.scrollToElement(this.$refs.listView[index], 0)
    },
    toTouchMove (e, index) {
      const hoverEl = document.elementFromPoint(
        e.touches[0].pageX,
        e.touches[0].pageY
      )
      if (
        this.$refs.indexViewList.contains(hoverEl) &&
        this.litter[hoverEl.dataset.index] !== this.hoverindex
      ) {
        this.$refs.scrollView.scrollToElement(
          this.$refs.listView[hoverEl.dataset.index],
          0
        )
      }
    },
    initHeight () {
      this.hightY[0] = 0
      let h = 0;
      [].slice.call(this.$refs.listView).forEach(item => {
        this.hightY.push((h += item.offsetHeight))
      })
    },
    scroll (pos) {
      for (let i = 0; i < this.hightY.length - 1; i++) {
        if (
          pos.y <= 0 &&
          Math.abs(pos.y) >= this.hightY[i] &&
          Math.abs(pos.y) < this.hightY[i + 1]
        ) {
          if (this.hightY[i + 1] - Math.abs(pos.y) <= 12) {
            this.tittransform = this.hightY[i + 1] - Math.abs(pos.y) - 12
          } else {
            this.tittransform = 0
          }
          this.activeIndex = i
          this.fixshow = true
          return
        }
      }
      this.fixshow = false
    },
    toSingerDetail (item) {
      this.$router.push(`/singer/${item.Fsinger_mid}`)
      console.log(item)
      this.setSinger(item)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  computed: {},
  watch: {
    singers () {
      this.$nextTick(() => {
        this.initHeight()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.scroll {
  position: relative;
  width: 100vw;
  height: 87vh;
  overflow: hidden;
}
.app {
  position: relative;
  // display: block;
  // width: 100%;
  // height: 100%;
  // overflow: hidden;
}
.li-box {
  width: 100%;
  padding-bottom: rem(30);
}
.title {
  width: 100%;
  height: rem(30);
  padding-left: rem(20);
  box-sizing: border-box;
  color: hsla(0, 0%, 100%, 0.5);
  background: #333;
  font-size: rem(12);
  line-height: rem(30);
}
.li-con {
  width: 100%;
  height: rem(70);
  padding: rem(20) 0 0 rem(30);
  box-sizing: border-box;
}
img {
  width: rem(50);
  height: rem(50);
  line-height: rem(50);
  border-radius: rem(50);
  vertical-align: middle;
}
.name {
  display: inline-block;
  font-size: rem(14);
  margin-left: rem(20);
  vertical-align: middle;
}
/* 侧面导航字母 */
.tab-right {
  position: absolute;
  z-index: 300;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: rem(20);
  padding: rem(20) 0;
  border-radius: rem(10);
  background: rgba(0, 0, 0, 0.3);
  font-family: Helvetica;
}
.tab-right li {
  padding-bottom: rem(6);
  line-height: 1;
  text-align: center;
  color: hsla(0, 0%, 100%, 0.5);
  font-size: rem(12);
}
#fixed {
  position: absolute;
  top: rem(-1);
  left: 0;
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
.loading {
  position: fixed;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
.curren {
  color: red !important;
}
</style>
