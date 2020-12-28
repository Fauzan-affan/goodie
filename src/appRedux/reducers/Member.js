import {
    SEARCH_MEMBERS,
    SEARCH_MEMBERS_SUCCESS,
    SEARCH_MEMBERS_FAILED,
    FILTER_SEARCH_MEMBERS,
    CLEAR_FILTER_SEARCH_MEMBERS,
    RESET_STATUS,
    VIEW_MEMBER_SUCCESS,
    VIEW_MEMBER_FAILED,
    CHANGE_STATUS_MEMBER_SUCCESS,
    CHANGE_STATUS_MEMBER_FAILED,
    UPLOAD_MEMBER, UPLOAD_MEMBER_FAILED, UPLOAD_MEMBER_SUCCESS,
    UPLOAD_TRANSACTION,
    UPLOAD_TRANSACTION_SUCCESS,
    UPLOAD_TRANSACTION_FAILED
} from "constants/ActionTypes";

import {
    APPROVAL_MEMBER,
    APPROVAL_MEMBER_SUCCESS,
    APPROVAL_MEMBER_FAILED
} from "../../constants/ActionTypes"

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    listMembers: [],
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
        searchUsername : null,
        searchMobileNumber : null
    },
    member: {
        memberPicture: '',
        merchant: '',
        memberId: '',
        firstName: '',
        middleName: '',
        lastName: '',
        placeOfBirth: '',
        birthDate: '',
        gender: '',
        tierName: '',
        referredBy: '',
        primaryAddress: '',
        addressLine1: '',
        country: '',
        province: '',
        cityTown: '',
        postalCode: '',
        mobileNumber: '',
        emailAddress: ''
    },
    requesList: {
        ruleType : '',
        // refNumber : '',
        totalTrxAmount : '',
        // productCode : '',
        memberUsername : '',
        ruleName : '',
        issuing : '',
    },
    updateSuccess: false,
    updateFailed: false,
    createSuccess: false,
    createFailed: false,
    deleteSuccess : false,
    deleteFailed: false,
    uploadSuccess : false,
    uploadFailed : false,
    uploadTrxSuccess : false,
    uploadTrxFailed : false,
    approvalMemberSuccess: false,
    approvalmemberFailed: false
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SEARCH_MEMBERS: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: '',
                listMembers: [],
                recordInfo: {}
            }
        }


        case FILTER_SEARCH_MEMBERS: {
            return {
                ...state,
                filterAndSort: action.payload
            }
        }

        case CLEAR_FILTER_SEARCH_MEMBERS: {
            return {
                ...state,
                filterAndSort: {
                    pagination : null,
                    filters : null,
                    sorter : null,
                    search : null,
                    searchUsername : null,
                    searchMobileNumber : null
                }
            }
        }

        case RESET_STATUS : {
            return {
                ...state,
                updateSuccess: false,
                updateFailed : false,
                updateData: {
                    memberId : '',
                    memberName : '',
                    memberType : ''
                },
                createSuccess: false,
                createFailed : false,
                createData: {
                    memberId : '',
                    memberName : '',
                    memberType : ''
                },
                deleteSuccess: false,
                deleteFailed : false,
                uploadSuccess : false,
                uploadTrxSuccess : false,
                uploadFailed : false,
                uploadTrxFailed : false,
                approvalMemberSuccess : false
            }
        }

        case UPLOAD_MEMBER : {
            return {
                ...state,
                loader : true,
                uploadSuccess : false,
                uploadFailed : false,
            }
        }

        case UPLOAD_TRANSACTION : {
            return {
                ...state,
                loader : true,
                uploadTrxSuccess : false,
                uploadTrxFailed : false,
            }
        }


        // Response
        case SEARCH_MEMBERS_SUCCESS: {
            return {
                ...state,
                loader: false,
                listMembers: action.payload.member,
                recordInfo: action.payload.recordInfo
            }
        }

        case SEARCH_MEMBERS_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case VIEW_MEMBER_SUCCESS: {
            return {
                ...state,
                loader: false,
                member: action.payload
            }

        }

        case VIEW_MEMBER_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case CHANGE_STATUS_MEMBER_SUCCESS: {
            return {
                ...state,
                loader: false,
                updateSuccess : true,
                updateFailed: false,
            }
        }

        case CHANGE_STATUS_MEMBER_FAILED: {
            return {
                ...state,
                loader: false,
                updateSuccess : false,
                updateFailed: true
            }
        }

        case UPLOAD_MEMBER_SUCCESS : {
            return {
                ...state,
                loader: false,
                uploadSuccess : true,
                uploadFailed : false,
            }
        }

        case UPLOAD_MEMBER_FAILED : {
            return {
                ...state,
                loader: false,
                uploadSuccess : false,
                uploadFailed : true,
                alertMessage: action.payload
            }
        }

        case UPLOAD_TRANSACTION_SUCCESS : {
            return {
                ...state,
                loader: false,
                uploadTrxSuccess : true,
                uploadTrxFailed : false,
            }
        }

        case UPLOAD_TRANSACTION_FAILED : {
            return {
                ...state,
                loader: false,
                uploadTrxSuccess : false,
                uploadTrxFailed : true,
                alertMessage: action.payload
            }
        }

        case APPROVAL_MEMBER : {
            return {
                ...state,
                loader: false,
                approvalMemberSuccess: false,
                approvalmemberFailed: false
            }
        }

        case APPROVAL_MEMBER_SUCCESS : {
            return {
                ...state,
                loader: false,
                approvalMemberSuccess: true,
                approvalmemberFailed: false
            }
        }

        case APPROVAL_MEMBER_FAILED : {
            return {
                ...state,
                loader: false,
                approvalMemberSuccess: false,
                approvalmemberFailed: true
            }
        }

        default:
            return state;
    }
}
