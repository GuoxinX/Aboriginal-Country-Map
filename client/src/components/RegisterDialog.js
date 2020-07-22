import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import FlatButton from "material-ui/FlatButton";
import TextField from "@material-ui/core/TextField";
import RegisterForm from "./RegisterForm";

class RegisterDialog extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "12px"
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={this.props.handleRegisterClickOpen}
          >
            Register
          </Button>
        </div>
        <Dialog
          open={this.props.registerDialogOpen}
          onClose={this.props.handleRegisterClose}
          disableBackdropClick={true}
        >
          <RegisterForm
            handleClose={this.props.handleRegisterClose}
            handleRegisterSuccess={this.props.handleRegisterSuccess}
            handleRegisterFail={this.props.handleRegisterFail}
          />
        </Dialog>
      </div>
    );
  }
}

export default RegisterDialog;
