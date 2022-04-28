import request from './request';
import useLocationStore from '../store/map';

const locationStore = useLocationStore();

/**
 * 地图-地理信息
 * @param param ip ip地址
 * @param param ak 百度api访问应用（AK）
 * @param param coor 百度地图解码方式
 * @returns
 */
const getLocation = () => {
  const params = {
    ip: locationStore.cip,
    ak: locationStore.ak,
    coor: locationStore.coor
  };
  return request({
    url: '/map/location/ip',
    method: 'get',
    params
  });
};

export default getLocation;
