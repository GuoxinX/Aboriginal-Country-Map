import React from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";

class Bookmarks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { bookmarks } = this.props;

    const plotTable = bookmarks.map(row => {
      return (
        <TableRow key={row.properties[0]._id}>
          <TableCell>{row.properties[0].plotID}</TableCell>
          <TableCell>{row.properties[0].address}</TableCell>
          <TableCell>
            <IconButton
              onClick={() => this.props.makeSearch(row.properties[0].plotID)}
            >
              <SearchIcon />
            </IconButton>
          </TableCell>
          <TableCell>
            <IconButton
              onClick={() => this.props.deleteBookmark(row.properties[0])}
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });

    return (
      <Table padding="dense">
        <TableHead>
          <TableRow>
            <TableCell>Plot ID</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Search again</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{plotTable}</TableBody>
      </Table>
    );
  }
}

export default Bookmarks;
