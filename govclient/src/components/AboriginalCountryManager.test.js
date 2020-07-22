import React from "react";
import { shallow } from "enzyme";
import AboriginalCountryManager from "./AboriginalCountryManager";

it("renders without crashing", () => {
  shallow(<AboriginalCountryManager />);
});
