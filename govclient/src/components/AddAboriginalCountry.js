import React, { Component } from "react";
import AddAboriginalCountryForm from "../containers/AddAboriginalCountryForm";
import { Card, CardTitle } from "material-ui/Card";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import Typography from "@material-ui/core/Typography";

const cardStyle = {
  // display: "block",
  // height: "60vw"
  flex: 1,
  paddingBottom: "55px",
  paddingLeft: "50px",
  paddingRight: "50px"
};

class AddAboriginalCountry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addAboriginalCountrySuccess: false,
      addAboriginalCountryFailure: false,
      signOutAfterClose: false
    };
  }

  handleAddSuccess = () => {
    this.setState({ addAboriginalCountrySuccess: true });
  };

  handleAddFailure = error => {
    this.setState({ addAboriginalCountryFailure: true });
    if (error.response) {
      if (error.response.status == 402) {
        this.setState({ signOutAfterClose: true });
      }
    }
  };

  closeFailureDialog = () => {
    this.setState({ addAboriginalCountryFailure: false });
    if (this.state.signOutAfterClose) {
      this.props.signOut();
    }
  };

  render() {
    const successActions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={() => this.setState({ addAboriginalCountrySuccess: false })}
      />
    ];
    const failActions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.closeFailureDialog}
      />
    ];

    return (
      <Card style={cardStyle}>
        <AddAboriginalCountryForm
          handleAddSuccess={this.handleAddSuccess}
          handleAddFailure={this.handleAddFailure}
          signOut={this.props.signOut}
          token={this.props.token}
          id={this.props.id}
        />
        <Dialog
          actions={successActions}
          modal={false}
          open={this.state.addAboriginalCountrySuccess}
          onRequestClose={() =>
            this.setState({ addAboriginalCountrySuccess: false })
          }
        >
          Aboriginal country successfully added.
        </Dialog>
        <Dialog
          actions={failActions}
          modal={false}
          open={this.state.addAboriginalCountryFailure}
          onRequestClose={this.closeFailureDialog}
        >
          {" "}
          {this.state.signOutAfterClose
            ? `Session expired. Please sign in and try again.`
            : `Failed to add Aboriginal country.`}
        </Dialog>
      </Card>
    );
  }
}

export default AddAboriginalCountry;
