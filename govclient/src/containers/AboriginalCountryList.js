import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { getAboriginalCountries, deleteAboriginalCountry } from "../actions";
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
import { Link } from "react-router-dom";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";

class AboriginalCountryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletingAboriginalCountry: false,
      targetDeleteAboriginalCountry: null
    };
  }

  componentDidMount() {
    this.props.getAboriginalCountries();
  }

  render() {
    const deleteActions = [
      <FlatButton
        label="Confirm"
        primary={true}
        onClick={() => {
          this.setState({ deletingAboriginalCountry: false });
          this.props.deleteAboriginalCountry(
            this.state.targetDeleteAboriginalCountry._id,
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
            deletingAboriginalCountry: false
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
          open={this.state.deletingAboriginalCountry}
          onRequestClose={() =>
            this.setState({ deletingAboriginalCountry: false })
          }
        >
          Are you sure you want to delete this Aboriginal country?
        </Dialog>
      </div>
    );
  }

  renderTable() {
    return (
      <Table fixedHeader={true} selectable={true} height={"600px"}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn colSpan="3" style={{ textAlign: "center" }}>
              Aboriginal Countries
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn>Aboriginal Country ID</TableHeaderColumn>
            <TableHeaderColumn>Aboriginal Country Name</TableHeaderColumn>
            <TableHeaderColumn>Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          showRowHover={true}
          stripedRows={true}
          displayRowCheckbox={false}
        >
          {this.renderList()}
        </TableBody>
      </Table>
    );
  }

  renderList() {
    const { history } = this.props;
    if (_.isEmpty(this.props.AboriginalCountryResult)) {
      return (
        <TableRow>
          <TableHeaderColumn colSpan="3" style={{ textAlign: "center" }}>
            No aboriginal countries.
          </TableHeaderColumn>
        </TableRow>
      );
    }

    return _.map(this.props.AboriginalCountryResult, AboriginalCountry => {
      return (
        <TableRow key={AboriginalCountry._id}>
          <TableRowColumn>{AboriginalCountry._id}</TableRowColumn>
          <TableRowColumn>
            {AboriginalCountry.aboriginalCountryName}
          </TableRowColumn>
          <TableRowColumn>
            <RaisedButton
              label="Edit"
              primary={true}
              onClick={() =>
                this.selectAboriginalCountry(AboriginalCountry, history)
              }
            />
            <RaisedButton
              label="Delete"
              secondary={true}
              onClick={event => {
                this.setState({
                  deletingAboriginalCountry: true,
                  targetDeleteAboriginalCountry: AboriginalCountry
                });
              }}
            />
          </TableRowColumn>
        </TableRow>
      );
    });
  }

  selectAboriginalCountry = (AboriginalCountry, history) => {
    history.push(`/editAboriginalCountry/${AboriginalCountry._id}`);
  };
}

function mapStateToProps(state) {
  return {
    AboriginalCountryResult: state.mapdata.aboriginalCountries
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getAboriginalCountries: getAboriginalCountries,
      deleteAboriginalCountry: deleteAboriginalCountry
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboriginalCountryList);
