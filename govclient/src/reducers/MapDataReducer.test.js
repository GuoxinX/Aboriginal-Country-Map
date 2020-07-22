import mapDataReducer from "./MapDataReducer";
import {
  GET_ABORIGINAL_COUNTRIES,
  GET_PLOTS,
  DELETE_ABORIGINAL_COUNTRY,
  DELETE_PLOT
} from "../actions";

describe("reducers", () => {
  describe("MapDataReducer", () => {
    const initialState = {
      aboriginalCountries: [],
      plots: []
    };

    it("should provide initial state", () => {
      expect(mapDataReducer(undefined, {})).toEqual(initialState);
    });

    it("getAboriginalCountries", () => {
      const action = {
        type: GET_ABORIGINAL_COUNTRIES,
        payload: {
          data: {
            aboriginalCountries: [
              {
                _id: "5bb8d121c19ee304267a53e1",
                geometry: "",
                aboriginalCountryName: "Victoria"
              }
            ]
          }
        }
      };
      const expectedState = {
        aboriginalCountries: [
          {
            _id: "5bb8d121c19ee304267a53e1",
            geometry: "",
            aboriginalCountryName: "Victoria"
          }
        ],
        plots: []
      };
      expect(mapDataReducer(undefined, action)).toEqual(expectedState);
    });

    it("getPlots", () => {
      const action = {
        payload: {
          data: {
            plots: [
              {
                geometry: "{}",
                plot_ID: "AB3",
                properties: {
                  aboriginalPlaceName: "place",
                  address: "abc",
                  hearingYear: "1111",
                  nativeTitle:
                    "Areas the subject of non-exclusive native title",
                  owner: "j s",
                  plotID: "AB3",
                  _id: "5bb78b6e85b9f30374bd79bf"
                }
              }
            ]
          }
        },
        type: GET_PLOTS
      };

      const expectedState = {
        aboriginalCountries: [],
        plots: [
          {
            geometry: "{}",
            plot_ID: "AB3",
            properties: {
              aboriginalPlaceName: "place",
              address: "abc",
              hearingYear: "1111",
              nativeTitle: "Areas the subject of non-exclusive native title",
              owner: "j s",
              plotID: "AB3",
              _id: "5bb78b6e85b9f30374bd79bf"
            }
          }
        ]
      };

      expect(mapDataReducer(undefined, action)).toEqual(expectedState);
    });

    it("deleteAboriginalCountry", () => {
      const initialState1 = {
        aboriginalCountries: [
          {
            _id: "5bb8d121c19ee304267a53e1",
            geometry: "",
            aboriginalCountryName: "Victoria"
          }
        ],
        plots: []
      };

      const action = {
        type: DELETE_ABORIGINAL_COUNTRY,
        id: "5bb8d121c19ee304267a53e1",
        payload: {
          data: "OK"
        }
      };

      const expectedState = {
        aboriginalCountries: [],
        plots: []
      };

      expect(mapDataReducer(initialState1, action)).toEqual(expectedState);
    });

    it("deletePlot", () => {
      const initialState2 = {
        aboriginalCountries: [],
        plots: [
          {
            geometry: "{}",
            plot_ID: "AB3",
            properties: {
              aboriginalPlaceName: "place",
              address: "abc",
              hearingYear: "1111",
              nativeTitle: "Areas the subject of non-exclusive native title",
              owner: "j s",
              plotID: "AB3",
              _id: "5bb78b6e85b9f30374bd79bf"
            }
          }
        ]
      };

      const action = {
        type: DELETE_PLOT,
        id: "AB3",
        payload: {
          data: "OK"
        }
      };

      const expectedState = {
        aboriginalCountries: [],
        plots: []
      };

      expect(mapDataReducer(initialState2, action)).toEqual(expectedState);
    });
  });
});
