import sheetsAPIClient from "../helpers/sheetsAPIClient";
import {
  SHEETS_ADD_DATA,
  SHEETS_ADD_DATA_PENDING,
  SHEETS_GET_DATA,
  SHEETS_GET_DATA_PENDING,
  SHEETS_ERROR,
} from "./sheetActionTypes";

import { toastSuccessMessage, toastErrorMessage } from "./toastactions";

const API_KEY = process.env.REACT_APP_SHEETS_API_KEY || "";

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
  return (dispatch) => {
    dispatch(apiDispatch(SHEETS_GET_DATA_PENDING, true));

    sheetsAPIClient(API_KEY, (err, res) => {
      dispatch(apiDispatch(SHEETS_GET_DATA_PENDING, false));

      if (err) {
        dispatch(apiError(err));
        return dispatch(toastErrorMessage(err));
      }
      const rows = res.data.values;
      dispatch(toastSuccessMessage("Data fetched successfully"));
      dispatch(apiDispatch(rows, SHEETS_GET_DATA));
    });
  };
};
