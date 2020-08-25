import {
    SEARCH_RECONCILIATION,
    SEARCH_RECONCILIATION_SUCCESS,
    SEARCH_RECONCILIATION_FAILED,
    SEARCH_RECONCILIATION_PAYABLE,
    SEARCH_RECONCILIATION_PAYABLE_SUCCESS,
    SEARCH_RECONCILIATION_PAYABLE_FAILED,
    SEARCH_RECONCILIATION_RECEIVEBLE,
    SEARCH_RECONCILIATION_RECEIVEBLE_SUCCESS,
    SEARCH_RECONCILIATION_RECEIVEBLE_FAILED,
    SEARCH_RECONCILIATION_POINTFEE,
    SEARCH_RECONCILIATION_POINTFEE_SUCCESS,
    SEARCH_RECONCILIATION_POINTFEE_FAILED,
    FILTER_SEARCH_RECONCILIATION,
    CLEAR_FILTER_SEARCH_RECONCILIATION,
    RESET_STATUS,
    VIEW_RECONCILIATION_SUCCESS,
    VIEW_RECONCILIATION_FAILED,
    RECONCILIATION_DETAILS_SUCCESS,
    RECONCILIATION_DETAILS_FAILED,
    DOWNLOAD_SUCCESS
} from "constants/ActionTypes";

const INIT_STATE = {
    loader: false,
    alertMessage: "",
    showMessage: false,
    listReconciliation: [],
    listMerchant:[],
    recordInfo: {
        totalRecords: 0,
        page: 0,
        nrecords: 0
    },
    filterAndSort: {
        pagination: null,
        filters: null,
        sorter: null,
        search: null,
        // periodMonth: null,
        // periodYear: null,
        // customFilter : null
        startDate : null,
        endDate : null
    },
    data: {
        reconcileList: [
            {
                pointTransactionType: '',
                pointType: '',
                trxType: '',
                merchantPayable: '',
                merchantReceivable: '',
                pointTransactionId: '',
                transactionDate: '',
                promotionId: '',
                orderId: '',
                redDetailId: '',
                merchantIdPayable: '',
                merchantIdReceivable: '',
                memberId: '',
                memberUsername: '',
                pointEarned: '',
                pointDeducted: '',
                feePercent: '',
                feeAmount: '',
                pointFee: '',
                billingAmount: ''
            }
        ],

    },
    totalBillingAmount: '',
    downloadData : [],
    response: {}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FILTER_SEARCH_RECONCILIATION: {
            return {
                ...state,
                filterAndSort: action.payload
            };
        }

        case CLEAR_FILTER_SEARCH_RECONCILIATION: {
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

        case SEARCH_RECONCILIATION: {
            if(action.payload.isDownload){
                return {
                    ...state,
                    loader: true,
                    showMessage: false,
                    alertMessage: '',
                    downloadData : []
                }
            }else{
                return {
                    ...state,
                    loader: true,
                    showMessage: false,
                    alertMessage: '',
                    listReconciliation: [],
                    listMerchant:[],
                    recordInfo: {},
                    downloadData : []
                }
            }
        }

        case SEARCH_RECONCILIATION_RECEIVEBLE: {
            if(action.payload.isDownload){
                return {
                    ...state,
                    loader: true,
                    showMessage: false,
                    alertMessage: '',
                    downloadData : []
                }
            }else{
                return {
                    ...state,
                    loader: true,
                    showMessage: false,
                    alertMessage: '',
                    listReconciliation: [],
                    listMerchant:[],
                    recordInfo: {},
                    downloadData : []
                }
            }
        }

        case SEARCH_RECONCILIATION_PAYABLE: {
            if(action.payload.isDownload){
                return {
                    ...state,
                    loader: true,
                    showMessage: false,
                    alertMessage: '',
                    downloadData : []
                }
            }else{
                return {
                    ...state,
                    loader: true,
                    showMessage: false,
                    alertMessage: '',
                    listReconciliation: [],
                    listMerchant:[],
                    recordInfo: {},
                    downloadData : []
                }
            }
        }

        case SEARCH_RECONCILIATION_POINTFEE: {
            if(action.payload.isDownload){
                return {
                    ...state,
                    loader: true,
                    showMessage: false,
                    alertMessage: '',
                    downloadData : []
                }
            }else{
                return {
                    ...state,
                    loader: true,
                    showMessage: false,
                    alertMessage: '',
                    listReconciliation: [],
                    listMerchant:[],
                    recordInfo: {},
                    downloadData : []
                }
            }
        }

        // Response
        case SEARCH_RECONCILIATION_SUCCESS: {
            return {
                ...state,
                loader: false,
                listReconciliation: action.payload.reconcileList,
                listMerchant: action.payload.lsitMerchantName,
                recordInfo: action.payload.recordInfo
            };
        }

        case SEARCH_RECONCILIATION_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            };
        }

        case SEARCH_RECONCILIATION_RECEIVEBLE_SUCCESS: {
            return {
                ...state,
                loader: false,
                listReconciliation: action.payload.reconcileList,
                listMerchant: action.payload.lsitMerchantName,
                recordInfo: action.payload.recordInfo
            };
        }

        case SEARCH_RECONCILIATION_RECEIVEBLE_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            };
        }

        case SEARCH_RECONCILIATION_PAYABLE_SUCCESS: {
            return {
                ...state,
                loader: false,
                listReconciliation: action.payload.reconcileList,
                listMerchant: action.payload.lsitMerchantName,
                recordInfo: action.payload.recordInfo,
                totalBillingamount:action.payload.totalBillingamount,
                response: action.payload,
            };
        }

        case SEARCH_RECONCILIATION_PAYABLE_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            };
        }

        case SEARCH_RECONCILIATION_POINTFEE_SUCCESS: {
            return {
                ...state,
                loader: false,
                listReconciliation: action.payload.reconcileList,
                listMerchant: action.payload.lsitMerchantName,
                recordInfo: action.payload.recordInfo
            };
        }

        case SEARCH_RECONCILIATION_POINTFEE_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            };
        }

        case VIEW_RECONCILIATION_SUCCESS: {
            return {
                ...state,
                loader: false,
                billing: action.payload.result,
                recordInfo: action.payload
            };
        }

        case VIEW_RECONCILIATION_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            };
        }

        //   case RECONCILIATION_DETAILS_SUCCESS: {
        //     return {
        //         ...state,
        //         loader: false,
        //         billingDetails: action.payload
        //     }

        // }

        // case RECONCILIATION_DETAILS_FAILED: {
        //     return {
        //         ...state,
        //         loader: false,
        //         alertMessage: action.payload,
        //         showMessage: true
        //     }
        // }

        case DOWNLOAD_SUCCESS: {
            return {
                ...state,
                loader: false,
                downloadData: action.payload.reconcileList
            }
        }


        default:
            return state;
    }
};
