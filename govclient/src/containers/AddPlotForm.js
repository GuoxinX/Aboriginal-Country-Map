import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { CardText } from "material-ui/Card";
import { addPlot } from "../actions";
import { tryParseJSON } from "../utils.js";
import MenuItem from "material-ui/MenuItem";
import _ from "lodash";
import { TextField, SearchIcon, SelectField } from "redux-form-material-ui";
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

/*const customTextField = props => {
	const {width} = props
	
	return (
		<TextField
			width = {width}*/

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

class AddPlotForm extends Component {
  renderField(field) {
    const {
      meta: { touched, error },
      textarea,
      type
    } = field;

    return (
      <div>
        {textarea ? (
          <textarea rows="15" cols="80" type={type} {...field.input} />
        ) : (
          <div>
            <label>{field.label}</label>
            <input type={type} {...field.input} className={`form-control`} />
          </div>
        )}
        <div>{touched ? error : ""}</div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.addPlot(
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
                Add New Plot
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
                Insert Geometry GeoJSON Object
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

AddPlotForm = reduxForm({
  form: "AddPlotForm",
  validate
})(
  connect(
    null,
    { addPlot }
  )(AddPlotForm)
);

export default withStyles(styles)(AddPlotForm);
