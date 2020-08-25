import {
    FILTER_SEARCH_REPORT,
    CLEAR_FILTER_SEARCH_REPORT,
    GET_ISSUING_REPORT,
    GET_REDEEM_REPORT,
    GET_MEMBER_BALANCE_REPORT,
    GET_VOUCHER_BALANCE_REPORT,
    GET_REFERRAL_REPORT,
    GET_POINT_TRANSACTION_REPORT,
    GET_POINT_TRANSFER_REPORT,
} from "constants/ActionTypes";


export const filterSortSearch = (pagination, filters, sorter, search, startDate, endDate, customFilter) => {
    let filter  = {
        pagination : pagination,
        filters : filters,
        sorter : sorter,
        search : search,
        startDate : startDate,
        endDate : endDate,
        customFilter : customFilter
    };
    return {
        type: FILTER_SEARCH_REPORT,
        payload: filter
    };
};


export const clearFilterSortSearch = () => {
    return {
        type: CLEAR_FILTER_SEARCH_REPORT
    };
};

export const issuingReport = (request) => {
    return {
        type: GET_ISSUING_REPORT,
        payload: request
    };
};

export const redeemReport = (request) => {
    return {
        type: GET_REDEEM_REPORT,
        payload: request
    };

};

export const memberBalanceReport = (request) => {
    return {
        type: GET_MEMBER_BALANCE_REPORT,
        payload: request
    };

};

export const voucherBalanceReport = (request) => {
    return {
        type: GET_VOUCHER_BALANCE_REPORT,
        payload: request
    };

};

export const referralReport = (request) => {
    return {
        type: GET_REFERRAL_REPORT,
        payload: request
    };

};

export const pointTransactionReport = (request) => {
    return {
        type: GET_POINT_TRANSACTION_REPORT,
        payload: request
    };

};

export const pointTransferReport = (request) => {
    return {
        type: GET_POINT_TRANSFER_REPORT,
        payload: request
    };

};
