import {
  SEARCH_BILLING,
  SEARCH_BILLING_SUCCESS,
  SEARCH_BILLING_FAILED,
  FILTER_SEARCH_BILLING,
  CLEAR_FILTER_SEARCH_BILLING,
  // RESET_STATUS,
  VIEW_BILLING_SUCCESS,
  VIEW_BILLING_FAILED,
  // BILLING_DETAILS_SUCCESS,
  // BILLING_DETAILS_FAILED,
  DOWNLOAD_SUCCESS
} from "constants/ActionTypes";

const INIT_STATE = {
    loader: false,
    alertMessage: "",
    showMessage: false,
    listBilling: [],
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
      periodMonth: null,
      periodYear: null,
      customFilter : null
    },
    billing: {
        billingId: '',
        periodMonth: '',
        periodYear: '',
        billingDate: '',
        status: '',
        paymentDate: '',
        dueDate: '',
        period: '',
        amount: '',
        billingDetails: [
              {
                  billingId: '',
                  billingDetailId: '',
                  period: '',
                  basePrice: '',
                  salePrice: '',
                  quantity: '',
                  totalPrice: '',
                  productName: '',
                  rewardName: '',
                  merchantName: '',
                  amount: ''
              }
        ],
    },
  downloadData : [],
  updateSuccess: false,
  updateFailed: false,
  createSuccess: false,
  createFailed: false,
  deleteSuccess: false,
  deleteFailed: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FILTER_SEARCH_BILLING: {
      return {
        ...state,
        filterAndSort: action.payload
      };
    }

    case CLEAR_FILTER_SEARCH_BILLING: {
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

    case SEARCH_BILLING: {
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
            listBilling: [],
            recordInfo: {},
            downloadData : []
        }
    }


      // return {
      //   ...state,
      //   loader: true,
      //   showMessage: false,
      //   alertMessage: "",
      //   listBilling: [],
      //   recordInfo: {}
      // };
    }

    // case RESET_STATUS : {
    //     return {
    //         ...state,
    //         updateSuccess: false,
    //         updateFailed : false,
    //         updateData: {
    //             billingId : '',
    //             memberName : '',
    //             memberType : ''
    //         },
    //         createSuccess: false,
    //         createFailed : false,
    //         createData: {
    //             memberId : '',
    //             memberName : '',
    //             memberType : ''
    //         },
    //         deleteSuccess: false,
    //         deleteFailed : false,
    //     }
    // }

    // Response
    case SEARCH_BILLING_SUCCESS: {
      return {
        ...state,
        loader: false,
        listBilling: action.payload.result,
        recordInfo: action.payload.recordInfo
      };
    }

    case SEARCH_BILLING_FAILED: {
      return {
        ...state,
        loader: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }

    case VIEW_BILLING_SUCCESS: {
      return {
        ...state,
        loader: false,
        billing: action.payload.result,
        recordInfo: action.payload
      };
    }

    case VIEW_BILLING_FAILED: {
      return {
        ...state,
        loader: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }

  //   case BILLING_DETAILS_SUCCESS: {
  //     return {
  //         ...state,
  //         loader: false,
  //         billingDetails: action.payload
  //     }

  // }

  // case BILLING_DETAILS_FAILED: {
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
        downloadData: action.payload.result
    }
}


    default:
      return state;
  }
};
