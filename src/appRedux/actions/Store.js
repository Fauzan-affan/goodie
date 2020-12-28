import {
    SEARCH_STORE,
    FILTER_SEARCH_STORE,
    CLEAR_FILTER_SEARCH_STORE,
    VIEW_STORE,
    CREATE_STORE,
    UPDATE_STORE,
    DELETE_STORE,
    RESET_STATUS,
} from "constants/ActionTypes";

export const searchStore = (request) => {
    return {
        type: SEARCH_STORE,
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
        type: FILTER_SEARCH_STORE,
        payload: filter
    };
};


export const clearFilterSortSearch = () => {
    return {
        type: CLEAR_FILTER_SEARCH_STORE
    };
};

export const viewStore = (request) => {
    return {
        type: VIEW_STORE,
        payload: request
    };
};

export const resetStatus = (request) => {
    return {
        type: RESET_STATUS
    };

};

export const createStore = (request) => {
    return {
        type: CREATE_STORE,
        payload: request
    };

};

export const updateStore = (request) => {
    return {
            type: UPDATE_STORE,
            payload: request
        };

};

export const deleteStore = (request) => {
    return {
        type: DELETE_STORE,
        payload: request
    };

};