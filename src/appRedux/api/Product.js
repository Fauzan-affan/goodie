import Axios from 'axios';

export const searchProductsApi = ({
    authToken, 
    deviceId, 
    userId, 
    merchantId,
    currencyType,
    search, 
    isExternal,
    sortbyNumber,
    sortNumber, 
    ...restParams
}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'redeem/product/search',
            params: {
                userId : userId,
                merchantId : merchantId,
                productName: search,
                sort: sortNumber,
                sortBy: sortbyNumber,
                // productCode : '',
                // productType : '',
                currencyId : currencyType,
                isExternal : isExternal,
                page : 0,
                nRecords : 1000,
                ...restParams
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

export const viewProductApi = ({authToken, deviceId, userId, merchantId, id}) => {
    if(authToken != null){

        return Axios({
            method: 'get',
            url: window.ApiURL + 'redeem/product/view',
            params: {
                userId : userId,
                merchantId : merchantId,
                productId : id
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

export const updateProductApi = ({authToken, deviceId, userId, merchantId, id, data}) => {
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

export const createProductApi = ({authToken, deviceId, userId, merchantId, data}) => {
    if(authToken != null){

        return Axios({
            method: 'post',
            url: window.ApiURL + 'redeem/product/create',
            data: {
                userId: userId,
                merchantId: merchantId,
                productId: data.productId,
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
                detectAccountExchangePoint:  4,
                voucherValue: data.voucherValue,
                isMarketplace: data.isMarketplace,
                productDetails : data.productDetails
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const deleteProductApi = ({authToken, deviceId, userId, merchantId, id}) => {
    if(authToken != null){
        return Axios({
            method: 'post',
            url: window.ApiURL + 'redeem/product/delete',
            data: {
                userId : userId,
                merchantId : merchantId,
                productId: id,
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const addStockApi = ({authToken, deviceId, userId, merchantId, data}) => {
    if(authToken != null){
        return Axios({
            method: 'post',
            url: window.ApiURL + 'redeem/product/update/stock',
            data: {
                userId: userId,
                merchantId: merchantId,
                productId: data.productId,
                additionalStock: data.additionalStock,
                productDetails: data.productDetails
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};
