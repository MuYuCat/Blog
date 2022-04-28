import useMapStore from '../store/map';
import getLocation from '../api/map';

const mapStore = useMapStore();

// 获取用户ip地址
const ready = () => {
  const { cip } = (window as any).returnCitySN;
  mapStore.updateCip(cip);
};

// 获取城市位置
const getLocationInfo = async () => {
  await getLocation().then((res: any) => {
    if (res && res.status === 0) {
      mapStore.updateProvince(res?.content?.address_detail?.province || '');
      mapStore.updateCity(res?.content?.address_detail?.city || '');
      mapStore.updateAdcode(res?.content?.address_detail?.adcode || '');
      mapStore.updateCityCode(res?.content?.address_detail?.city_code || '');
      mapStore.updatePointX(res?.content?.point?.x || '');
      mapStore.updatePointY(res?.content?.point?.y || '');
    }
  });
};

const getMapLocation = async () => {
  await ready();
  await getLocationInfo();
};

export default getMapLocation;
