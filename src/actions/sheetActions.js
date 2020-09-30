import sheetsAPIClient from "../helpers/sheetsAPIClient";
import {
  SHEETS_ADD_DATA,
  SHEETS_ADD_DATA_PENDING,
  SHEETS_GET_DATA,
  SHEETS_GET_DATA_PENDING,
  SHEETS_ERROR,
} from "./sheetActionTypes";

import { toastSuccessMessage, toastErrorMessage } from "./toastactions";

const apiDispatch = (actionType = "", data) => {
  return {
    type: actionType,
    payload: data,
  };
};

const apiError = (error) => {
  return {
    type: SHEETS_ERROR,
    error,
  };
};

export const getDetails = () => {
  return async (dispatch) => {
    dispatch(apiDispatch(SHEETS_GET_DATA_PENDING, true));
    try {
      const doc = await sheetsAPIClient();
      const rows = await doc.sheetsByIndex[0].getRows();
      dispatch(apiDispatch(SHEETS_GET_DATA_PENDING, false));
      dispatch(apiDispatch(SHEETS_GET_DATA, rows));
      dispatch(toastSuccessMessage("Data fetched successfully"));
    } catch (err) {
      dispatch(apiError(err));
      dispatch(toastErrorMessage(err));
      dispatch(apiDispatch(SHEETS_GET_DATA_PENDING, false));
    }
  };
};

export const addDetails = (data) => {
  return async (dispatch) => {
    dispatch(apiDispatch(SHEETS_ADD_DATA_PENDING, true));
    try {
      const doc = await sheetsAPIClient();
      const sheet = doc.sheetsByIndex[0];
      const moreRows = await sheet.addRows(data);
      dispatch(apiDispatch(SHEETS_ADD_DATA_PENDING, false));
      dispatch(apiDispatch(SHEETS_ADD_DATA, moreRows));
      dispatch(toastSuccessMessage("Data uploaded successfully"));
    } catch (err) {
      dispatch(apiError(err));
      dispatch(toastErrorMessage(err));
      dispatch(apiDispatch(SHEETS_ADD_DATA_PENDING, false));
    }
  };
};
