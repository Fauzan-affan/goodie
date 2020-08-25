import {
    SEARCH_POINT,
    FILTER_SEARCH_POINT,
    CLEAR_FILTER_SEARCH_POINT,
    VIEW_POINT,
    UPDATE_POINT,
    CREATE_POINT,
    RESET_STATUS,
    DELETE_POINT,
} from "constants/ActionTypes";
import {GET_LIST_CURRENCY} from "../../constants/ActionTypes";


export const searchPoint = (request) => {
    return {
        type: SEARCH_POINT,
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
        type: FILTER_SEARCH_POINT,
        payload: filter
    };
};


export const clearFilterSortSearch = () => {
    return {
        type: CLEAR_FILTER_SEARCH_POINT
    };
};

export const viewPoint = (request) => {
    return {
        type: VIEW_POINT,
        payload: request
    };
};

export const updatePoint = (request) => {
    return {
        type: UPDATE_POINT,
        payload: request
    };

};

export const createPoint = (request) => {
    return {
        type: CREATE_POINT,
        payload: request
    };

};

export const deletePoint = (request) => {
    return {
        type: DELETE_POINT,
        payload: request
    };

};

export const resetStatus = (request) => {
    return {
        type: RESET_STATUS
    };

};

export const getListCurrency = (request) => {
    return {
        type: GET_LIST_CURRENCY,
        payload: request
    };
};


