import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { CardText } from "material-ui/Card";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { register } from "../actions";
import _ from "lodash";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Button, Divider } from "@material-ui/core";

const textStyle = {
  textAlign: "center",
  backgroundColor: "#3F51B5",
  color: "white",
  fontSize: "30px",
  marginBottom: "20px"
};

const inputStyle = {
  width: 250,
};


const validate = values => {
  const errors = {};
  const requiredFields = ["username", "password", "passwordConfirm"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = "Password not identical";
  }
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    helperText={touched && error ? error : label}
    placeholder={label}
    error={touched && error}
    {...input}
    {...custom}
  />
);

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    };
  }

  onSubmit(values) {
    this.props.register(
      values,
      () => {
        // STUB
        this.props.handleRegisterSuccess();
      },
      () => {
        this.props.handleRegisterFail();
      }
    );
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Typography style={textStyle}>Register</Typography>
        <DialogContent>
          <div>
            <Field
              style = {inputStyle}
              name="username"
              component={renderTextField}
              label="Username"
            />
          </div>
          <div>
            <Field
              style = {inputStyle}
              name="password"
              component={renderTextField}
              label="Password"
              type={this.state.showPassword ? "text" : "password"}
            />
          </div>
          <div>
            <Field
              style = {inputStyle}
              name="passwordConfirm"
              component={renderTextField}
              label="Confirm Password"
              type={this.state.showPassword ? "text" : "password"}
            />
          </div>
        </DialogContent>
        <Divider />
        <DialogActions>
          <div>
            <Button
              color="primary"
              type="submit"
              disabled={pristine || submitting}
            >
              Submit
            </Button>
            <Button
              color="primary"
              type="button"
              onClick={this.props.handleClose}
            >
              Cancel
            </Button>
          </div>
        </DialogActions>
      </form>
    );
  }
}

RegisterForm = reduxForm({
  form: "RegisterForm",
  validate
})(
  connect(
    null,
    { register }
  )(RegisterForm)
);

export default RegisterForm;
