<template>
  <div class="allPage">
    <div class="loding" :class="isShowBreak ? 'showBreaking' : 'bkc'" v-if="!isCloseText">
      <div class="hello">MuYuCat's Blog</div>
      <div class="click" @click="brokePage()">
        <div class="text-magic" @mouseenter="magicShow">
          <div class="text-magic-before" v-show="isShowMagic">click here</div>
          click here
          <div class="text-magic-after" v-show="isShowMagic">click here</div>
          <div class="text-jump" v-show="isShowMagic"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['closePage'],
  data() {
    return {
      isShowMagic: false, // 是否展示字体抖音效果
      isShowBreak: false, // 是否展示页面过渡效果
      isCloseText: false // 是否提前去除字体
    }
  },
  created() {
    setTimeout(() => {
      this.magicShow()
    }, 5000)
  },
  methods: {
    magicShow() {
      if (!this.isShowMagic) {
        this.isShowMagic = true
        // console.log('magic time!')
      }
    },
    closeText() {
      setTimeout(() => {
        this.isCloseText = true
      }, 200)
    },
    closePage() {
      setTimeout(() => {
        this.$router.push('/blog')
      }, 1000)
    },
    brokePage() {
      this.isShowBreak = true
      // console.log('brokePage')
      // 先关闭字体
      this.closeText()
      // 再关闭页面
      this.closePage()
    }
  }
})
</script>

<style scoped lang="scss">
.allPage {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  .loding {
    width: 100%;
    height: 100%;
    filter: contrast(20);
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: space-around;
    justify-content: space-evenly;
    align-items: center;
    .hello {
      filter: contrast(20);
      font-family: Righteous;
      color: white;
      font-size: 4rem;
      line-height: 1;
      text-transform: uppercase;
      letter-spacing: 10px;
      animation: letterspacing 2s 1 ease-in-out;
      transition: 0.2s;
      &:hover {
        text-shadow: 0 0 2px #0ebeff, 0 0 5px #0ebeff, 0 0 13px #0ebeff;
        cursor: pointer;
      }
    }
    .click {
      font-size: 3rem;
      color: whitesmoke;
      animation: scale 4s 1 ease-in-out;
      &:hover {
        cursor: pointer;
      }
      .text-magic {
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translate(-50%, -50%);
        .text-magic-before {
          position: absolute;
          top: 0;
          left: -1px;
          height: 0px;
          color: rgba(255, 255, 255, 0.9);
          overflow: hidden;
          z-index: 2;
          animation: redShadow 1s ease-in infinite;
          filter: contrast(200%);
          text-shadow: 1px 0 0 red;
        }
        .text-magic-after {
          position: absolute;
          top: 0;
          left: -3px;
          height: 36px;
          color: rgba(255, 255, 255, 0.8);
          overflow: hidden;
          z-index: 3;
          animation: redHeight 1.5s ease-out infinite;
          filter: contrast(200%);
          text-shadow: -1px 0 0 cyan;
          mix-blend-mode: darken;
        }
        .text-jump {
          position: absolute;
          left: -10px;
          width: 100%;
          height: 5px;
          z-index: 4;
          background-color: rgb(0, 0, 0, 0.9);
          animation: whiteMove 5s ease-out infinite;
        }
      }
    }
  }
  .bkc {
    background-color: rgb(0, 0, 0, 1);
  }
  .showBreaking {
    animation: pageBreaking 0.5s 1 ease-in-out;
  }
}
@keyframes letterspacing {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0.3;
    letter-spacing: -2.2rem;
    filter: blur(0.3rem);
  }
  50% {
    opacity: 0.9;
    filter: blur(0.5rem);
  }
  100% {
    opacity: 1;
    letter-spacing: 10px;
    filter: blur(0rem);
  }
}
@keyframes scale {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 0.3;
  }
  60% {
    opacity: 0.6;
  }
  100% {
    opacity: 0.9;
  }
}
@keyframes redShadow {
  20% {
    height: 2.8rem;
  }
  60% {
    height: 0.8rem;
  }
  100% {
    height: 3.4rem;
  }
}
@keyframes redHeight {
  20% {
    height: 3.5rem;
  }
  35% {
    height: 1.2rem;
  }
  50% {
    height: 3rem;
  }
  60% {
    height: 0.5rem;
  }
  70% {
    height: 1rem;
  }
  80% {
    height: 2.8rem;
  }
  100% {
    height: 0rem;
  }
}
@keyframes whiteMove {
  8% {
    top: 3rem;
  }
  14% {
    top: 1.3rem;
  }
  20% {
    top: 4.2rem;
  }
  32% {
    top: 1.2rem;
  }
  99% {
    top: 2.3rem;
  }
}
@keyframes pageBreaking {
  0% {
    background-color: rgb(0, 0, 0, 1);
  }
  30% {
    background-color: rgb(0, 0, 0, 0.9);
  }
  60% {
    background-color: rgb(0, 0, 0, 0.6);
  }
  100% {
    background-color: rgb(0, 0, 0, 0);
  }
}
</style>
