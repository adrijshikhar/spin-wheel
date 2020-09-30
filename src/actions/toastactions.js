import { TOAST_SUCCESS, TOAST_ERROR, TOAST_INFO } from './toastactiontype';

export const toastSuccessMessage = message => {
  return {
    type: TOAST_SUCCESS,
    payload: message,
  };
};

export const toastErrorMessage = message => {
  return {
    type: TOAST_ERROR,
    payload: message,
  };
};

export const toastInfoMessage = message => {
  return {
    type: TOAST_INFO,
    payload: message,
  };
};
