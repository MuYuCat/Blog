import dayjs from 'dayjs';

const fixStyle = (num: string | number, style?: string) => {
  switch (style) {
    case 'time': {
      const fixNum = num ? dayjs(num).format('YYYY-MM-DD HH:mm:ss') : '--';
      return fixNum || '--';
    }
    default: {
      const fixNum = num === '' ? '--' : num;
      return fixNum || '--';
    }
  }
};

export default fixStyle;
