import request from './request';
import useLocationStore from '../store/map';

const useMapStore = useLocationStore();

/**
 * 地图-地理信息
 * @param param ip ip地址
 * @param param ak 百度api访问应用（AK）
 * @param param coor 百度地图解码方式
 * @returns
 */
const getLocation = () => {
  const params = {
    ip: useMapStore.cip,
    ak: useMapStore.ak,
    coor: useMapStore.coor
  };
  return request({
    url: '/map/location/ip',
    method: 'get',
    params
  });
};

export default getLocation;
