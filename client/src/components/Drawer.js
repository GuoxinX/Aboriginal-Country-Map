import React from "react";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Button from "@material-ui/core/ButtonBase";
import IconButton from "@material-ui/core/IconButton";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import PrintIcon from "@material-ui/icons/Print";
import HelpIcon from "@material-ui/icons/Help";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Bookmarks from "./Bookmarks";
import Help from "./Help";
import SearchHistory from "./SearchHistory";
import _ from "lodash";

import {
  Divider,
  Paper,
  Snackbar,
  TableCell,
  TableRow,
  Tab,
  Tabs,
  Typography
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  deleteHistory,
  getBookmarks,
  addBookmark,
  deleteBookmark
} from "../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const failure = "Failed, please try again later";
const drawerWidth = 400;

const textStyle = {
  color: "#3F51B5",
  fontSize: "20px"
};

const textStyle1 = {
  textAlign: "center",
  backgroundColor: "#3F51B5",
  color: "white",
  fontSize: "30px",
  marginBottom: "0px",
  WebkitBorderRadius: 5,
  MozBorderRadius: 5,
  borderRadius: 5
};

const buttonStyle = {
  backgroundColor: "#3F51B5",
  border: "none",
  color: "white",
  width: 120,
  height: 35,
  WebkitBorderRadius: 5,
  MozBorderRadius: 5,
  borderRadius: 5,
  textAlign: "center",
  textDecoration: "none",
  display: "block",
  margin: "auto",
  fontSize: 16,
  cursor: "pointer"
};

const buttonStyle1 = {
  backgroundColor: "#3F51B5",
  border: "none",
  color: "white",
  width: 120,
  height: 35,
  WebkitBorderRadius: 5,
  MozBorderRadius: 5,
  borderRadius: 5,
  textAlign: "center",
  textDecoration: "none",
  display: "block",
  margin: "auto",
  fontSize: 16,
  cursor: "pointer",
  marginTop: "10px"
};

const listStyle = {
  paddingTop: 0
};

const paperStyle = {
  margin: 8
};

const paperStyle1 = {
  marginTop: 8,
  marginLeft: 8,
  marginRight: 8,
  marginBottom: 0,
  paddingBottom: 7,
  WebkitBorderRadius: 5,
  MozBorderRadius: 5,
  borderRadius: 5
};

const paperStyle2 = {
  marginTop: 0,
  marginLeft: 8,
  marginRight: 8,
  marginBottom: 8,
  paddingBottom: 8
};

const paperStyle3 = {
  marginTop: 8,
  marginLeft: 8,
  marginRight: 8,
  marginBottom: 0,
  WebkitBorderRadius: 5,
  MozBorderRadius: 5,
  borderRadius: 5
};

const styles = theme => ({
  drawerButton: {
    zIndex: 100,
    backgroundColor: "white",
    width: 24,
    height: 48,
    top: 10
  },

  drawerButtonShift: {
    left: drawerWidth
  },

  drawerBG: {
    zIndex: 2,
    backgroundColor: "white",
    width: drawerWidth,
    marginLeft: 0,
    marginBottom: 10
  },

  root: {
    width: "100%"
  },

  search: {
    width: drawerWidth
  },

  yellow: {
    borderColor: "gold"
  },

  BGYellow: {
    backgroundColor: "gold"
  },

  help: {
    height: "100%"
  },

  table: {
    width: 200,
    backgroundColor: "gold"
  }
});

class appDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      openHelp: false,
      tabState: 0,
      bookmarks: [],
      openSnack: false,
      snackMessage: "test",
      plotInBookmarks: false
    };
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.token !== prevProps.token &&
      this.props.token !== "" &&
      this.props.id !== ""
    ) {
      this.handleGetBookmarks(() => {}, () => {});
    }

    if (this.props.plot !== prevProps.plot) {
      console.log("changed");
      this.setState({
        plotInBookmarks: this.plotInBookmarks()
      });
    }

    if (
      this.props.token !== prevProps.token &&
      this.props.token === "" &&
      this.props.id === ""
    ) {
      this.setState({ bookmarks: [] });
    }
  }

  handleHelpClick = () => {
    this.setState({ openHelp: true });
  };

  handleHelpClose = () => {
    this.setState({ openHelp: false });
  };

  handleTabChange = (event, tabState) => {
    this.setState({ tabState });
  };

  handleGetBookmarks = callback => {
    this.props.getBookmarks(
      { token: this.props.token, id: this.props.id },
      bookmarkCallback => {
        this.storeBookmarks(bookmarkCallback);
        this.setState({
          plotInBookmarks: this.plotInBookmarks()
        });
        callback();
      },
      () => {
        this.openSnack(failure);
      }
    );
  };

  storeBookmarks = callback => {
    const newBookmarks = [];
    console.log(_.reverse(callback.data.plots));
    console.log(callback.data.plots);
    _.forEach(_.reverse(callback.data.plots), function(value) {
      newBookmarks.push(value);
    });
    this.setState({
      bookmarks: newBookmarks
    });
  };

  handleAddBookmark = properties => {
    this.props.addBookmark(
      { token: this.props.token, id: this.props.id, plotID: properties.plotID },
      () => {
        this.handleGetBookmarks(() => {});
        this.openSnack("Bookmark added!");
      },
      () => {
        this.openSnack(failure);
      }
    );
  };

  handleDeleteHistory = properties => {
    this.props.handleDeleteHistory(
      properties,
      () => {
        this.openSnack("History deleted!");
      },
      () => {
        this.openSnack(failure);
      }
    );
  };

  handleDeleteBookmark = properties => {
    this.props.deleteBookmark(
      { token: this.props.token, id: this.props.id, plotID: properties.plotID },
      () => {
        this.handleGetBookmarks(() => {});
        this.openSnack("Bookmark deleted!");
      },
      () => {
        this.openSnack(failure);
      }
    );
  };

  openSnack = message => {
    this.setState({
      snackMessage: message,
      openSnack: true
    });
  };

  plotInBookmarks = () => {
    const plotID = this.props.plot.plotID;
    let value;
    for (value in this.state.bookmarks) {
      if (this.state.bookmarks[value].properties[0].plotID === plotID) {
        return true;
      }
    }
    return false;
  };

  addDeleteBookmark = properties => {
    if (this.plotInBookmarks()) {
      this.handleDeleteBookmark(properties);
    } else {
      this.handleAddBookmark(properties);
    }
  };

  renderBookmarkButton() {
    return (
      <Button
        style={buttonStyle}
        disabled={
          this.props.plot.plotID === "To begin, select a plot" ||
          this.props.token === ""
        }
        onClick={() => this.addDeleteBookmark(this.props.plot)}
      >
        {(this.props.token === "" && "Login to add bookmark") ||
          (this.props.plot.plotID === "To begin, select a plot" &&
            "Please select a Plot") ||
          (this.plotInBookmarks() && "Delete from bookmarks") ||
          "Add to bookmarks"}
      </Button>
    );
  }

  render() {
    const { classes, open, plot } = this.props;

    const { tabState } = this.state;

    return (
      <div className={classes.root}>
        <Help open={this.state.openHelp} onClose={this.handleHelpClose} />

        <Button
          className={classNames(classes.drawerButton, {
            [classes.drawerButtonShift]: open
          })}
          onClick={this.props.toggleDrawer}
        >
          {open && <ArrowLeftIcon />}
          {!open && <ArrowRightIcon />}
        </Button>

        <Drawer
          variant="persistent"
          classes={{
            paper: classes.drawerBG
          }}
          open={open}
        >
          <div>
            <Paper style={paperStyle} square={true}>
              <List style={textStyle}>
                <ListItem button onClick={this.handlePrintClick}>
                  <ListItemIcon style={textStyle}>
                    <PrintIcon />
                  </ListItemIcon>
                  <Typography style={textStyle}>Print page</Typography>
                </ListItem>
                <Divider />

                <ListItem button onClick={this.handleHelpClick}>
                  <ListItemIcon style={textStyle}>
                    <HelpIcon />
                  </ListItemIcon>
                  <Typography style={textStyle}>Help page</Typography>
                </ListItem>
              </List>
            </Paper>

            <Paper style={paperStyle1} square={true}>
              <Typography style={textStyle1}>Selected Plot Info</Typography>
              <List style={listStyle}>
                <ListItem>
                  <ListItemText primary="Plot ID" secondary={plot.plotID} />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Address" secondary={plot.address} />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Native Title Agreement"
                    secondary={plot.nativeTitle}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Hearing Year"
                    secondary={plot.hearingYear}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Aboriginal Place Name"
                    secondary={plot.aboriginalPlaceName}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Owner" secondary={plot.owner} />
                </ListItem>
                <Divider />
                <Divider />
              </List>

              {this.renderBookmarkButton()}
            </Paper>
          </div>

          <div>
            <Paper style={paperStyle3} square={true}>
              <Tabs
                value={this.state.tabState}
                onChange={this.handleTabChange}
                fullWidth
                height="20px"
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab icon={<FavoriteIcon />} label="BOOKMARKS" />
                <Tab icon={<RestoreIcon />} label="SEARCH HISTORY" />
              </Tabs>
            </Paper>
            <Paper style={paperStyle2}>
              {tabState == 1 && (
                <SearchHistory
                  deleteHistory={this.handleDeleteHistory}
                  history={this.props.history}
                  makeSearch={this.props.makeSearch}
                />
              )}
              {tabState == 0 && (
                <Bookmarks
                  deleteBookmark={this.handleDeleteBookmark}
                  bookmarks={this.state.bookmarks}
                  makeSearch={this.props.makeSearch}
                />
              )}
            </Paper>
          </div>
        </Drawer>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={this.state.openSnack}
          autoHideDuration={6000}
          onClose={() => this.setState({ openSnack: false })}
          message={this.state.snackMessage}
        />
      </div>
    );
  }

  handlePrintClick = () => {
    window.print();
  };
}

appDrawer.propTypes = {
  toggleDrawer: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getBookmarks: getBookmarks,
      addBookmark: addBookmark,
      deleteBookmark: deleteBookmark,
      deleteHistory: deleteHistory
    },
    dispatch
  );
}

appDrawer = connect(
  mapStateToProps,
  mapDispatchToProps
)(appDrawer);

export default withStyles(styles)(appDrawer);
