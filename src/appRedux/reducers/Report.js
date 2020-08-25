import {
    FILTER_SEARCH_REPORT,
    CLEAR_FILTER_SEARCH_REPORT,
    GET_ISSUING_REPORT,
    GET_ISSUING_REPORT_SUCCESS,
    GET_ISSUING_REPORT_FAILED,
    GET_REDEEM_REPORT,
    GET_REDEEM_REPORT_SUCCESS,
    GET_REDEEM_REPORT_FAILED,
    GET_VOUCHER_BALANCE_REPORT,
    GET_VOUCHER_BALANCE_REPORT_SUCCESS,
    GET_VOUCHER_BALANCE_REPORT_FAILED,
    GET_MEMBER_BALANCE_REPORT,
    GET_MEMBER_BALANCE_REPORT_SUCCESS,
    GET_MEMBER_BALANCE_REPORT_FAILED,
    GET_REFERRAL_REPORT,
    GET_REFERRAL_REPORT_SUCCESS,
    GET_REFERRAL_REPORT_FAILED,
    GET_POINT_TRANSACTION_REPORT,
    GET_POINT_TRANSACTION_REPORT_SUCCESS,
    GET_POINT_TRANSACTION_REPORT_FAILED,
    GET_POINT_TRANSFER_REPORT,
    GET_POINT_TRANSFER_REPORT_SUCCESS,
    GET_POINT_TRANSFER_REPORT_FAILED,
    DOWNLOAD_SUCCESS
} from "constants/ActionTypes";
import { Result } from "antd";

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    result: [],
    listPointTransfer:[],
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
        searchPhone : null,
        trxType : null,
        startDate : null,
        endDate : null,
        customFilter : null
    },
    downloadData : [],
    downloadPointTransfer : [],
    response: {},
    totalBillingAmount: '',
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FILTER_SEARCH_REPORT: {
            return {
                ...state,
                filterAndSort: action.payload
            }
        }

        case CLEAR_FILTER_SEARCH_REPORT: {
            return {
                ...state,
                filterAndSort: {
                    pagination : null,
                    filters : null,
                    sorter : null,
                    search : null,
                    searchPhone : null,
                    startDate : null,
                    endDate : null,
                    customFilter : null
                }
            }
        }

        case GET_ISSUING_REPORT: {
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
                    result: [],
                    recordInfo: {},
                    downloadData : []
                }
            }

        }

        case GET_REDEEM_REPORT: {
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
                    result: [],
                    recordInfo: {},
                    downloadData : []
                }
            }
        }

        case GET_VOUCHER_BALANCE_REPORT: {
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
                    result: [],
                    recordInfo: {},
                    downloadData : []
                }
            }
        }

        case GET_MEMBER_BALANCE_REPORT: {
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
                    result: [],
                    recordInfo: {},
                    downloadData : []
                }
            }
        }

        case GET_REFERRAL_REPORT: {
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
                    result: [],
                    recordInfo: {},
                    downloadData : []
                }
            }
        }

        case GET_POINT_TRANSACTION_REPORT: {
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
                    result: [],
                    recordInfo: {},
                    downloadData : []
                }
            }
        }

        case GET_POINT_TRANSFER_REPORT: {
            if(action.payload.isDownload){
                return {
                    ...state,
                    loader: true,
                    showMessage: false,
                    alertMessage: '',
                    downloadPointTransfer : []
                }
            }else{
                return {
                    ...state,
                    loader: true,
                    showMessage: false,
                    alertMessage: '',
                    listPointTransfer: [],
                    recordInfo: {},
                    downloadPointTransfer : []
                }
            }
        }


        // Response
        case GET_ISSUING_REPORT_SUCCESS: {
            return {
                ...state,
                loader: false,
                result: action.payload.result,
                recordInfo: action.payload.recordInfo
            }
        }

        case GET_ISSUING_REPORT_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case GET_REDEEM_REPORT_SUCCESS: {
            return {
                ...state,
                loader: false,
                result: action.payload.result,
                recordInfo: action.payload.recordInfo
            }
        }

        case GET_REDEEM_REPORT_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case GET_VOUCHER_BALANCE_REPORT_SUCCESS: {
            return {
                ...state,
                loader: false,
                result: action.payload.result,
                recordInfo: action.payload.recordInfo
            }
        }

        case GET_VOUCHER_BALANCE_REPORT_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case GET_MEMBER_BALANCE_REPORT_SUCCESS: {
            return {
                ...state,
                loader: false,
                result: action.payload.result,
                recordInfo: action.payload.recordInfo
            }
        }

        case GET_MEMBER_BALANCE_REPORT_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case GET_REFERRAL_REPORT_SUCCESS: {
            return {
                ...state,
                loader: false,
                result: action.payload.result,
                recordInfo: action.payload.recordInfo
            }
        }

        case GET_REFERRAL_REPORT_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case GET_POINT_TRANSACTION_REPORT_SUCCESS: {
            return {
                ...state,
                loader: false,
                result: action.payload.result,
                recordInfo: action.payload.recordInfo
            }
        }

        case GET_POINT_TRANSACTION_REPORT_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case GET_POINT_TRANSFER_REPORT_SUCCESS: {
            return {
                ...state,
                loader: false,
                listPointTransfer: action.payload.pointTransferHistoryList,
                // listPointTransfer: result,
                recordInfo: action.payload.recordInfo,
                response: action.payload,
            }
        }

        case GET_POINT_TRANSFER_REPORT_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                // showMessage: true
            }
        }

        case DOWNLOAD_SUCCESS: {
            // console.log(action.payload.pointTransferHistoryList[0].detail[0])
            return {
                ...state,
                loader: false,
                downloadData: action.payload.result,
                downloadPointTransfer : action.payload.pointTransferHistoryList,
            }
        }

        default:
            return state;
    }
}
