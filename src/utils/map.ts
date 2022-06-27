import useMapStore from '@/store/map';
import getLocation from '@/api/map';

setTimeout(async () => {
  const mapStore = useMapStore();

  // 获取用户ip地址
  const ready = () => {
    const { cip } = (window as any).returnCitySN;
    mapStore.updateCip(cip);
  };

  // 获取城市位置
  const getLocationInfo = async () => {
    const params = {
      ip: mapStore.cip,
      ak: mapStore.ak,
      coor: mapStore.coor
    };
    await getLocation(params).then((res: any) => {
      if (res && res.status === 0) {
        mapStore.updateAddress(res?.content?.address || '');
        mapStore.updateProvince(res?.content?.address_detail?.province || '');
        mapStore.updateCity(res?.content?.address_detail?.city || '');
        mapStore.updateAdcode(res?.content?.address_detail?.adcode || '');
        mapStore.updateCityCode(res?.content?.address_detail?.city_code || '');
        mapStore.updatePointX(res?.content?.point?.x || '');
        mapStore.updatePointY(res?.content?.point?.y || '');
      }
    });
  };

  await ready();
  await getLocationInfo();
}, 10);
