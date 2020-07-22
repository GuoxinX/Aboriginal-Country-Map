import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { register } from "../actions";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { Divider } from "@material-ui/core";

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
    error={touched && error ? true : false}
    {...input}
    {...custom}
  />
);

const typoStyle = {
  padding: 10,
  marginTop: 125,
  fontSize: 30,
  backgroundColor: "#00bfd7",
  color: "white"
};

const textStyle = {
  marginTop: 25,
  width: 500,
  marginBottom: 25
};

const paperStyle = {
  margin: "auto",
  width: 700,
  textAlign: "center",
  paddingBottom: 20
};

const buttonStyle = {
  marginTop: 25
};

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
        <Paper style={paperStyle}>
          <Typography style={typoStyle} variant="display2">
            Register
          </Typography>
          <Divider />
          <div>
            <Field
              name="username"
              style={textStyle}
              component={renderTextField}
              label="Username"
            />
          </div>
          <Divider />
          <div>
            <Field
              name="password"
              style={textStyle}
              component={renderTextField}
              label="Password"
              type={this.state.showPassword ? "text" : "password"}
            />
          </div>
          <Divider />
          <div>
            <Field
              name="passwordConfirm"
              style={textStyle}
              component={renderTextField}
              label="Confirm Password"
              type={this.state.showPassword ? "text" : "password"}
            />
          </div>
          <Divider />
          <Button
            color="primary"
            style={buttonStyle}
            type="submit"
            disabled={pristine || submitting}
          >
            Submit
          </Button>
          <Link to={`/login`} style={{ textDecoration: "none" }}>
            <Button color="primary" style={buttonStyle} type="button">
              Go Back
            </Button>
          </Link>
        </Paper>
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
