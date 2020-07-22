import React from "react";
import { shallow } from "enzyme";
import EditPlot from "./EditPlot";

it("renders without crashing", () => {
  shallow(<EditPlot />);
});
