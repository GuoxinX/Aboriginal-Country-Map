import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { CardText } from "material-ui/Card";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import { Button } from "@material-ui/core";

import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { login } from "../actions";
import _ from "lodash";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";

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
  const requiredFields = ["username", "password"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
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
  attemptedSubmit,
  ...custom
}) => (
  <TextField
    helperText={touched && error ? error : label}
    placeholder={label}
    error={(touched && error) || (attemptedSubmit && error)}
    {...input}
    {...custom}
  />
);

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      attemptedSubmit: false
    };
  }

  onSubmit(values) {
    this.props.login(
      values,
      callback => {
        // STUB
        this.props.handleLoginSuccess();
        this.props.updateToken(callback);
      },
      () => {
        this.props.handleLoginFail();
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
        <Typography style={textStyle}>Login</Typography>
        <DialogContent>
          <div>
            <Field
              style = {inputStyle}
              name="username"
              component={renderTextField}
              label="Username"
              attemptedSubmit={this.state.attemptedSubmit}
            />
          </div>
          <div>
            <Field
              style = {inputStyle}
              name="password"
              component={renderTextField}
              label="Password"
              attemptedSubmit={this.state.attemptedSubmit}
              type={this.state.showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment variant="filled" position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </div>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            type="submit"
            color="primary"
            disabled={pristine || submitting}
            onClick={() => this.setState({ attemptedSubmit: true })}
          >
            Submit
          </Button>
          <Button
            type="button"
            onClick={this.props.handleClose}
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    );
  }
}

LoginForm = reduxForm({
  form: "LoginForm",
  validate
})(
  connect(
    null,
    { login }
  )(LoginForm)
);

export default LoginForm;
