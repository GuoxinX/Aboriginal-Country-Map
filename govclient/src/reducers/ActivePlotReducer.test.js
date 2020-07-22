import activePlotReducer from "./ActivePlotReducer";
import { LOAD_PLOT } from "../actions";

describe("reducers", () => {
  describe("ActivePlotReducer", () => {
    const initialState = null;

    it("should provide initial state", () => {
      expect(activePlotReducer(undefined, {})).toEqual(initialState);
    });

    it("returns correct state", () => {
      const action = {
        payload: {
          data: {
            plot: {
              geometry: "{}",
              plotID: "AB3",
              properties: {
                _id: "5bb78b6e85b9f30374bd79bf"
              }
            }
          }
        },
        type: LOAD_PLOT
      };
      const expectedState = {
        geometry: "{}",
        plotID: "AB3",
        properties: {
          _id: "5bb78b6e85b9f30374bd79bf"
        }
      };

      expect(activePlotReducer(undefined, action)).toEqual(expectedState);
    });
  });
});
