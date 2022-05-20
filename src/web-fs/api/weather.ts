import moment from 'moment';
import request from './request';
import useMapStore from '../../store/map';
import useWeatherStore from '../../store/weather';

const mapStore = useMapStore();
const weatherStore = useWeatherStore();

// * 天气-地理信息
/**
 * @param param location
 * 需要查询地区的名称，支持文字、以英文逗号分隔的经度,纬度坐标（十进制，最多支持小数点后两位）、LocationID或Adcode（仅限中国城市）
 * @param param key 和风天气用户认证key
 * @param param adm 城市的上级行政区划，默认不限定行政区划
 * @param param range 搜索范围，可设定只在某个国家范围内进行搜索
 * @param param number 返回结果的数量，取值范围1-20
 * @param param lang 多语言设置，默认中文
 * @returns
 */
const getWeatherCityInfo = (type?: string) => {
  const selectType = type || 'all';
  const params = {
    location: selectType === 'all' ? mapStore.city : `${mapStore.pointX},${mapStore.pointY}`,
    key: weatherStore.key,
    adm: mapStore.province,
    range: 'world',
    number: '20',
    lang: 'zh'
  };
  return request({
    url: '/weather/v2/city/lookup',
    method: 'get',
    params
  });
};

// * 天气-实时天气
/**
 * @param param location
 * 需要查询地区的名称，支持文字、以英文逗号分隔的经度,纬度坐标（十进制，最多支持小数点后两位）、LocationID或Adcode（仅限中国城市）
 * @param param key 和风天气用户认证key
 * @param param unit 度量衡单位参数选择，例如温度选摄氏度或华氏度、公里或英里
 * @param param lang 多语言设置，默认中文
 * @returns
 */
const getNowWeather = () => {
  const params = {
    location: mapStore.locationId,
    key: weatherStore.key,
    unit: 'm',
    lang: 'zh'
  };
  return request({
    url: '/devWeather/v7/weather/now',
    method: 'get',
    params
  });
};

// * 天气-7天预报天气
/**
 * @param param location
 * 需要查询地区的名称，支持文字、以英文逗号分隔的经度,纬度坐标（十进制，最多支持小数点后两位）、LocationID或Adcode（仅限中国城市）
 * @param param key 和风天气用户认证key
 * @param param unit 度量衡单位参数选择，例如温度选摄氏度或华氏度、公里或英里
 * @param param lang 多语言设置，默认中文
 * @returns
 */
const get7DaysWeather = () => {
  const params = {
    location: mapStore.locationId,
    key: weatherStore.key,
    unit: 'm',
    lang: 'zh'
  };
  return request({
    url: '/devWeather/v7/weather/7d',
    method: 'get',
    params
  });
};

// * 天气-24小时预报天气
/**
 * @param param location
 * 需要查询地区的名称，支持文字、以英文逗号分隔的经度,纬度坐标（十进制，最多支持小数点后两位）、LocationID或Adcode（仅限中国城市）
 * @param param key 和风天气用户认证key
 * @param param unit 度量衡单位参数选择，例如温度选摄氏度或华氏度、公里或英里
 * @param param lang 多语言设置，默认中文
 * @returns
 */
const get24HWeather = () => {
  const params = {
    location: mapStore.locationId,
    key: weatherStore.key,
    unit: 'm',
    lang: 'zh'
  };
  return request({
    url: '/devWeather/v7/weather/24h',
    method: 'get',
    params
  });
};

// * 天气-生活指数
/**
 * @param param location
 * 需要查询地区的名称，支持文字、以英文逗号分隔的经度,纬度坐标（十进制，最多支持小数点后两位）、LocationID或Adcode（仅限中国城市）
 * @param param key 和风天气用户认证key
 * @param param type
 * 生活指数的类型ID，包括洗车指数、穿衣指数、钓鱼指数等。可以一次性获取多个类型的生活指数，多个类型用英文,分割。例如type=3,5。具体生活指数的ID和等级参考天气指数信息。各项生活指数并非适用于所有城市。
 * @param param lang 多语言设置，默认中文
 * @returns
 */
const getIndicesWeather = () => {
  const params = {
    location: mapStore.locationId,
    key: weatherStore.key,
    type: '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16',
    lang: 'zh'
  };
  return request({
    url: '/devWeather/v7/indices/1d',
    method: 'get',
    params
  });
};

// * 天气-灾难预警
/**
 * @param param location
 * 需要查询地区的名称，支持文字、以英文逗号分隔的经度,纬度坐标（十进制，最多支持小数点后两位）、LocationID或Adcode（仅限中国城市）
 * @param param key 和风天气用户认证key
 * @param param lang 多语言设置，默认中文
 * @returns
 */
const getWarning = () => {
  const params = {
    location: mapStore.locationId,
    key: weatherStore.key,
    lang: 'zh'
  };
  return request({
    url: '/devWeather/v7/warning/now',
    method: 'get',
    params
  });
};

// * 天气-灾难预警城市列表
/**
 * @param param range 选择指定的国家或地区。
 * @param param key 和风天气用户认证key
 * @returns
 */
const getWarningList = () => {
  const params = {
    range: 'cn',
    key: weatherStore.key
  };
  return request({
    url: '/devWeather/v7/warning/list',
    method: 'get',
    params
  });
};

// * 天气-实时空气质量
/**
 * @param param location
 * 需要查询地区的名称，支持文字、以英文逗号分隔的经度,纬度坐标（十进制，最多支持小数点后两位）、LocationID或Adcode（仅限中国城市）
 * @param param key 和风天气用户认证key
 * @param param lang 多语言设置，默认中文
 * @returns
 */
const getAir = () => {
  const params = {
    location: mapStore.locationId, // 切换成城市id会有监测点信息
    key: weatherStore.key,
    lang: 'zh'
  };
  return request({
    url: '/devWeather/v7/air/now',
    method: 'get',
    params
  });
};

// * 天气-日出日落
/**
 * @param param location
 * 需要查询地区的名称，支持文字、以英文逗号分隔的经度,纬度坐标（十进制，最多支持小数点后两位）、LocationID或Adcode（仅限中国城市）
 * @param param key 和风天气用户认证key
 * @param param date 选择日期，最多可选择未来60天（包含今天）的数据。日期格式为yyyyMMdd; 只能获得当天的数据
 * @param param lang 多语言设置，默认中文
 * @returns
 */
const getAstronomySun = () => {
  const params = {
    location: mapStore.locationId,
    date: moment(new Date()).add(60, 'days').format('YYYYMMDD'),
    key: weatherStore.key,
    lang: 'zh'
  };
  return request({
    url: '/devWeather/v7/astronomy/sun',
    method: 'get',
    params
  });
};

// * 天气-月升月落和月相
/**
 * @param param location
 * 需要查询地区的名称，支持文字、以英文逗号分隔的经度,纬度坐标（十进制，最多支持小数点后两位）、LocationID或Adcode（仅限中国城市）
 * @param param key 和风天气用户认证key
 * @param param date 选择日期，最多可选择未来60天（包含今天）的数据。日期格式为yyyyMMdd; 只能获得当天的数据
 * @param param lang 多语言设置，默认中文
 * @returns
 */
const getAstronomyMoon = () => {
  const params = {
    location: mapStore.locationId,
    date: moment(new Date()).add(60, 'days').format('YYYYMMDD'),
    key: weatherStore.key,
    lang: 'zh'
  };
  return request({
    url: '/devWeather/v7/astronomy/moon',
    method: 'get',
    params
  });
};

export {
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
};
