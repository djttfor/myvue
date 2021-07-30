import { getToken } from '../lib/public';
export default ({ $axios }) => {
  // $axios.defaults.baseURL = 'https://www.nosum.cn/api';
  $axios.onRequest(config => {
    if (getToken()) {
      config.headers["Authorization"] = getToken();
    }
  });

  $axios.onResponse(res => {

  });
};