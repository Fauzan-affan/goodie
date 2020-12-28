import {
    SEARCH_APPROVAL,
    FILTER_SEARCH_APPROVAL,
    CLEAR_FILTER_SEARCH_APPROVAL,
    VIEW_APPROVAL,
    UPDATE_APPROVAL,
    RESET_STATUS,
    INQ_POST_APPROVAL
} from "constants/ActionTypes";

export const searchApproval = (request) => {
    return {
        type: SEARCH_APPROVAL,
        payload: request
    };
};

export const filterSortSearch = (pagination, filters, sorter, search, merchantCode, startDate, endDate) => {
    let filter  = {
        pagination : pagination,
        filters : filters,
        sorter : sorter,
        search : search,
        merchantCode : merchantCode,
        startDate : startDate,
        endDate : endDate,
    };
    return {
        type: FILTER_SEARCH_APPROVAL,
        payload: filter
    };
};


export const clearFilterSortSearch = () => {
    return {
        type: CLEAR_FILTER_SEARCH_APPROVAL
    };
};

export const viewApproval = (request) => {
    return {
        type: VIEW_APPROVAL,
        payload: request
    };
};

export const updateApproval = (request) => {
    return {
        type: UPDATE_APPROVAL,
        payload: request
    };

};

export const resetStatus = (request) => {
    return {
        type: RESET_STATUS
    };

};

export const inqPostApproval = (request) => {
    // console.log(request)
    return {
        type: INQ_POST_APPROVAL,
        payload: request
    };
};
