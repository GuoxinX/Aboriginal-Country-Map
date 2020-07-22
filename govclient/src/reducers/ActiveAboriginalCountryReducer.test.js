import activeAboriginalCountryReducer from "./ActiveAboriginalCountryReducer";
import { LOAD_ABORIGINAL_COUNTRY } from "../actions";

describe("reducers", () => {
  describe("ActiveAboriginalCountryReducer", () => {
    const initialState = null;

    it("should provide initial state", () => {
      expect(activeAboriginalCountryReducer(undefined, {})).toEqual(
        initialState
      );
    });

    it("returns correct state", () => {
      const action = {
        type: LOAD_ABORIGINAL_COUNTRY,
        id: "5bb8d121c19ee304268a53e1",
        payload: {
          data: {
            aboriginalCountries: [
              {
                aboriginalCountryName: "Melb",
                geometry: "{}",
                _id: "5bb8d121c19ee304268a53e1"
              }
            ]
          }
        }
      };
      const expectedState = {
        aboriginalCountryName: "Melb",
        geometry: "{}",
        _id: "5bb8d121c19ee304268a53e1"
      };

      expect(activeAboriginalCountryReducer(undefined, action)).toEqual(
        expectedState
      );
    });
  });
});
