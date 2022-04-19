<template>
  <div>
    <v-clickPage></v-clickPage>
    <v-header></v-header>
    <div class="container">
      <div class="container-wapper">
        <div class="one">{{ resultString }}</div>
        <div class="two">two</div>
        <div class="three">three</div>
        <div class="four">four</div>
        <div class="five">five</div>
        <div class="six">six</div>
        <div class="seven">seven</div>
      </div>
    </div>
    <!-- <div class="lightLeft l_0" @click="turnLeft">
      <div class="sideLeft l_01">
        <img rel="icon" src="../../assets/images/showMore.png" class="incoShowMore l_10" />
      </div>
    </div>
    <div class="lightRight r_0" @click="turnLeft">
      <div class="sideRight r_01">
        <img rel="icon" src="../../assets/images/manager.png" class="incoManager r_10" />
      </div>
    </div> -->
  </div>
</template>

<script>
import header from '@/components/header.vue';
import clickPage from './components/clickPage.vue';
import { findAll } from '../../api/home';

export default {
  name: 'BlogHome',
  components: {
    'v-header': header,
    'v-clickPage': clickPage
  },
  data() {
    return {
      resultString: ''
    };
  },
  created() {
    this.showFindAll();
  },
  methods: {
    turnLeft() {
      // console.log('turn leftPage')
    },
    async showFindAll() {
      const res = await findAll();
      console.log(res);
      this.resultString = res;
    }
  }
};
</script>

<style scoped lang="scss">
.container-wapper {
  // height: 100%;
  // width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
  grid-gap: 20px;
  grid-auto-rows: minmax(90px, auto);
  grid-auto-flow: row;
  .one {
    grid-column-start: span 10;
    grid-row-start: span 4;
    background: #19caad;
  }
  .two {
    grid-column-start: span 6;
    grid-row-start: span 2;
    background: #8cc7b5;
  }
  .three {
    grid-column-start: span 6;
    grid-row-start: span 2;
    background: #d1ba74;
  }
  .four {
    grid-column-start: span 12;
    grid-row-start: span 16;
    background: #bee7e9;
  }
  .five {
    grid-column-start: span 4;
    grid-row-start: span 2;
    background: #e6ceac;
  }
  .six {
    grid-column-start: span 4;
    grid-row-start: span 4;
    background: #ecad9e;
  }
  .seven {
    grid-column-start: span 4;
    grid-row-start: span 4;
    background: skyblue;
  }
}
.lightLeft,
.lightRight {
  position: fixed;
  top: 56px;
  width: 0.1%;
  height: 100%;
  .sideLeft,
  .sideRight {
    height: 120px;
    width: 60px;
    border-radius: 0 120px 120px 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    .incoShowMore,
    .incoManager {
      width: 30px;
      height: 30px;
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
.lightLeft:hover,
.lightRight:hover {
  background-color: #4cc9f0;
  box-shadow: 10px 10px 99px 6px rgba(76, 201, 240, 1);
  .sideLeft,
  .sideRight {
    background-color: #4cc9f0;
    box-shadow: 10px 10px 99px 6px rgba(76, 201, 240, 1);
  }
  .incoShowMore,
  .incoManager {
    width: 40px;
    height: 40px;
  }
}
.l_0 {
  left: 0px;
}
.r_0 {
  right: 0px;
}
.l_01 {
  left: 0.1%;
}
.r_01 {
  right: 0.1%;
}
.l_10 {
  left: 10%;
}
.r_10 {
  right: 10%;
}
</style>
