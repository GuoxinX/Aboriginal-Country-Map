import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { login } from "../actions";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { IconButton } from "material-ui";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Button } from "@material-ui/core";

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

const typoStyle = {
  padding: 10,
  marginTop: 125,
  fontSize: 30,
  backgroundColor: "#00bfd7",
  color: "white"
};

const buttonStyle = {
  backgroundColor: "#00bfd7",
  border: "none",
  color: "white",
  width: 100,
  height: 10,
  webkitBorderRadius: 5,
  mozBorderRadius: 5,
  borderRadius: 5,
  textAlign: "center",
  textDecoration: "none",
  display: "block",
  marginTop: 25,
  marginLeft: 300,
  fontSize: 16,
  cursor: "pointer"
};

const buttonStyle1 = {
  backgroundColor: "#00bfd7",
  border: "none",
  color: "white",
  textAlign: "center",
  textDecoration: "none",
  margin: "auto",
  marginTop: 25
};

const paperStyle = {
  margin: "auto",
  width: 700,
  textAlign: "center",
  paddingBottom: 20
};

const textStyle = {
  marginTop: 25,
  width: 500,
  marginBottom: 25
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
    error={
      touched && error
        ? true
        : false || (attemptedSubmit && error)
          ? true
          : false
    }
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
        this.props.handleLoginSuccess();
        this.props.updateToken(callback);
        console.log("success?");
      },
      () => {
        this.props.handleLoginFail();
        console.log("fail?");
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
        <Paper style={paperStyle}>
          <Typography style={typoStyle} variant="display2">
            Login
          </Typography>
          <Divider />
          <div>
            <Field
              style={textStyle}
              name="username"
              component={renderTextField}
              label="Username"
              attemptedSubmit={this.state.attemptedSubmit}
            />
          </div>
          <Divider />
          <div>
            <Field
              style={textStyle}
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
          <Divider />
          <Button
            style={buttonStyle}
            type="submit"
            color="primary"
            onClick={() => this.setState({ attemptedSubmit: true })}
          >
            Submit
          </Button>

          <Link to={`/register`} style={{ textDecoration: "none" }}>
            <Button style={buttonStyle1} variant="outlined">
              Don't have an account? Click here to register
            </Button>
          </Link>
        </Paper>
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
