import {
    SEARCH_APPROVAL,
    SEARCH_APPROVAL_SUCCESS,
    SEARCH_APPROVAL_FAILED,
    FILTER_SEARCH_APPROVAL,
    CLEAR_FILTER_SEARCH_APPROVAL,
    RESET_STATUS,
    VIEW_APPROVAL_SUCCESS,
    VIEW_APPROVAL_FAILED,
    UPDATE_APPROVAL,
    UPDATE_APPROVAL_SUCCESS,
    UPDATE_APPROVAL_FAILED,
    INQ_POST_APPROVAL,
    INQ_POST_APPROVAL_SUCCESS,
    INQ_POST_APPROVAL_FAILED
} from "constants/ActionTypes";

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    listApproval: [],
    showSubmerchant: false,
    subMerchantList : [],
    allData: [],
    recordInfo: {
        totalRecords: 0,
        page : 0,
        nrecords : 0
    },
    filterAndSort : {
        pagination : null,
        filters : null,
        sorter : null,
        search : null,
        startDate : null,
        endDate : null
    },
    data: [
            {
            receiptId: '',
            memberId: '',
            merchantId: '',
            merchantName: '',
            memberName: '',
            memberUsername: '',
            mobileNumber: '',
            totalAmount: '',
            pointTransactionId: '',
            imageUrl: '',
            status: '',
            description: '',
        }
    ],

    updateSuccess: false,
    updateFailed: false,
    updateData: {
        approvalStructureId : '',
        approvalStructureCode : '',
        merchantId: '',
        userId: '',
    },
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FILTER_SEARCH_APPROVAL: {
            return {
                ...state,
                filterAndSort: action.payload
            };
        }

        case CLEAR_FILTER_SEARCH_APPROVAL: {
            return {
                ...state,
                filterAndSort: {
                    pagination: null,
                    filters: null,
                    sorter: null,
                    search: null,
                    startDate : null,
                    endDate : null
                }
            };
        }

        case SEARCH_APPROVAL: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: '',
                listApproval: [],
                allData:[],
                showSubmerchant: false,
                subMerchantList : [],
                recordInfo: {},
            }
        }
        case UPDATE_APPROVAL: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }


        case RESET_STATUS : {
            return {
                ...state,
                updateSuccess: false,
                updateFailed : false,
                updateData: {
                    receiptId: '',
                    memberName: '',
                    mobileNumber: '',
                    merchantName: '',
                    memberUsername: '',
                },
            }
        }

        // Response
        case SEARCH_APPROVAL_SUCCESS: {
            // console.log("red search approval >> " + JSON.stringify(action.payload.data))
            return {
                ...state,
                loader: false,
                listApproval: action.payload.data,
                allData: action.payload,
                showSubmerchant: action.payload.showSubmerchant,
                subMerchantList : action.payload.subMerchantList,
                recordInfo: action.payload.recordInfo
            }
        }

        case SEARCH_APPROVAL_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case VIEW_APPROVAL_SUCCESS: {
            // console.log("red view approval >> " + JSON.stringify(action.payload.data))
            return {
                ...state,
                loader: false,
                data: action.payload.data
            }

        }

        case VIEW_APPROVAL_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case UPDATE_APPROVAL_SUCCESS: {
            return {
                ...state,
                loader: false,
                updateSuccess : true,
                updateFailed: false,
                updateData: action.payload
            }
        }

        case UPDATE_APPROVAL_FAILED: {
            return {
                ...state,
                loader: false,
                updateSuccess : false,
                updateFailed: true,
                updateData: {
                    receiptId: '',
                    memberName: '',
                    mobileNumber: '',
                    merchantName: '',
                    memberUsername: '',
                },
            }
        }

        case INQ_POST_APPROVAL_SUCCESS: {
            // console.log(action.payload)
            return {
                ...state,
                loader: false,
                dataInq: action.payload
            }

        }

        case INQ_POST_APPROVAL_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        default:
            return state;
    }
}
