import { combineReducers } from "redux";
import userReducer from "./sheetsReducer";
import toastreducer from "./toastreducer";

const appReducer = combineReducers({
  userReducer,
  toastreducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
