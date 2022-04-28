import { defineStore } from 'pinia';

const useMapStore = defineStore({
  id: 'map', // id必填，且需要唯一
  state: () => {
    return {
      ak: 'tyC5uQTxrREcpdHlv6X0Hx8koSU8RSKB', // 百度api访问应用（AK）
      coor: 'bd09ll', // 百度地图解码方式
      cip: '', // ip地址
      province: '', // 所在省份
      city: '', // 所在城市名称
      cityLocationId: '', // 所在城市的百度Id
      district: '', // 所在城市市区
      locationId: '', // 所在市区的百度Id
      allDistrict: {}, // 所在城市所有市区
      adcode: '', // 所在城市行政编码
      city_code: '', // 所在城市百度代码
      pointX: '', // 当前城市中心点经度
      pointY: '' // 当前城市中心点纬度
    };
  },
  actions: {
    updateCip(value: string) {
      this.cip = value;
    },
    updateProvince(value: string) {
      this.province = value;
    },
    updateCity(value: string) {
      this.city = value;
    },
    updateAdcode(value: string) {
      this.adcode = value;
    },
    updateCityCode(value: string) {
      this.city_code = value;
    },
    updatePointX(value: string) {
      this.pointX = value;
    },
    updatePointY(value: string) {
      this.pointY = value;
    },
    updateDistrict(value: string) {
      this.district = value;
    },
    updateCityLocationId(value: string) {
      this.cityLocationId = value;
    },
    updateLocationId(value: string) {
      this.locationId = value;
    },
    updateAllDistrict(value: string) {
      this.allDistrict = value;
    }
  },
  // 开启数据缓存
  persist: {
    enabled: true
  }
});

export default useMapStore;
