import {
  GET_ABORIGINAL_COUNTRIES,
  GET_PLOTS,
  DELETE_ABORIGINAL_COUNTRY,
  DELETE_PLOT
} from "../actions";
import _ from "lodash";

const initialState = {
  aboriginalCountries: [],
  plots: []
};

export default function(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case GET_ABORIGINAL_COUNTRIES:
      const newAboriginalCountries = [];
      if (!action.error) {
        _.forEach(action.payload.data.aboriginalCountries, function(value) {
          newAboriginalCountries.push(value);
        });
      }
      newState.aboriginalCountries = newAboriginalCountries;
      return newState;
    case GET_PLOTS:
      const newPlots = [];
      if (!action.error) {
        _.forEach(action.payload.data.plots, function(value) {
          newPlots.push(value);
        });
      }
      newState.plots = newPlots;
      return newState;
    case DELETE_ABORIGINAL_COUNTRY:
      const newAboriginalCountries2 = state.aboriginalCountries.filter(
        item => item["_id"] !== action.id
      );
      newState.aboriginalCountries = newAboriginalCountries2;
      return newState;
    case DELETE_PLOT:
      const newPlots2 = state.plots.filter(
        item => item["plot_ID"] !== action.id
      );
      newState.plots = newPlots2;
      return newState;
    default:
      return state;
  }
}
