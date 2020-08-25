import {
    SEARCH_RECONCILIATION,
    SEARCH_RECONCILIATION_PAYABLE,
    SEARCH_RECONCILIATION_RECEIVEBLE,
    SEARCH_RECONCILIATION_POINTFEE,
    FILTER_SEARCH_RECONCILIATION,
    CLEAR_FILTER_SEARCH_RECONCILIATION,
    VIEW_RECONCILIATION,
    RECONCILIATION_DETAILS,
    RESET_STATUS
} from "constants/ActionTypes";

export const searchReconciliation = (request) => {
    return {
        type: SEARCH_RECONCILIATION,
        payload: request
    };
};

export const searchReconciliationReceiveble = (request) => {
    return {
        type: SEARCH_RECONCILIATION_RECEIVEBLE,
        payload: request
    };
};

export const searchReconciliationPayable = (request) => {
    return {
        type: SEARCH_RECONCILIATION_PAYABLE,
        payload: request
    };
};

export const searchReconciliationPointfee = (request) => {
    return {
        type: SEARCH_RECONCILIATION_POINTFEE,
        payload: request
    };
};

export const filterSortSearch = (pagination, filters, sorter, search, startDate, endDate) => {
    let filter  = {
        pagination : pagination,
        filters : filters,
        sorter : sorter,
        search : search,
        startDate : startDate,
        endDate : endDate,
    };
    return {
        type: FILTER_SEARCH_RECONCILIATION,
        payload: filter
    };
};


export const clearFilterSortSearch = () => {
    return {
        type: CLEAR_FILTER_SEARCH_RECONCILIATION
    };
};

export const viewReconciliation = (request) => {
    return {
        type: VIEW_RECONCILIATION,
        payload: request
    };
};

export const getReconciliationDetails = (request) => {
    return {
        type: RECONCILIATION_DETAILS,
        payload: request
    };

};

export const resetStatus = (request) => {
    return {
        type: RESET_STATUS
    };

};
