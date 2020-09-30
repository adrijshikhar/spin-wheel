import {
  SHEETS_ADD_DATA,
  SHEETS_ADD_DATA_PENDING,
  SHEETS_GET_DATA,
  SHEETS_GET_DATA_PENDING,
  SHEETS_ERROR,
} from "../actions/sheetActionTypes";

const initialPendingState = {
  getDataPending: false,
  postDataPending: false,
};

const initialState = {
  ...initialPendingState,
  dataList: [],
  addData: {},
};

export default function boqReducer(
  state = initialState,
  { type, payload, error }
) {
  switch (type) {
    case SHEETS_ADD_DATA:
      return {
        ...state,
        addData: payload,
      };
    case SHEETS_ADD_DATA_PENDING:
      return {
        ...state,
        postDataPending: payload,
      };
    case SHEETS_GET_DATA:
      return {
        ...state,
        dataList: payload,
      };
    case SHEETS_GET_DATA_PENDING:
      return {
        ...state,
        getDataPending: payload,
      };
    case SHEETS_ERROR:
      return {
        ...state,
        error: error,
      };
    default:
      return state;
  }
}
