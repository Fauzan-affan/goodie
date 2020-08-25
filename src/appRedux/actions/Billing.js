import {
    SEARCH_BILLING,
    FILTER_SEARCH_BILLING,
    CLEAR_FILTER_SEARCH_BILLING,
    VIEW_BILLING,
    BILLING_DETAILS,
    RESET_STATUS
} from "constants/ActionTypes";

export const searchBilling = (request) => {
    return {
        type: SEARCH_BILLING,
        payload: request
    };
};

export const filterSortSearch = (pagination, filters, sorter, search) => {
    let filter  = {
        pagination : pagination,
        filters : filters,
        sorter : sorter,
        search : search
    };
    return {
        type: FILTER_SEARCH_BILLING,
        payload: filter
    };
};


export const clearFilterSortSearch = () => {
    return {
        type: CLEAR_FILTER_SEARCH_BILLING
    };
};

export const viewBilling = (request) => {
    return {
        type: VIEW_BILLING,
        payload: request
    };
};

export const getBillingDetails = (request) => {
    return {
        type: BILLING_DETAILS,
        payload: request
    };

};

export const resetStatus = (request) => {
    return {
        type: RESET_STATUS
    };

};
