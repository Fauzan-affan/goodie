import {
    SEARCH_ROLES,
    CREATE_ROLES,
    UPDATE_ROLES,
    DELETE_ROLES,
    SEARCH_ROLES_SUCCESS,
    SEARCH_ROLES_FAILED,
    FILTER_SEARCH_ROLES,
    CLEAR_FILTER_SEARCH_ROLES,
    RESET_STATUS,
    VIEW_ROLES_SUCCESS,
    VIEW_ROLES_FAILED,
    UPDATE_ROLES_SUCCESS,
    UPDATE_ROLES_FAILED,
    CREATE_ROLES_SUCCESS,
    CREATE_ROLES_FAILED,
    DELETE_ROLES_SUCCESS,
    DELETE_ROLES_FAILED,
    GET_LIST_PRIVILEGES_SUCCESS,
    GET_LIST_PRIVILEGES_FAILED,
} from "constants/ActionTypes";

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    listRoles: [],
    listPrivileges: [],
    filterAndSort : {
        pagination : null,
        filters : null,
        sorter : null,
        search : null
    },
    data: {
        id : '',
        code: '',
        name: '',
        description:'',
        privileges: [
            {
                key:'',
                privilegeId: '',
                unitId: '',
                unitCode: '',
                unitName: '',
                functionId: '',
                functionCode: '',
                functionName: ''
            }
        ],
    },
    updateSuccess: false,
    updateFailed: false,
    updateData: {
        name : '',
        code : '',
        merchant: ''
    },

    createSuccess: false,
    createFailed: false,
    createData: {
        name : '',
        code : '',
        merchant : ''
    },

    deleteSuccess : false,
    deleteFailed: false
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FILTER_SEARCH_ROLES: {
            return {
              ...state,
              filterAndSort: action.payload
            };
          }

          case CLEAR_FILTER_SEARCH_ROLES: {
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

        case SEARCH_ROLES: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: '',
            }
        }

        case CREATE_ROLES: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case UPDATE_ROLES: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case DELETE_ROLES: {
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
                    code : '',
                    name : '',
                    // privileges : '',
                },
                createSuccess: false,
                createFailed : false,
                createData: {
                    code : '',
                    name : '',
                    // privileges : '',
                },
                deleteSuccess: false,
                deleteFailed : false,
            }
        }

        // Response
        case SEARCH_ROLES_SUCCESS: {
            return {
                ...state,
                loader: false,
                listRoles: action.payload.data,
            }
        }

        case SEARCH_ROLES_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case VIEW_ROLES_SUCCESS: {
            return {
                ...state,
                loader: false,
                data: action.payload.data
            }

        }

        case VIEW_ROLES_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case UPDATE_ROLES_SUCCESS: {
            return {
                ...state,
                loader: false,
                updateSuccess : true,
                updateFailed: false,
                updateData: action.payload
            }
        }

        case UPDATE_ROLES_FAILED: {
            return {
                ...state,
                loader: false,
                updateSuccess : false,
                updateFailed: true,
                updateData: {
                    code : '',
                    name : '',
                    description : '',
                    privileges : '',
                }
            }
        }

        case CREATE_ROLES_SUCCESS: {
            return {
                ...state,
                loader: false,
                createSuccess : true,
                createFailed : false,
                createData: action.payload
            }
        }

        case CREATE_ROLES_FAILED: {
            return {
                ...state,
                loader: false,
                createSuccess : false,
                createFailed : true,
                createData: {
                    code : '',
                    name : '',
                    description : '',
                    privileges : '',
                }
            }
        }

        case DELETE_ROLES_SUCCESS: {
            return {
                ...state,
                loader: false,
                deleteSuccess : true,
                deleteFailed: false,
                showMessage: false
            }
        }

        case DELETE_ROLES_FAILED: {
            return {
                ...state,
                loader: false,
                deleteSuccess : false,
                deleteFailed: true,
                showMessage: false,
                alertMessage: action.payload
            }
        }

        case GET_LIST_PRIVILEGES_SUCCESS: {
            return {
                ...state,
                listPrivileges: action.payload.data.content
            }
        }

        case GET_LIST_PRIVILEGES_FAILED: {
            return {
                ...state,
                listPrivileges: [],
            }
        }

        default:
            return state;
    }
}
