import {
    SEARCH_PROMOTIONS,
    FILTER_SEARCH_PROMOTIONS,
    CLEAR_FILTER_SEARCH_PROMOTIONS,
    VIEW_PROMOTION,
    UPDATE_PROMOTION,
    CREATE_PROMOTION,
    RESET_STATUS,
    DELETE_PROMOTION
} from "constants/ActionTypes";
import {GET_PROMOTION_TIER_RULE,
    // GET_TIER_RULE
} from "../../constants/ActionTypes";

export const searchPromotions = (request) => {
    return {
        type: SEARCH_PROMOTIONS,
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
        type: FILTER_SEARCH_PROMOTIONS,
        payload: filter
    };
};


export const clearFilterSortSearch = () => {
    return {
        type: CLEAR_FILTER_SEARCH_PROMOTIONS
    };
};

export const viewPromotion = (request) => {
    return {
        type: VIEW_PROMOTION,
        payload: request
    };
};

export const updatePromotion = (request) => {
    return {
        type: UPDATE_PROMOTION,
        payload: request
    };

};

export const createPromotion = (request) => {
    return {
        type: CREATE_PROMOTION,
        payload: request
    };

};

export const deletePromotion = (request) => {
    return {
        type: DELETE_PROMOTION,
        payload: request
    };

};

export const resetStatus = (request) => {
    return {
        type: RESET_STATUS
    };

};

export const viewPromotionTierRule = (request) => {
    return {
        type: GET_PROMOTION_TIER_RULE,
        payload: request
    };

};
