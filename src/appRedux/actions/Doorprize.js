import {
    SEARCH_DOORPRIZE,
    FILTER_SEARCH_DOORPRIZE,
    CLEAR_FILTER_SEARCH_DOORPRIZE,
    CREATE_DOORPRIZE,
    RESET_STATUS,
} from "constants/ActionTypes";


export const searchDoorprize = (request) => {
    return {
        type: SEARCH_DOORPRIZE,
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
        type: FILTER_SEARCH_DOORPRIZE,
        payload: filter
    };
};


export const clearFilterSortSearch = () => {
    return {
        type: CLEAR_FILTER_SEARCH_DOORPRIZE
    };
};

export const createDoorprize = (request) => {
    return {
        type: CREATE_DOORPRIZE,
        payload: request
    };

};

export const resetStatus = (request) => {
    return {
        type: RESET_STATUS
    };

};
