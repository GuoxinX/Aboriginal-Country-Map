import React, { Component } from "react";
import LoginForm from "../containers/LoginForm";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import FlatButton from "material-ui/FlatButton";
import { Card, CardTitle } from "material-ui/Card";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginSuccess: false,
      loginFail: false
    };
  }

  handleLoginSuccess = () => {
    this.setState({ loginSuccess: true });
  };

  handleLoginFail = () => {
    this.setState({ loginFail: true });
  };
  render() {
    return (
      <div>
        <Dialog
          open={this.state.loginFail}
          onClose={() => this.setState({ loginFail: false })}
          disableBackdropClick={false}
        >
          <DialogContent>
            <DialogContentText>Failed to login.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <FlatButton
              label="Close"
              primary={true}
              onClick={() => this.setState({ loginFail: false })}
            />
          </DialogActions>
        </Dialog>

        

        <LoginForm
          updateToken={this.props.updateToken}
          handleLoginSuccess={this.handleLoginSuccess}
          handleLoginFail={this.handleLoginFail}
        />

    
      </div>
    );
  }
}

export default Login;
