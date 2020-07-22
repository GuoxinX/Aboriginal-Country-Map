import React from "react";
import { shallow } from "enzyme";
import AddPlot from "./AddPlot";

it("renders without crashing", () => {
  shallow(<AddPlot />);
});
