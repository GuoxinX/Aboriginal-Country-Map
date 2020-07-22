import React, { Component } from "react";
import AboriginalCountryList from "../containers/AboriginalCountryList";

class ViewAboriginalCountries extends Component {
  render() {
    return <AboriginalCountryList {...this.props} />;
  }
}

export default ViewAboriginalCountries;
