import React, { Component } from "react";
import PlotList from "../containers/PlotList";

class PlotManager extends Component {
  render() {
    return (
      <div>
        <PlotList {...this.props} />
      </div>
    );
  }
}

export default PlotManager;
