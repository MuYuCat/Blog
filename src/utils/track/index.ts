import trySendLog from './method';

// 案例：
// v-track:visit 访问
// v-track:click="{ sapmodid: '1', eleid: '1' }" 点击

const VTrack = {
  install(app: any) {
    app.directive('track', {
      mounted(el: any, binding: any) {
        const { arg } = binding;
        const params = binding.value;
        if (arg === 'click') {
          el.addEventListener('click', () => {
            trySendLog('click', params.sapmodid, params.eleid);
          });
        } else if (arg === 'visit') {
          trySendLog('visit');
        }
      }
    });
  }
};

export default VTrack;
