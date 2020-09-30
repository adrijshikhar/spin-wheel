import { toast } from 'react-toastify';

import {
  TOAST_SUCCESS,
  TOAST_INFO,
  TOAST_ERROR,
} from '../actions/toastactiontype';

// eslint-disable-next-line no-unused-vars
export default function toastReducer(state = {}, { type, payload, error }) {
  switch (type) {
    case TOAST_SUCCESS:
      toast.success(payload);
      return state;
    case TOAST_ERROR:
      toast.error(payload);
      return state;
    case TOAST_INFO:
      toast.info(payload);
      return state;
    default:
      return state;
  }
}
