import {
    SEARCH_ADVERTISING,
    FILTER_SEARCH_ADVERTISING,
    CLEAR_FILTER_SEARCH_ADVERTISING,
    VIEW_ADVERTISING,
    CREATE_ADVERTISING,
    UPDATE_ADVERTISING,
    DELETE_ADVERTISING,
    RESET_STATUS
} from "constants/ActionTypes";

export const searchAdvertising  = (request) => {
    return {
        type: SEARCH_ADVERTISING,
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
        type: FILTER_SEARCH_ADVERTISING,
        payload: filter
    };
};


export const clearFilterSortSearch = () => {
    return {
        type: CLEAR_FILTER_SEARCH_ADVERTISING
    };
};

export const viewAdvertising  = (request) => {
    return {
        type: VIEW_ADVERTISING,
        payload: request
    };
};

export const resetStatus = (request) => {
    return {
        type: RESET_STATUS
    };

};

export const createAdvertising  = (request) => {
    return {
        type: CREATE_ADVERTISING,
        payload: request
    };

};

export const updateAdvertising  = (request) => {
    return {
        type: UPDATE_ADVERTISING,
        payload: request
    };

};

export const deleteAdvertising = (request) => {
    return {
        type: DELETE_ADVERTISING,
        payload: request
    };

};

