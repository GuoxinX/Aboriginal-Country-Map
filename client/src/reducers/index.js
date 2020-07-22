import { combineReducers } from "redux";
import MapDataReducer from "./MapDataReducer";
import AccountReducer from "./AccountReducer";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  mapdata: MapDataReducer,
  account: AccountReducer,
  form: formReducer
});

export default rootReducer;
