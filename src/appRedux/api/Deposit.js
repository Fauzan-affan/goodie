import axios from 'axios';

const depositApiUrl = 'https://dev.goodie.id/api-rest';
// const depositApiUrl = 'https://service.goodie.id/api-rest';

export const getHistory = ({
  authToken, deviceId, userId, merchantId
}) => {
  return axios.post('/deposit/payment/history', { merchantId, userId }, {
    baseURL: depositApiUrl,
    headers: {
      'Content-Type': 'application/json',
      authToken,
      deviceUniqueId: deviceId
    }
  });
};

export const getVaList = ({
  authToken, deviceId, userId, merchantId
}) => {
  return axios.post('/deposit/payment/valist', { merchantId, userId }, {
    baseURL: depositApiUrl,
    headers: {
      'Content-Type': 'application/json',
      authToken,
      deviceUniqueId: deviceId
    }
  })
};

export const getBalance = ({
  authToken, deviceId, userId, merchantId
}) => axios.post('/deposit/payment/balance', { merchantId, userId }, {
  baseURL: depositApiUrl,
  headers: {
    'Content-Type': 'application/json',
    authToken,
    deviceUniqueId: deviceId
  }
});