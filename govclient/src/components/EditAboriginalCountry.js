import React, { Component } from "react";
import EditAboriginalCountryForm from "../containers/EditAboriginalCountryForm";
import { Card, CardTitle } from "material-ui/Card";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

const cardStyle = {
  // display: "block",
  // height: "60vw"
  flex: 1,
  peditingBottom: "10px",
  paddingBottom: "55px",
  paddingLeft: "50px",
  paddingRight: "50px"
};

class EditAboriginalCountry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editAboriginalCountrySuccess: false,
      editAboriginalCountryFailure: false,
      signOutAfterClose: false
    };
  }

  handleEditSuccess = () => {
    this.setState({ editAboriginalCountrySuccess: true });
  };

  handleEditFailure = error => {
    this.setState({ editAboriginalCountryFailure: true });
    if (error.response) {
      if (error.response.status == 402) {
        this.setState({ signOutAfterClose: true });
      }
    }
  };

  closeFailureDialog = () => {
    this.setState({ editAboriginalCountryFailure: false });
    if (this.state.signOutAfterClose) {
      this.props.signOut();
    }
  };

  render() {
    const successActions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={() => this.setState({ editAboriginalCountrySuccess: false })}
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
        <EditAboriginalCountryForm
          handleEditSuccess={this.handleEditSuccess}
          handleEditFailure={this.handleEditFailure}
          {...this.props}
        />
        <Dialog
          actions={successActions}
          modal={false}
          open={this.state.editAboriginalCountrySuccess}
          onRequestClose={() =>
            this.setState({ editAboriginalCountrySuccess: false })
          }
        >
          Aboriginal country successfully edited.
        </Dialog>
        <Dialog
          actions={failActions}
          modal={false}
          open={this.state.editAboriginalCountryFailure}
          onRequestClose={this.closeFailureDialog}
        >
          {this.state.signOutAfterClose
            ? `Session expired. Please sign in and try again.`
            : `Failed to edit Aboriginal Country.`}
        </Dialog>
      </Card>
    );
  }
}

export default EditAboriginalCountry;
