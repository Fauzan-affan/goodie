import {
    SEARCH_PRODUCTS,
    FILTER_SEARCH_PRODUCTS,
    CLEAR_FILTER_SEARCH_PRODUCTS,
    VIEW_PRODUCT,
    UPDATE_PRODUCT,
    CREATE_PRODUCT,
    RESET_STATUS,
    DELETE_PRODUCT,
    SELECT_PRODUCT,
    CLEAR_SELECT_PRODUCT,
    ADD_STOCK
} from "constants/ActionTypes";

export const searchProducts = (request) => {
    return {
        type: SEARCH_PRODUCTS,
        payload: request
    };
};

export const filterSortSearch = (pagination, filters, sorter) => {
    let filter  = {
        pagination : pagination,
        filters : filters,
        sorter : sorter
    };
    return {
        type: FILTER_SEARCH_PRODUCTS,
        payload: filter
    };
};


export const clearFilterSortSearch = () => {
    return {
        type: CLEAR_FILTER_SEARCH_PRODUCTS
    };
};

export const viewProduct = (request) => {
    return {
        type: VIEW_PRODUCT,
        payload: request
    };
};

export const updateProduct = (request) => {
    return {
        type: UPDATE_PRODUCT,
        payload: request
    };

};

export const createProduct = (request) => {
    return {
        type: CREATE_PRODUCT,
        payload: request
    };

};

export const deleteProduct = (request) => {
    return {
        type: DELETE_PRODUCT,
        payload: request
    };

};

export const resetStatus = (request) => {
    return {
        type: RESET_STATUS
    };

};

export const selectProduct = (request) => {
    return {
        type: SELECT_PRODUCT,
        payload: request
    };

};

export const clearSelectProduct = (request) => {
    return {
        type: CLEAR_SELECT_PRODUCT
    };

};

export const addStock = (request) => {
    return {
        type: ADD_STOCK,
        payload: request
    };

};

