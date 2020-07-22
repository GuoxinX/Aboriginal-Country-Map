import React, { Component } from "react";
import RegisterForm from "../containers/RegisterForm";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import FlatButton from "material-ui/FlatButton";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerSuccess: false,
      registerFail: false
    };
  }

  handleRegisterSuccess = () => {
    this.setState({ registerSuccess: true });
  };

  handleRegisterFail = () => {
    this.setState({ registerFail: true });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.registerSuccess}
          disableBackdropClick={false}
          onClose={() => this.setState({ registerSuccess: false })}
        >
          <DialogContent>
            <DialogContentText>Register success!</DialogContentText>
          </DialogContent>
          <DialogActions>
            <FlatButton
              label="Close"
              primary={true}
              onClick={() => this.setState({ registerSuccess: false })}
            />
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.registerFail}
          onClose={() => this.setState({ registerFail: false })}
          disableBackdropClick={false}
        >
          <DialogContent>
            <DialogContentText>Failed to register.</DialogContentText>
          </DialogContent>
          <DialogActions>
            {" "}
            <FlatButton
              label="Close"
              primary={true}
              onClick={() => this.setState({ registerFail: false })}
            />
          </DialogActions>
        </Dialog>
        <RegisterForm
          handleRegisterSuccess={this.handleRegisterSuccess}
          handleRegisterFail={this.handleRegisterFail}
        />
      </div>
    );
  }
}

export default Register;
