import { combineReducers } from "redux";
import sheetsReducer from "./sheetsReducer";
import toastreducer from "./toastreducer";

const appReducer = combineReducers({
  sheetsReducer,
  toastreducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
