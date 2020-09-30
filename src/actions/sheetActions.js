import { stringify } from "query-string";

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
const spreadsheetId = "1l2fYCmFbo751VHO-AB6TN3V8OKSTJUhQEHhbk4--dts";

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

const getURL = ({ params = "", query = "" }) => {
  return `/${spreadsheetId}/values/Sheet1${params}/?${query}`;
};

export const getDetails = () => {
  const apiURL = getURL({ query: stringify({ key: API_KEY }) });
  return (dispatch) => {
    dispatch(apiDispatch(SHEETS_GET_DATA_PENDING, true));
    sheetsAPIClient
      .get(apiURL)
      .then((res) => {
        dispatch(apiDispatch(SHEETS_GET_DATA_PENDING, false));
        dispatch(apiDispatch(SHEETS_GET_DATA, res));
        dispatch(toastSuccessMessage("Data fetched successfully"));
      })
      .catch((err) => {
        dispatch(apiError(err));
        dispatch(toastErrorMessage(err));
      });
  };
};
