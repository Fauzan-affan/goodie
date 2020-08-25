import Axios from 'axios';

export const searchProgramsApi = ({authToken, deviceId, userId, merchantId}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'redeem/program/search',
            params: {
                userId : userId,
                merchantId : merchantId,
                programCode : '',
                programName : '',
                page : 0,
                nRecords : 1000
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

export const viewProgramApi = ({authToken, deviceId, userId, merchantId, id}) => {
    if(authToken != null){

        return Axios({
            method: 'get',
            url: window.ApiURL + 'redeem/program/view',
            params: {
                userId : userId,
                merchantId : merchantId,
                programId : id
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

export const updateProgramApi = ({authToken, deviceId, userId, merchantId, id, data}) => {
    if(authToken != null){

        return Axios({
            method: 'post',
            url: window.ApiURL + 'redeem/program/update',
            data: {
                userId: userId,
                merchantId: merchantId,
                programId :id,
                productId: data.productId,
                programCode: data.programCode,
                programName: data.programName,
                expiredDate: data.expiredDate,
                tier: data.tier,
                redeemFrequency: data.redeemFrequency,
                pointRequired: data.pointRequired,
                description: data.description,
                termCondition: data.termCondition,
                isExternalProduct : data.isExternalProduct
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const createProgramApi = ({authToken, deviceId, userId, merchantId, data}) => {
    if(authToken != null){

        return Axios({
            method: 'post',
            url: window.ApiURL + 'redeem/program/create',
            data: {
                userId: userId,
                merchantId: merchantId,
                productId: data.productId,
                programCode: data.programCode,
                programName: data.programName,
                expiredDate: data.expiredDate,
                tier: data.tier,
                redeemFrequency: data.redeemFrequency,
                pointRequired: data.pointRequired,
                description: data.description,
                termCondition: data.termCondition,
                isExternalProduct : data.isExternalProduct
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const deleteProgramApi = ({authToken, deviceId, userId, merchantId, id}) => {
    if(authToken != null){
        return Axios({
            method: 'post',
            url: window.ApiURL + 'redeem/program/delete',
            data: {
                userId : userId,
                merchantId : merchantId,
                programId: id,
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};
