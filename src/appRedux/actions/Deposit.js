import { GET_DEPOSIT_BALANCE_HISTORY, GET_VA_LIST, GET_BALANCE } from 'constants/ActionTypes';

export const getDepositBalanceHistory = request => 
  ({ type: GET_DEPOSIT_BALANCE_HISTORY, payload: request });

export const getVaList = request => 
  ({ type: GET_VA_LIST, payload: request });

export const getBalance = request => ({ type: GET_BALANCE, payload: request });