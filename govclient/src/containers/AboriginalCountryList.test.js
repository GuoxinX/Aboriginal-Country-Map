import React from "react";
import { shallow } from "enzyme";
import AboriginalCountryList from "./AboriginalCountryList";
import configureStore from "redux-mock-store";

const mockStore = configureStore();
const initialState = {
  form: null,
  mapdata: {
    aboriginalCountries: [],
    plots: []
  },
  activeAboriginalCountry: null,
  activePlot: null
};

const store = mockStore(initialState);

it("renders without crashing", () => {
  shallow(<AboriginalCountryList store={store} />);
});
