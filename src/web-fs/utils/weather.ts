import useWeatherStore from '../../store/weather';
import useMapStore from '../../store/map';
import {
  getWeatherCityInfo,
  getNowWeather,
  get7DaysWeather,
  get24HWeather,
  getIndicesWeather,
  getWarning,
  getWarningList,
  getAir,
  getAstronomySun,
  getAstronomyMoon
} from '../../api/weather';

const weatherStore = useWeatherStore();
const mapStore = useMapStore();

// 地理-获取城市所有市区信息
const getAllDistrictInfo = async () => {
  await getWeatherCityInfo('all').then((res: any) => {
    if (res && `${res.code}` === '200') {
      const allDistrict = <any>[];
      const allDistrictLink = <any>[];
      res?.location.map((item: any) => {
        allDistrict.push(item.name);
        const withLink = {
          district: item.name,
          locationId: item.id,
          link: item.fxLink
        };
        allDistrictLink.push(withLink);
        return '';
      });
      allDistrict.splice(0, 1);
      mapStore.updateCityLocationId(res.location[0].id);
      mapStore.updateAllDistrict(allDistrict);
      weatherStore.getCityAllInfo(allDistrictLink);
    }
  });
};
// 地理-获取当前市区信息
const getThisDistrictInfo = async () => {
  await getWeatherCityInfo('only').then((res: any) => {
    if (res && `${res.code}` === '200') {
      mapStore.updateDistrict(res?.location[0].name);
      mapStore.updateLocationId(res?.location[0].id);
      const districtLink = {
        district: res?.location[0].name,
        link: res?.location[0].fxLink
      };
      weatherStore.getThisCityInfo(districtLink);
    }
  });
};
// 天气-实时天气
const getNowWeatherInfo = async () => {
  await getNowWeather().then((res: any) => {
    if (res && `${res.code}` === '200') {
      weatherStore.getNowFxLink(res.fxLink);
      weatherStore.getNowReferSources(res.refer.sources);
      weatherStore.getNowReferLicense(res.refer.license);
      weatherStore.getNowUpdateTime(res.updateTime);
      weatherStore.getDevWeatherData(res.now);
    }
  });
};
// 天气-7天预报天气
const get7DaysWeatherInfo = async () => {
  await get7DaysWeather().then((res: any) => {
    if (res && `${res.code}` === '200') {
      console.log('7DaysWeather', res);
    }
  });
};
// 天气-24H预报天气
const get24HWeatherInfo = async () => {
  await get24HWeather().then((res: any) => {
    if (res && `${res.code}` === '200') {
      console.log('24HWeather', res);
    }
  });
};
// 天气-生活指数
const getIndicesWeatherInfo = async () => {
  await getIndicesWeather().then((res: any) => {
    if (res && `${res.code}` === '200') {
      console.log('indices', res);
    }
  });
};
// 天气-灾害预警
const getWarningInfo = async () => {
  await getWarning().then((res: any) => {
    if (res && `${res.code}` === '200') {
      console.log('warning', res);
    }
  });
};
// 天气-灾害预警城市
const getWarningListInfo = async () => {
  await getWarningList().then((res: any) => {
    if (res && `${res.code}` === '200') {
      console.log('warningList', res);
    }
  });
};
// 天气-实时空气质量
const getAirInfo = async () => {
  await getAir().then((res: any) => {
    if (res && `${res.code}` === '200') {
      console.log('air', res);
    }
  });
};
// 天气-日出日落
const getAstronomySunInfo = async () => {
  await getAstronomySun().then((res: any) => {
    if (res && `${res.code}` === '200') {
      console.log('astronomy', res);
    }
  });
};
// 天气-月升月落和月相
const getAstronomyMoonInfo = async () => {
  await getAstronomyMoon().then((res: any) => {
    if (res && `${res.code}` === '200') {
      console.log('astronomyMoon', res);
    }
  });
};

const getWeatherInfo = async () => {
  await getAllDistrictInfo();
  await getThisDistrictInfo();
  await getNowWeatherInfo();
  await get7DaysWeatherInfo();
  await get24HWeatherInfo();
  await getIndicesWeatherInfo();
  await getWarningInfo();
  await getWarningListInfo();
  await getAirInfo();
  await getAstronomySunInfo();
  await getAstronomyMoonInfo();
};

export default getWeatherInfo;
