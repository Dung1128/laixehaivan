import { create } from 'apisauce';
import { API_TIMEOUT } from '../../constants/api';
import configs from '../../constants/configs';

const API = create({
  baseURL: configs.endPoint,
  timeout: API_TIMEOUT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const serialize = (obj, prefix) => {
  const str = [];
  let p = '';
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      if (obj[p] === null) continue;

      let k = prefix ? `${prefix}[${p}]` : p,
        v = obj[p];
      str.push(
        v !== null && typeof v === 'object'
          ? serialize(v, k)
          : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
      );
    }
  }
  return str.join('&');
};

export { API, serialize };
