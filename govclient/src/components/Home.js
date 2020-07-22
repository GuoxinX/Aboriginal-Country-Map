import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const buttonStyle = {
  backgroundColor: "#00bfd7",
  color: "white",
  marginTop: 80,
  width: 500,
  height: 80,
  fontSize: 20
};

const buttonStyle1 = {
  backgroundColor: "#00bfd7",
  color: "white",
  marginTop: 35,
  width: 500,
  height: 80,
  fontSize: 20
};

const buttonStyle2 = {
  backgroundColor: "#00bfd7",
  color: "white",
  marginTop: 35,
  width: 500,
  height: 80,
  fontSize: 20
};

const buttonStyle3 = {
  backgroundColor: "#00bfd7",
  color: "white",
  marginTop: 35,
  width: 500,
  height: 80,
  fontSize: 20
};

const typoStyle = {
  marginTop: 5,
  fontSize: 20
};

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Typography style={typoStyle}>
          To begin, select an option below or use the Menu button on the top
          left.
        </Typography>

        <div>
          <Link to={`/addAboriginalCountry`} style={{ textDecoration: "none" }}>
            <Button
              style={buttonStyle}
              variant="contained"
              size="large"
              color="primary"
            >
              Add Aboriginal Country
            </Button>
          </Link>
        </div>

        <div>
          <Link to={`/aboriginalCountries`} style={{ textDecoration: "none" }}>
            <Button
              style={buttonStyle1}
              variant="contained"
              size="large"
              color="primary"
            >
              View Aboriginal Countries
            </Button>
          </Link>
        </div>

        <div>
          <Link to={`/addPlot`} style={{ textDecoration: "none" }}>
            <Button
              style={buttonStyle2}
              variant="contained"
              size="large"
              color="primary"
            >
              Add New Plot
            </Button>
          </Link>
        </div>

        <div>
          <Link to={`/plots`} style={{ textDecoration: "none" }}>
            <Button
              style={buttonStyle3}
              variant="contained"
              size="large"
              color="primary"
            >
              View Existing Plots
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
