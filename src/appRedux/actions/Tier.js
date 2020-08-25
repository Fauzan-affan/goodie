import {
    SEARCH_TIERS,
    FILTER_SEARCH_TIERS,
    CLEAR_FILTER_SEARCH_TIERS,
    VIEW_TIER,
    UPDATE_TIER,
    CREATE_TIER,
    RESET_STATUS,
    DELETE_TIER,
    TIER_DETAILS
} from "constants/ActionTypes";

export const searchTiers = (request) => {
    return {
        type: SEARCH_TIERS,
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
        type: FILTER_SEARCH_TIERS,
        payload: filter
    };
};


export const clearFilterSortSearch = () => {
    return {
        type: CLEAR_FILTER_SEARCH_TIERS
    };
};

export const viewTier = (request) => {
    return {
        type: VIEW_TIER,
        payload: request
    };
};

export const updateTier = (request) => {
    return {
        type: UPDATE_TIER,
        payload: request
    };

};

export const createTier = (request) => {
    return {
        type: CREATE_TIER,
        payload: request
    };

};

export const deleteTier = (request) => {
    return {
        type: DELETE_TIER,
        payload: request
    };

};

export const getTierDetails = (request) => {
    return {
        type: TIER_DETAILS,
        payload: request
    };

};

export const resetStatus = (request) => {
    return {
        type: RESET_STATUS
    };

};
