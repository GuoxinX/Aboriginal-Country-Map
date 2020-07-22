import React, { Component } from "react";
import AddPlotForm from "../containers/AddPlotForm";
import { Card, CardTitle } from "material-ui/Card";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import Typography from "@material-ui/core/Typography";

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

class AddPlot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addPlotSuccess: false,
      addPlotFailure: false,
      signOutAfterClose: false
    };
  }

  handleAddSuccess = () => {
    this.setState({ addPlotSuccess: true });
  };

  handleAddFailure = error => {
    this.setState({ addPlotFailure: true });
    if (error.response) {
      if (error.response.status == 402) {
        this.setState({ signOutAfterClose: true });
      }
    }
  };

  closeFailureDialog = () => {
    this.setState({ addPlotFailure: false });
    if (this.state.signOutAfterClose) {
      this.props.signOut();
    }
  };

  render() {
    const successActions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={() => this.setState({ addPlotSuccess: false })}
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
        <AddPlotForm
          handleAddSuccess={this.handleAddSuccess}
          handleAddFailure={this.handleAddFailure}
          signOut={this.props.signOut}
          token={this.props.token}
          id={this.props.id}
        />
        <Dialog
          actions={successActions}
          modal={false}
          open={this.state.addPlotSuccess}
          onRequestClose={() => this.setState({ addPlotSuccess: false })}
        >
          Plot successfully added.
        </Dialog>
        <Dialog
          actions={failActions}
          modal={false}
          open={this.state.addPlotFailure}
          onRequestClose={this.closeFailureDialog}
        >
          {this.state.signOutAfterClose
            ? `Session expired. Please sign in and try again.`
            : `Failed to add plot.`}
        </Dialog>
      </Card>
    );
  }
}

export default AddPlot;
