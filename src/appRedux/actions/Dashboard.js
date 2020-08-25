import {
    GET_LOYALTY_PROMOTION_DATA,
    GET_LOYALTY_REWARD_DATA,
    GET_LOYALTY_TOTAL_DATA,
    GET_MARKETPLACE_MERCHANT_DATA,
    GET_MARKETPLACE_PRODUCT_DATA,
    GET_MARKETPLACE_REVENUE_DATA,
    GET_MEMBER_GROWTH_DATA,
    GET_MEMBER_SUMMARY_DATA
} from "../../constants/ActionTypes";


export const promotionDashboard = (request) => {
    return {
        type: GET_LOYALTY_PROMOTION_DATA,
        payload: request
    };
};

export const rewardDashboard = (request) => {
    return {
        type: GET_LOYALTY_REWARD_DATA,
        payload: request
    };

};

export const totalDashboard = (request) => {
    return {
        type: GET_LOYALTY_TOTAL_DATA,
        payload: request
    };

};

export const merchantDashboard = (request) => {
    return {
        type: GET_MARKETPLACE_MERCHANT_DATA,
        payload: request
    };

};

export const productDashboard = (request) => {
    return {
        type: GET_MARKETPLACE_PRODUCT_DATA,
        payload: request
    };

};

export const revenueDashboard = (request) => {
    return {
        type: GET_MARKETPLACE_REVENUE_DATA,
        payload: request
    };

};

export const summaryMemberDashboard = (request) => {
    return {
        type: GET_MEMBER_SUMMARY_DATA,
        payload: request
    };

};

export const growthMemberDashboard = (request) => {
    return {
        type: GET_MEMBER_GROWTH_DATA,
        payload: request
    };

};
