import Axios from 'axios';


export const searchApprovalApi = ({authToken, deviceId, userId, merchantId, search, merchantCode, memberName, mobileNumber,  startDate, endDate, page, size, orderType}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'receipt/search',
            params: {
                userId : userId,
                merchantId : merchantId,
                memberName : search,
                merchantCode : merchantCode,
                memberUsername : memberName,
                mobileNumber : mobileNumber,
                startDate : startDate,
                endDate : endDate,
                page : page,
                size : size,
                nRecords : 10,
                role : 1,
                orderType : orderType
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

export const viewApprovalApi = ({authToken, deviceId, userId, merchantId, page, id}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'receipt/search',
            params: {
                userId : userId,
                merchantId : merchantId,
                // transactionName : search,
                page : page,
                // size : size,
                nRecords : 10,
                role : 1,
                receiptId : id
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

export const updateApprovalApi = ({authToken, deviceId, userId, merchantId, id, data}) => {
    if(authToken != null){

        return Axios({
            method: 'post',
            url: window.ApiURL + 'redeem/product/update',
            data: {
                userId: userId,
                merchantId: merchantId,
                productId :id,
                productCode: data.productCode,
                productName: data.productName,
                description: data.description,
                productType: data.productType,
                productTypeLabel: data.productTypeLabel,
                productImage: data.productImage,
                stock: data.stock,
                basePrice: data.basePrice,
                pointsEarned: data.pointsEarned,
                isAllMerchantExchangePoint: -1,
                detectAccountExchangePoint: 4,
                voucherValue: data.voucherValue

            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const inquiryOrPostingApprovalApi = (data) => {
    if(data.authToken != null){

        return Axios({
            method: 'post',
            url: window.ApiURL + 'receipt/update',
            data: {
                userId: data.userId,
                merchantId: data.merchantId,
                receiptId :data.id,
                action: data.action,
                totalAmount: data.totalAmount,
                status: data.status,
                description: data.description

            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': data.authToken,
                'deviceUniqueId' : data.deviceId
            }
        });
    };
};