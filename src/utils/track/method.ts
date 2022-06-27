import moment from 'moment';
import { storeToRefs } from 'pinia';
import sendLog from '@/api/log';

import useUserStore from '@/store/user';
import usePermissionStore from '@/store/permission';
import useMapStore from '@/store/map';

let lastTime = 0;

const trySendLog = async (type: string, sapmodid?: string, eleid?: string) => {
  const userStore = useUserStore();
  const permissionStore = usePermissionStore();
  const mapStore = useMapStore();

  const { userName } = storeToRefs(userStore);
  const { pathTitle, bowserParser } = storeToRefs(permissionStore);
  const { cip, address } = storeToRefs(mapStore);

  const nowTime = Date.now();

  // 节流 0.5s提交一次记录
  if (nowTime - lastTime > 500) {
    const params = {
      stamp: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      logType: type,
      userName: userName.value || 'visitor',
      pageTitle: pathTitle.value || '未知',
      sapmodid: sapmodid || '',
      eleid: eleid || '',
      bowserParser: bowserParser.value || {},
      ip: cip.value || '未知',
      address: address.value || '未知'
    };
    sendLog(params);
    lastTime = nowTime;
  }
};

export default trySendLog;
