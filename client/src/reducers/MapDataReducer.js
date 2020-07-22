import { GET_HISTORY, ADD_HISTORY, GET_DET_AREAS, GET_PLOTS } from "../actions";
import _ from "lodash";

const initialState = {
  detAreas: {},
  plots: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DET_AREAS:
      const newState = { ...state };
      const newDetAreas = {};
      if (!action.error) {
        _.forEach(action.payload.data.aboriginalCountries, function(value) {
          newDetAreas[value._id] = value;
        });
      }
      newState.detAreas = newDetAreas;
      return newState;
    case GET_PLOTS:
      const newState1 = { ...state };
      const newPlots = [];
      if (!action.error) {
        _.forEach(action.payload.data.plots, function(value) {
          newPlots.push(value);
        });
      }
      newState1.plots = newPlots;
      return newState1;
    default:
      return state;
  }
}
