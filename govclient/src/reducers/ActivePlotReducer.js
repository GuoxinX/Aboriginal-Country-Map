import { LOAD_PLOT } from "../actions";

export default function(state = null, action) {
  switch (action.type) {
    case LOAD_PLOT:
      var myPlot = action.payload.data.plot;
      return myPlot;
    default:
      return state;
  }
}
