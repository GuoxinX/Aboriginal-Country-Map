import React from "react";
import { shallow } from "enzyme";
import RegisterForm from "./RegisterForm";
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
  shallow(<RegisterForm store={store} />);
});
