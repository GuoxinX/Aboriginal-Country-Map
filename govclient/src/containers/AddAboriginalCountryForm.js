import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { CardText } from "material-ui/Card";
import { addAboriginalCountry } from "../actions";
import { tryParseJSON } from "../utils";
import _ from "lodash";
import { TextField } from "redux-form-material-ui";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const FIELDS = {
  geometry: {
    type: "textarea",
    label: "geometry"
  },
  aboriginalCountryName: {
    type: "text",
    label: "aboriginalCountryName"
  }
};

const styles = {
  textField: {
    float: "left",
    width: "46%"
  },

  textField1: {
    float: "right",
    width: "46%"
  },

  textField2: {
    float: "center",
    textAlign: "center",
    paddingTop: "30px"
  },

  textField3: {
    backgroundColor: "#00DDDD",
    border: "none",
    color: "white",
    width: 150,
    height: 40,
    webkitBorderRadius: 5,
    mozBorderRadius: 5,
    borderRadius: 5,
    textAlign: "center",
    textDecoration: "none",
    display: "block",
    margin: "auto",
    fontSize: 16,
    cursor: "pointer",
    marginTop: "500px"
  },

  textField4: {
    borderRadius: 4,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 12px",
    width: "calc(100% - 24px)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),

    borderColor: "#80bdff",
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
  }
};

class AddAboriginalCountryForm extends Component {
  onSubmit(values) {
    this.props.addAboriginalCountry(
      values,
      this.props.token,
      this.props.id,
      () => {
        this.props.handleAddSuccess();
      },
      error => {
        this.props.handleAddFailure(error);
      }
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div style={styles.textField2}>
          <Typography gutterBottom variant="display1" component="h6">
            Add Aboriginal Country
          </Typography>
        </div>

        <div>
          <Field
            floatingLabelText="Aboriginal Country Name"
            name="aboriginalCountryName"
            component={TextField}
            type="text"
          />
        </div>

        <div style={styles.textField2}>
          <Typography gutterBottom variant="display1" component="h6">
            Insert a valid GeoJSON Object that describes the Aboriginal country
          </Typography>
        </div>

        <div style={styles.textField}>
          <CardText>Example: </CardText>
          <TextField
            style={styles.textField4}
            underlineStyle={{ display: "none" }}
            multiLine={true}
            rows={14}
            rowsMax={14}
            readOnly={true}
            fullWidth={true}
            value={`{
   "type": "MultiPolygon", // can also be Polygon
   "coordinates": [
      [
        [
          [1234, 2345],
          [2345, 3456],
          ...
        ]
      ],
      ...
  ]
}`}
          />
        </div>

        <div style={styles.textField1}>
          <CardText>Geometry GeoJSON: </CardText>
          <Field
            style={styles.textField4}
            underlineStyle={{ display: "none" }}
            label="geometry"
            name="geometry"
            component={TextField}
            type="text"
            multiLine={true}
            rows={14}
            rowsMax={14}
            fullWidth={true}
            hintText="Insert your GeoJSON geometry object here."
          />
        </div>

        <button type="submit" style={styles.textField3}>
          Submit
        </button>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};

  _.each(FIELDS, (type, field) => {
    if (!values[field]) {
      if (field === "aboriginalCountryName") {
        errors[field] = `Enter an Aboriginal country name`;
      } else {
        errors[field] = `Enter a ${field}`;
      }
    }
  });

  var geoObject = tryParseJSON(values[FIELDS.geometry.label]);

  if (!geoObject) {
    errors[FIELDS.geometry.label] = `Invalid JSON Object`;
  }

  return errors;
};

AddAboriginalCountryForm = reduxForm({
  form: "AddAboriginalCountryForm",
  validate
})(
  connect(
    null,
    { addAboriginalCountry }
  )(AddAboriginalCountryForm)
);

export default withStyles(styles)(AddAboriginalCountryForm);
