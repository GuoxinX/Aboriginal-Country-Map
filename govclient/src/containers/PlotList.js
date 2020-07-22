import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { getPlots, deletePlot } from "../actions";
import { bindActionCreators } from "redux";
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";

class PlotList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletingPlot: false,
      targetDeletePlot: null
    };
  }

  componentDidMount() {
    this.props.getPlots();
  }

  render() {
    const deleteActions = [
      <FlatButton
        label="Confirm"
        primary={true}
        onClick={() => {
          this.setState({ deletingPlot: false });
          this.props.deletePlot(
            this.state.targetDeletePlot.plot_ID,
            this.props.token,
            this.props.id,
            null,
            error => {
              if (error.response) {
                if (error.response.status == 402) {
                  this.props.signOut();
                }
              }
            }
          );
        }}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => {
          this.setState({
            deletingPlot: false
          });
        }}
      />
    ];
    return (
      <div>
        {this.renderTable()}
        <Dialog
          actions={deleteActions}
          modal={false}
          open={this.state.deletingPlot}
          onRequestClose={() => this.setState({ deletingPlot: false })}
        >
          Are you sure you want to delete this plot?
        </Dialog>
      </div>
    );
  }

  renderTable() {
    return (
      <Table fixedHeader={true} selectable={true} height={"600px"}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn colSpan="6" style={{ textAlign: "center" }}>
              Plots
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn>Plot ID</TableHeaderColumn>
            <TableHeaderColumn>Native Title</TableHeaderColumn>
            <TableHeaderColumn>Owner</TableHeaderColumn>
            <TableHeaderColumn>Aboriginal Place Name</TableHeaderColumn>
            <TableHeaderColumn>Hearing Year</TableHeaderColumn>
            <TableHeaderColumn>Address</TableHeaderColumn>
            <TableHeaderColumn>Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          showRowHover={true}
          stripedRows={true}
          displayRowCheckbox={false}
        >
          {this.renderRows()}
        </TableBody>
      </Table>
    );
  }

  renderRows() {
    const { history } = this.props;
    if (_.isEmpty(this.props.plotResult)) {
      return (
        <TableRow>
          <TableHeaderColumn colSpan="7" style={{ textAlign: "center" }}>
            No plots.
          </TableHeaderColumn>
        </TableRow>
      );
    }

    return _.map(this.props.plotResult, plot => {
      var addressString;
      // if (plot.properties.address.length < 15) {
      addressString = plot.properties.address;
      // } else {
      //   addressString = plot.properties.address.substring(0, 12) + "...";
      // }

      return (
        <TableRow key={plot.plot_ID}>
          <TableRowColumn>{plot.plot_ID}</TableRowColumn>
          <TableRowColumn>{plot.properties.nativeTitle}</TableRowColumn>
          <TableRowColumn>{plot.properties.owner}</TableRowColumn>
          <TableRowColumn>{plot.properties.aboriginalPlaceName}</TableRowColumn>
          <TableRowColumn>{plot.properties.hearingYear}</TableRowColumn>
          <TableRowColumn>{addressString}</TableRowColumn>
          <TableRowColumn>
            <RaisedButton
              label="Edit"
              primary={true}
              onClick={() => this.selectPlot(plot, history)}
            />
            <RaisedButton
              label="Delete"
              secondary={true}
              onClick={event => {
                this.setState({
                  deletingPlot: true,
                  targetDeletePlot: plot
                });
              }}
            />
          </TableRowColumn>
        </TableRow>
      );
    });
  }

  selectPlot = (plot, history) => {
    history.push(`/editPlot/${plot.plot_ID}`);
  };
}

function mapStateToProps(state) {
  return {
    plotResult: state.mapdata.plots
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getPlots: getPlots,
      deletePlot: deletePlot
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlotList);
