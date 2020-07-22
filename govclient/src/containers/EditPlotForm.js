import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { CardText } from "material-ui/Card";
import { editPlot, loadPlot } from "../actions";
import { tryParseJSON } from "../utils.js";
import MenuItem from "material-ui/MenuItem";
import { TextField, SelectField } from "redux-form-material-ui";
import _ from "lodash";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const FIELDS = {
  geometry: {
    type: "textarea",
    label: "geometry"
  },
  plotID: {
    type: "text",
    label: "plotID"
  },
  address: {
    type: "text",
    label: "address"
  },
  nativeTitle: {
    type: "text",
    label: "nativeTitle"
  },
  hearingYear: {
    type: "text",
    label: "hearingYear"
  },
  aboriginalPlaceName: {
    type: "text",
    label: "aboriginalPlaceName"
  },
  owner: {
    type: "text",
    label: "owner"
  }
};

const styles = {
  dropList: {
    float: "left",
    width: "40%",
    marginTop: 24
  },

  textField: {
    float: "left",
    width: "40%"
  },

  textField1: {
    float: "right",
    width: "40%"
  },

  textField2: {
    float: "center",
    textAlign: "center",
    paddingTop: 30
  },

  textField3: {
    float: "center",
    textAlign: "center",
    marginTop: 300
  },

  textField4: {
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
    display: "inlineBlock",
    fontSize: 16,
    cursor: "pointer",
    marginTop: 35
  },

  textField5: {
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

class EditPlotForm extends Component {
  componentDidMount() {
    this.props.loadPlot(this.props.match.params.id);
  }

  onSubmit(values) {
    this.props.editPlot(
      values,
      this.props.token,
      this.props.id,
      () => {
        this.props.handleEditSuccess();
      },
      error => {
        this.props.handleEditFailure(error);
      }
    );
  }

  render() {
    const { classes } = this.props;
    const { handleSubmit } = this.props;

    return (
      <form
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        className="add-plot-form"
      >
        <div>
          <div>
            <div style={styles.textField2}>
              <Typography gutterBottom variant="display1" component="h6">
                Edit Plot
              </Typography>
            </div>

            <div>
              <Field
                floatingLabelText="Plot ID"
                name="plotID"
                component={TextField}
                type="text"
                style={styles.textField}
              />
            </div>
            <div>
              <Field
                floatingLabelText="Address"
                name="address"
                component={TextField}
                type="text"
                style={styles.textField1}
              />
            </div>

            <div>
              <Field
                hintText="Native Title Agreement"
                name="nativeTitle"
                component={SelectField}
                type="text"
                style={styles.dropList}
              >
                <MenuItem
                  value="Area where native title does not exist"
                  primaryText="Area where native title does not exist"
                />
                <MenuItem
                  value="Areas to which Section 47A and 47B NTA Apply"
                  primaryText="Areas to which Section 47A and 47B NTA Apply"
                />
                <MenuItem
                  value="Areas the subject of non-exclusive native title"
                  primaryText="Areas the subject of non-exclusive native title"
                />
              </Field>
            </div>

            <div>
              <Field
                floatingLabelText="Hearing Year"
                name="hearingYear"
                component={TextField}
                type="text"
                style={styles.textField1}
              />
            </div>

            <div>
              <Field
                floatingLabelText="Aboriginal Place Name"
                name="aboriginalPlaceName"
                component={TextField}
                type="text"
                style={styles.textField}
              />
            </div>

            <div>
              <Field
                floatingLabelText="Owner"
                name="owner"
                component={TextField}
                type="text"
                style={styles.textField1}
              />
            </div>

            <div style={styles.textField3}>
              <Typography gutterBottom variant="display1" component="h6">
                Insert GeoJSON Object
              </Typography>
            </div>

            <Field
              label="geometry"
              name="geometry"
              component={TextField}
              type="text"
              underlineStyle={{ display: "none" }}
              multiLine={true}
              fullWidth={true}
              rows={10}
              rowsMax={10}
              style={styles.textField5}
            />
          </div>
        </div>

        <button type="submit" style={styles.textField4}>
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
      if (field === "plotID") {
        errors[field] = `Enter a plot ID`;
      } else if (field === "aboriginalPlaceName") {
        errors[field] = `Enter an aboriginal place name`;
      } else if (field === "address") {
        errors[field] = `Enter an address`;
      } else if (field === "hearingYear") {
        errors[field] = `Enter a hearing year`;
      } else if (field === "owner") {
        errors[field] = `Enter an owner`;
      } else {
        errors[field] = `Enter a ${field}`;
      }
    }
  });

  var geoObject = tryParseJSON(values[FIELDS.geometry.label]);

  if (!geoObject) {
    errors[FIELDS.geometry.label] = `Invalid geometry JSON Object`;
  }

  return errors;
};

function mapStateToProps(state) {
  if (state.activePlot != null) {
    var initialValues = {
      geometry: state.activePlot.geometry,
      plotID: state.activePlot.plotID,
      oldPlotID: state.activePlot.plotID,
      aboriginalPlaceName: state.activePlot.properties.aboriginalPlaceName,
      address: state.activePlot.properties.address,
      hearingYear: state.activePlot.properties.hearingYear,
      owner: state.activePlot.properties.owner,
      nativeTitle: state.activePlot.properties.nativeTitle,
      _id: state.activePlot.properties._id
    };
  } else {
    return {};
  }

  return {
    initialValues: initialValues
  };
}

EditPlotForm = reduxForm({
  form: "EditPlotForm",
  enableReinitialize: true,
  validate
})(EditPlotForm);

EditPlotForm = connect(
  mapStateToProps,
  { loadPlot, editPlot }
)(EditPlotForm);

export default EditPlotForm;
