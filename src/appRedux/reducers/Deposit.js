import { 
  GET_DEPOSIT_BALANCE_HISTORY,
  GET_DEPOSIT_BALANCE_HISTORY_SUCCESS,
  GET_DEPOSIT_BALANCE_HISTORY_FAILED,
  GET_VA_LIST,
  GET_VA_LIST_FAILED,
  GET_VA_LIST_SUCCESS,
  GET_BALANCE,
  GET_BALANCE_SUCCESS,
  GET_BALANCE_FAILED
} from 'constants/ActionTypes';

const INIT_STATE = {
  loader: false,
  error: '',
  showMessage: false,
  balanceHistory: [],
  vaList: [],
  balance: 0,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DEPOSIT_BALANCE_HISTORY:
      return {
        ...state,
        loader: true
      }
    
    case GET_DEPOSIT_BALANCE_HISTORY_SUCCESS:
      return {
        ...state,
        loader: false,
        balanceHistory: action.balanceHistory
      }

    case GET_DEPOSIT_BALANCE_HISTORY_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
        showMessage: true
      }

    case GET_VA_LIST:
      return {
        ...state,
        loader: true
      }

    case GET_VA_LIST_SUCCESS:
      return {
        ...state,
        loader: false,
        vaList: action.vaList
      }

    case GET_VA_LIST_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
        showMessage: true
      }
    
    case GET_BALANCE:
      return {
        ...state,
        loader: true
      }
    
    case GET_BALANCE_SUCCESS:
      return {
        ...state,
        loader: false,
        balance: action.balance
      }
    
    case GET_BALANCE_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
        showMessage: true
      }

    default:
      return state;
  }
}