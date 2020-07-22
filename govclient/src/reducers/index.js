import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import MapDataReducer from "./MapDataReducer";
import ActiveAboriginalCountryReducer from "./ActiveAboriginalCountryReducer";
import ActivePlotReducer from "./ActivePlotReducer";

const rootReducer = combineReducers({
  form: formReducer,
  mapdata: MapDataReducer,
  activeAboriginalCountry: ActiveAboriginalCountryReducer,
  activePlot: ActivePlotReducer
});

export default rootReducer;
