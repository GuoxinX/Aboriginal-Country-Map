import React, { Component } from "react";
import EditPlotForm from "../containers/EditPlotForm";
import { Card, CardTitle } from "material-ui/Card";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

const cardStyle = {
  // display: "block",
  // height: "60vw"
  flex: 1,

  paddingLeft: "100px",
  paddingRight: "100px",
  marginRight: 150,
  marginLeft: 150,
  paddingBottom: "70px"
};

class EditPlot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editPlotSuccess: false,
      editPlotFailure: false,
      signOutAfterClose: false
    };
  }

  handleEditSuccess = () => {
    this.setState({ editPlotSuccess: true });
  };

  handleEditFailure = error => {
    this.setState({ editPlotFailure: true });
    if (error.response) {
      if (error.response.status == 402) {
        this.setState({ signOutAfterClose: true });
      }
    }
  };

  closeFailureDialog = () => {
    this.setState({ editPlotFailure: false });
    if (this.state.signOutAfterClose) {
      this.props.signOut();
    }
  };

  render() {
    const successActions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={() => this.setState({ editPlotSuccess: false })}
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
        <EditPlotForm
          handleEditSuccess={this.handleEditSuccess}
          handleEditFailure={this.handleEditFailure}
          {...this.props}
        />
        <Dialog
          actions={successActions}
          modal={false}
          open={this.state.editPlotSuccess}
          onRequestClose={() => this.setState({ editPlotSuccess: false })}
        >
          Plot successfully edited.
        </Dialog>
        <Dialog
          actions={failActions}
          modal={false}
          open={this.state.editPlotFailure}
          onRequestClose={this.closeFailureDialog}
        >
          {this.state.signOutAfterClose
            ? `Session expired. Please sign in and try again.`
            : `Failed to edit plot.`}
        </Dialog>
      </Card>
    );
  }
}

export default EditPlot;
