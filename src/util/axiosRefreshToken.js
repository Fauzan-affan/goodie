import axios from 'axios';

const createInterceptor = (axiosConfig, authAPI) => {
  const request = axios.create(axiosConfig);
  let isRefreshing = false;
  let subscribers = [];
  
  request.interceptors.response.use(res => res, err => {
    const { config } = err;
    const originalRequest = config;

    if (err && err.response && err.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        authAPI.fetchToken().then(response => {
          const { data } = response;
          isRefreshing = false;
          onRrefreshed(data.token);
          authAPI.setAccessToken(data.token);
          subscribers = [];
        });
      }

      const requestSubscribers = new Promise(resolve => {
        subscribeTokenRefresh(token => {
          originalRequest.headers['X-Application-Token'] = token;
          resolve(axios(originalRequest));
        });
      });

      return requestSubscribers;
    }
    
    return Promise.reject(err);
  });

  function subscribeTokenRefresh(cb) {
    subscribers.push(cb);
  }

  function onRrefreshed(token) {
    subscribers.map(cb => cb(token));
  }

  return request;
}

export default createInterceptor;