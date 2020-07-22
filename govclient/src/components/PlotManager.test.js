import React from "react";
import { shallow } from "enzyme";
import PlotManager from "./PlotManager";

it("renders without crashing", () => {
  shallow(<PlotManager />);
});
