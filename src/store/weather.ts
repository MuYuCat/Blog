import { defineStore } from 'pinia';
// import getMapLocation from './map';

// const mapLocation = getMapLocation();
const useWeatherStore = defineStore({
  id: 'weather', // id必填，且需要唯一
  state: () => {
    return {
      id: 'HE2204270942091786', // 和风天气Id
      key: 'c263d73bb5064ba4a9c111636c286176', // 和风天气Key
      // 实时天气
      devWeather: {
        obsTime: '', // 数据观测时间
        temp: '', // 温度，默认单位：摄氏度
        feelsLike: '', // 体感温度，默认单位：摄氏度
        icon: '', // 天气状况和图标的代码，图标可通过天气状况和图标下载
        text: '', // 天气状况的文字描述，包括阴晴雨雪等天气状态的描述
        wind360: '', // 风向360角度
        windDir: '', // 风向
        windScale: '', // 风力等级
        windSpeed: '', // 风速，公里/小时
        humidity: '', // 相对湿度，百分比数值
        precip: '', // 当前小时累计降水量，默认单位：毫米
        pressure: '', // 大气压强，默认单位：百帕
        vis: '', // 能见度，默认单位：公里
        cloud: '', // 云量，百分比数值。可能为空
        dew: '', // 露点温度。可能为空
        referSources: '', // 原始数据来源，或数据源说明，可能为空
        referLicense: '', // 数据许可或版权声明，可能为空
        updateTime: '', // 当前API的最近更新时间
        fxLink: '' // 当前数据的响应式页面，便于嵌入网站或应用
      },
      districtLink: {}, // 市区对应天气链接
      allDistrictLink: {} // 所有市区对应天气链接
    };
  },
  actions: {
    getCityAllInfo(info: any) {
      this.allDistrictLink = info;
    },
    getThisCityInfo(info: any) {
      this.districtLink = info;
    },
    getdevWeatherData(info: any) {
      this.devWeather = info;
    },
    getNowFxLink(info: any) {
      this.devWeather.fxLink = info;
    },
    getNowReferSources(info: any) {
      this.devWeather.referSources = info;
    },
    getNowReferLicense(info: any) {
      this.devWeather.referLicense = info;
    },
    getNowUpdateTime(info: any) {
      this.devWeather.updateTime = info;
    }
  },
  getters: {},
  // 开启数据缓存
  persist: {
    enabled: true
  }
});

export default useWeatherStore;
