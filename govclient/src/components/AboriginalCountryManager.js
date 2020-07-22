import React, { Component } from "react";
import ViewAboriginalCountries from "./ViewAboriginalCountries";

class AboriginalCountryManager extends Component {
  render() {
    return (
      <div>
        <ViewAboriginalCountries {...this.props} />
      </div>
    );
  }
}

export default AboriginalCountryManager;
