import Axios from 'axios';


export const searchBillingApi = ({authToken, deviceId, userId, merchantId, periodMonth, periodYear, period, pageSize, id, billingDate, amount, status, paymentDate, dueDate, offset, sortBy, sort, search}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'billing/search',
            params: {
                userId : userId,
                merchantId : merchantId,
                billingId : id,
                periodMonth : periodMonth,
                periodYear : periodYear,
                period : period,
                billingDate : billingDate,
                amount : amount,
                status : status,
                paymentDate : paymentDate,
                dueDate : dueDate,
                pageSize : pageSize,
                offset : offset,
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

export const viewBillingApi = ({authToken, deviceId, userId, merchantId, billingDetailId, productName, rewardName, merchantName, fee, basePrice, quantity, totalPrice, offset, pageSize, id}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'billing/detail',
            params: {
                userId : userId,
                merchantId : merchantId,
                billingId : id,
                billingDetailId : billingDetailId,
                productName : productName,
                rewardName : rewardName,
                merchantName : merchantName,
                fee : fee,
                basePrice : basePrice,
                quantity : quantity,
                totalPrice : totalPrice,
                offset : offset,
                pageSize : pageSize
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

// export const billingDetailsApi = ({authToken, deviceId, userId, merchantId}) => {
//     if(authToken != null){
//         return Axios({
//             method: 'get',
//             url: window.ApiURL + 'billing/details',
//             params: {
//                 userId : userId,
//                 merchantId : merchantId
//             },
//             data: {},
//             headers:{
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 'authToken': authToken,
//                 'deviceUniqueId' : deviceId
//             }
//         });
//     };
// };