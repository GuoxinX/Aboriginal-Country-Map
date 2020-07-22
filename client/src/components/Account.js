import React, { Component } from "react";
import { connect } from "react-redux";
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import FlatButton from "material-ui/FlatButton";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginDialogOpen: false,
      loginSuccess: false,
      loginFail: false,
      registerDialogOpen: false,
      registerSuccess: false,
      registerFail: false
    };
  }

  handleLoginClickOpen = () => {
    this.setState({ loginDialogOpen: true });
  };

  handleLoginClose = () => {
    this.setState({ loginDialogOpen: false });
  };

  handleRegisterClickOpen = () => {
    this.setState({ registerDialogOpen: true });
  };

  handleRegisterClose = () => {
    this.setState({ registerDialogOpen: false });
  };

  handleLoginSuccess = () => {
    this.setState({ loginSuccess: true, loginDialogOpen: false });
  };

  handleLoginFail = () => {
    this.setState({ loginFail: true });
  };

  handleRegisterSuccess = () => {
    this.setState({
      registerSuccess: true,
      registerDialogOpen: false
    });
  };

  handleRegisterFail = () => {
    this.setState({ registerFail: true });
  };

  render() {
    return (
      <div>
        {this.props.token ? (
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
              onClick={this.props.signOut}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <div>
            <LoginDialog
              token={this.props.token}
              updateToken={this.props.updateToken}
              loginDialogOpen={this.state.loginDialogOpen}
              handleLoginClickOpen={this.handleLoginClickOpen}
              handleLoginClose={this.handleLoginClose}
              handleLoginSuccess={this.handleLoginSuccess}
              handleLoginFail={this.handleLoginFail}
            />
            <RegisterDialog
              token={this.props.token}
              registerDialogOpen={this.state.registerDialogOpen}
              handleRegisterClickOpen={this.handleRegisterClickOpen}
              handleRegisterClose={this.handleRegisterClose}
              handleRegisterSuccess={this.handleRegisterSuccess}
              handleRegisterFail={this.handleRegisterFail}
            />
          </div>
        )}
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
        <Dialog
          open={this.state.loginSuccess}
          disableBackdropClick={false}
          onClose={() => this.setState({ loginSuccess: false })}
        >
          <DialogContent>
            <DialogContentText>Login success!</DialogContentText>
          </DialogContent>
          <DialogActions>
            <FlatButton
              label="Close"
              primary={true}
              onClick={() => this.setState({ loginSuccess: false })}
            />
          </DialogActions>
        </Dialog>

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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

Account = connect(
  mapStateToProps,
  null
)(Account);

export default Account;
