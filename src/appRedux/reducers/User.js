import {
    SEARCH_USERS,
    CREATE_USERS,
    UPDATE_USERS,
    SEARCH_USERS_SUCCESS,
    SEARCH_USERS_FAILED,
    FILTER_SEARCH_USERS,
    CLEAR_FILTER_SEARCH_USERS,
    RESET_STATUS,
    VIEW_USERS_SUCCESS,
    VIEW_USERS_FAILED,
    UPDATE_USERS_SUCCESS,
    UPDATE_USERS_FAILED,
    CREATE_USERS_SUCCESS,
    CREATE_USERS_FAILED,
    CHANGE_STATUS_USER_SUCCESS,
    CHANGE_STATUS_USER_FAILED,
} from "constants/ActionTypes";

import {
    CHANGE_PASSWORD_USER,
    CHANGE_PASSWORD_USER_SUCCESS,
    CHANGE_PASSWORD_USER_FAILED,
} from "../../constants/ActionTypes"

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    listUsers: [],
    recordInfo: {
        totalRecords: 0,
        page : 0,
        nRecords : 0
    },
    filterAndSort : {
        pagination : null,
        filters : null,
        sorter : null,
        search : null
    },
    data: {
        last: '',
        totalPages: '',
        totalElements: '',
        numberOfElements: '',
        sort: '',
        first: '',
        size: '',
        number: '',
        userId: '',
        loginName: '',
        fullName: '',
        password: '',
        description: '',
        lastLogin: '',
        lastLoginFailed: '',
        loginAttempt: '',
        loginDate: '',
        logoutDate: '',
        userNonLocked: '',
        userEnabled: '',
        userExpiredDate: '',
        credentialsExpiredDate: '',
        createdBy: '',
        createdDate: '',
        lastUpdatedBy: '',
        lastUpdatedDate: '',
        lastVersionDate: '',
        addressId: '',
        contactId: '',
        merchantId: '',
        memberId: '',
        verificationCode: '',
        forgotPasswordCode: '',
        status: '',
        userNonLockedLabel: '',
        statusLabel: '',
        userEnabledLabel: '',
        address: {
            addressId: '',
            addressType: '',
            line1: '',
            line2: '',
            line3: '',
            cityId: '',
            cityTown: '',
            stateProvId: '',
            countryId: '',
            postalCode: '',
            primaryAddressFlag: '',
            createdBy: '',
            createdDate: '',
            lastUpdatedBy: '',
            lastUpdatedDate: '',
            lastApprovedBy: '',
            lastApprovedDate: '',
            status: '',
            district: '',
            village: '',
            stateProvName: '',
            countryName: ''
        },

        contact: [{
            contactId: '',
            contactFirstName: '',
            contactMiddleName: '',
            contactLastName: '',
            position: '',
            department: '',
            homeNumber: '',
            homeNumberPreferred: '',
            mobileNumber: '',
            mobileNumberPreferred: '',
            workNumber: '',
            workNumberPreferred: '',
            faxNumber: '',
            faxPreferred: '',
            emailAddress: '',
            emailPreferred: '',
            primaryContactFlag: '',
            createdBy: '',
            createdDate: '',
            lastUpdatedBy: '',
            lastUpdatedDate: '',
            lastApprovedBy: '',
            lastApprovedDate: '',
            status: '',
            positionObject: '',
            departmentObject: ''
            }
        ],

        content: [
            {
                userId: '',
                loginName: '',
                fullName: '',
                password: '',
                description: '',
                lastLogin: '',
                lastLoginFailed: '',
                loginAttempt: '',
                loginDate: '',
                logoutDate: '',
                userNonLocked: '',
                userEnabled: '',
                userExpiredDate: '',
                credentialsExpiredDate: '',
                createdBy: '',
                createdDate: '',
                lastUpdatedBy: '',
                lastUpdatedDate: '',
                lastVersionDate: '',
                addressId: '',
                contactId: '',
                merchantId: '',
                memberId: '',
                verificationCode: '',
                forgotPasswordCode: '',
                status: '',
                userNonLockedLabel: '',
                statusLabel: '',
                userEnabledLabel: '',
            }
        ],
        role: [
            {
                state: '',
                id: '',
                code: '',
                name: '',
                description: '',
                privileges: '',
                createdBy: '',
                createdDate: '',
                lastUpdatedBy: '',
                lastUpdatedDate: '',
                lastApprovedBy: '',
                lastApprovedDate: '',
                lastVersionDate: '',
                status: '',
                approvalRole: '',
                uniqueCode: ''
            }
        ],
        roleIds: []
    },
    updateSuccess: false,
    updateFailed: false,
    updateData: {
        merchantId : '',
        userId : '',
        fullName : '',
        loginName : '',
        password : '',
        confirmPassword : '',
        description : '',
        address : '',
        contact : '',
        userNonLocked : '',
        userEnabled : '',
        rolesIds : '',
    },

    createSuccess: false,
    createFailed: false,
    createData: {
        merchantId : '',
        userId : '',
        fullName : '',
        loginName : '',
        password : '',
        confirmPassword : '',
        description : '',
        address : '',
        contact : '',
        userNonLocked : '',
        userEnabled : '',
        rolesIds : '',
    },

    deleteSuccess : false,
    deleteFailed: false
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FILTER_SEARCH_USERS: {
            return {
              ...state,
              filterAndSort: action.payload
            };
          }

          case CLEAR_FILTER_SEARCH_USERS: {
            return {
              ...state,
              filterAndSort: {
                pagination: null,
                filters: null,
                sorter: null,
                search: null
              }
            };
          }

        case SEARCH_USERS: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: '',
                listUsers: [],
                recordInfo: {},
            }
        }

        case CREATE_USERS: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case UPDATE_USERS: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case CHANGE_PASSWORD_USER: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                updateSuccess: false,
                updateFailed: false
            }
        }


        case RESET_STATUS : {
            return {
                ...state,
                updateSuccess: false,
                updateFailed : false,
                // updateData: {
                //     code : '',
                //     name : '',
                //     description : '',
                //     privileges : '',
                // },
                createSuccess: false,
                createFailed : false,
                // createData: {
                //     code : '',
                //     name : '',
                //     description : '',
                //     privileges : '',
                // },
                deleteSuccess: false,
                deleteFailed : false,
            }
        }

        // Response
        case SEARCH_USERS_SUCCESS: {
            return {
                ...state,
                loader: false,
                listUsers: action.payload.data.content,
                recordInfo: action.payload.recordInfo
            }
        }

        case SEARCH_USERS_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case VIEW_USERS_SUCCESS: {
            return {
                ...state,
                loader: false,
                data: action.payload.data
            }

        }

        case VIEW_USERS_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case UPDATE_USERS_SUCCESS: {
            return {
                ...state,
                loader: false,
                updateSuccess : true,
                updateFailed: false,
                // updateData: action.payload
            }
        }

        case UPDATE_USERS_FAILED: {
            return {
                ...state,
                loader: false,
                updateSuccess : false,
                updateFailed: true,
                updateData: {
                    merchantId : '',
                    userId : '',
                    fullName : '',
                    loginName : '',
                    password : '',
                    confirmPassword : '',
                    description : '',
                    address : '',
                    contact : '',
                    userNonLocked : '',
                    userEnabled : '',
                    rolesIds : '',
                }
            }
        }

        case CREATE_USERS_SUCCESS: {
            return {
                ...state,
                loader: false,
                createSuccess : true,
                createFailed : false,
                createData: action.payload
            }
        }

        case CREATE_USERS_FAILED: {
            return {
                ...state,
                loader: false,
                createSuccess : false,
                createFailed : true,
                createData: {
                    merchantId : '',
                    userId : '',
                    fullName : '',
                    loginName : '',
                    password : '',
                    confirmPassword : '',
                    description : '',
                    address : '',
                    contact : '',
                    userNonLocked : '',
                    userEnabled : '',
                    rolesIds : '',
                }
            }
        }

        case CHANGE_PASSWORD_USER_SUCCESS: {
            return {
                ...state,
                loader: false,
                updateSuccess : true,
                updateFailed: false,
                showMessage: false
            }
        }

        case CHANGE_PASSWORD_USER_FAILED: {
            return {
                ...state,
                loader: false,
                updateSuccess : false,
                updateFailed: true,
                showMessage: false
            }
        }

        case CHANGE_STATUS_USER_SUCCESS: {
            return {
                ...state,
                loader: false,
                updateSuccess : true,
                updateFailed: false,
            }
        }

        case CHANGE_STATUS_USER_FAILED: {
            return {
                ...state,
                loader: false,
                updateSuccess : false,
                updateFailed: true
            }
        }

        default:
            return state;
    }
}