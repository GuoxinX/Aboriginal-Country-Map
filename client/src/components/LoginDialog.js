import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import FlatButton from "material-ui/FlatButton";
import TextField from "@material-ui/core/TextField";
import LoginForm from "./LoginForm";

class LoginDialog extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px"
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={this.props.handleLoginClickOpen}
          >
            Login
          </Button>
        </div>
        <Dialog
          open={this.props.loginDialogOpen}
          onClose={this.props.handleLoginClose}
          disableBackdropClick={true}
        >
          <LoginForm
            handleClose={this.props.handleLoginClose}
            handleLoginSuccess={this.props.handleLoginSuccess}
            handleLoginFail={this.props.handleLoginFail}
            updateToken={this.props.updateToken}
          />
        </Dialog>
      </div>
    );
  }
}

export default LoginDialog;
