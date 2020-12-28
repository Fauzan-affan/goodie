import Axios from 'axios';
import { auth } from 'firebase';


export const registerMerchantApi = ({rootRegister, email, phoneNumber, firstName, lastName, merchantName, merchantType, password, address, countryId, cityId, stateProvinceId, currencyId, lookupDtlId, postalCode, token}) => {
    let url = window.ApiURL;
    let env = -1;

    if(rootRegister === 'sandbox'){
        url = window.sandboxApiURL;
        env = 0;
    }
    return Axios({
        method: 'post',
        url: url + 'merchant/register',
        data: {
            email: email,
            phoneNumber: phoneNumber,
            firstName: firstName,
            lastName: lastName,
            merchantName: merchantName,
            merchantType: merchantType,
            password: password,
            address: address,
            countryId : countryId,
            cityId: cityId,
            stateProvinceId: stateProvinceId,
            postalCode: postalCode,
            isDeposit: -1,
            token: token,
            environment : env
        },
        headers:{
            'Content-Type': 'application/json'
        }
    });
};

export const viewMerchantApi = ({authToken, deviceId, userId, merchantId}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'merchant/view',
            params: {
                userId : userId,
                merchantId : merchantId
            },
            data: {},
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const searchSubMerchantApi = ({authToken, deviceId, userId, merchantId}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'merchant/submerchant/search',
            params: {
                userId : userId,
                merchantId : merchantId
            },
            data: {},
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const updateMerchantApi = ({authToken, deviceId, userId, merchantId, data}) => {
    if(authToken != null){
        return Axios({
            method: 'post',
            url: window.ApiURL + 'merchant/update',
            data: {
                userId: userId,
                merchantId: merchantId,
                merchantCode: data.merchantCode,
                merchantName: data.merchantName,
                merchantWebsite: data.merchantWebsite,
                merchantLogo: data.merchantLogo,
                isRequiredVerification: data.isRequiredVerification,
                isRedeemOtp: data.isRedeemOtp,
                issuingReferral: data.issuingReferral,
                paramCurrencyPoint: data.paramCurrencyPoint,
                currencyId: data.currencyId,
                lookupDtlId: data.lookupDtlId,
                address: data.address,
                contact: data.contact,
                additionalFields: data.additionalFields,
                isApproval : data.isApproval
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const getListCurrencyApi = ({authToken, deviceId, userId, merchantId, paramCurrencyPoint}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'merchant/param/currency',
            params: {
                userId : userId,
                merchantId : merchantId,
                paramCurrencyPoint: paramCurrencyPoint,
            },
            data: {},
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const getCurrencyApi = ({authToken, deviceId, userId, merchantId, currencyId}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'merchant/currency',
            params: {
                userId : userId,
                merchantId : merchantId,
                currencyId: currencyId,
            },
            data: {},
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const verificationMerchantApi = ({userId, merchantId, code}) => {
    return Axios({
        method: 'post',
        url: window.ApiURL + 'merchant/verification',
        data: {
            userId: userId,
            merchantId: merchantId,
            verificationCode: code
        },
        headers:{
            'Content-Type': 'application/json'
        }
    });
};

export const verificationForgotMerchantApi = ({email}) => {
    return Axios({
        method: 'post',
        url: window.ApiURL + 'merchant/forgot/verification',
        data: {
            email: email
        },
        headers:{
            'Content-Type': 'application/json'
        }
    });
};

export const verificationForgotPasswordMerchantApi = ({userId, merchantId, password, code}) => {
    return Axios({
        method: 'post',
        url: window.ApiURL + 'merchant/forgot/password',
        data: {
            userId: userId,
            merchantId: merchantId,
            password: password,
            code: code
        },
        headers:{
            'Content-Type': 'application/json'
        }
    });
};

export const activateSandboxApi = ({authToken, deviceId, userId, merchantId}) => {
    return Axios({
        method: 'post',
        url: window.ApiURL + 'merchant/sandbox',
        data: {
            userId: userId,
            merchantId: merchantId
        },
        headers:{
            'Content-Type': 'application/json',
            'authToken': authToken,
            'deviceUniqueId' : deviceId
        }
    });
};

