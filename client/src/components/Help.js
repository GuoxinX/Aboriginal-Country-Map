import React, { Component } from "react";
import {
  Card,
  CardContent,
  Input,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Divider,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
  MenuItem,
  MenuList,
  Button
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles
} from "@material-ui/core/styles";

const textStyle = {
  backgroundColor: "#3F51B5",
  color: "white",
  marginBottom: 0,
  fontSize: "35px",
  paddingLeft: "20px"
};

const gridStyle = {
  marginTop: 15
};

const paperStyle = {
  margin: 0,
  paddingTop: 0,
  paddingBottom: 158
};

const styles = theme => ({
  dialog: {},
  root: {
    width: "100%",
    height: "100%"
  },

  helpMenu: {
    flex: 2
  },
  helpContent: {
    height: "50%"
  },

  menuItem: {
    "&:focus": {
      backgroundColor: "SkyBlue",
      "& $primary, & $icon": {
        color: theme.palette.common.white
      }
    }
  }
});

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "introduction"
    };
  }

  render() {
    const { open, onClose } = this.props;
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={typographyV1Theme}>
        <Dialog
          onClose={onClose}
          open={open}
          classes={{ paper: classes.dialog }}
        >
          <Typography style={textStyle}>Help</Typography>
          <Grid container wrap="nowrap" spacing={16} className={classes.root}>
            <Grid item>
              <MenuList>
                <Paper style={paperStyle}>
                  <MenuItem
                    className={classes.menuItem}
                    onClick={() => this.setState({ content: "introduction" })}
                  >
                    Introduction
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    className={classes.menuItem}
                    onClick={() => this.setState({ content: "navigation" })}
                  >
                    Map Navigation
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    className={classes.menuItem}
                    onClick={() => this.setState({ content: "search" })}
                  >
                    Search
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    className={classes.menuItem}
                    onClick={() => this.setState({ content: "account" })}
                  >
                    Accounts
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    className={classes.menuItem}
                    onClick={() => this.setState({ content: "print" })}
                  >
                    Print Map
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    className={classes.menuItem}
                    onClick={() => this.setState({ content: "bookmarks" })}
                  >
                    Bookmarks
                  </MenuItem>
                  <Divider />
                </Paper>
              </MenuList>
            </Grid>
            {this.renderContent()}
          </Grid>
          <Paper>
            <DialogActions>
              <Button
                color="primary"
                target="_blank"
                href="https://www.dpc.wa.gov.au/LANTU/WHATISNATIVETITLE/Pages/FAQs.aspx"
              >
                Native Titles Information
              </Button>
              <Divider />
              <Button color="primary" onClick={onClose}>
                Return to Map
              </Button>
            </DialogActions>
          </Paper>
        </Dialog>
      </MuiThemeProvider>
    );
  }

  renderContent() {
    let content = null;
    if (this.state.content === "introduction") {
      content = this.renderIntroduction();
    } else if (this.state.content === "navigation") {
      content = this.renderNavigation();
    } else if (this.state.content === "search") {
      content = this.renderSearch();
    } else if (this.state.content === "print") {
      content = this.renderPrint();
    } else if (this.state.content === "bookmarks") {
      content = this.renderBookmarks();
    } else if (this.state.content === "account") {
      content = this.renderAccount();
    }

    return content;
  }

  renderIntroduction() {
    return (
      <Grid item zeroMinWidth className={this.props.classes.helpContent}>
        <Typography style={gridStyle} variant="title">
          Native Title
        </Typography>

        <Typography variant="body1">
          This application is an interactive map that provides information on
          plots of land with Native Titles. For more information on Native
          Titles please click on the "Native Titles Information" button below.
        </Typography>
      </Grid>
    );
  }

  renderNavigation() {
    return (
      <Grid item zeroMinWidth className={this.props.classes.helpContent}>
        <Typography style={gridStyle} variant="title">
          Zoom In/Out
        </Typography>

        <Typography variant="body1" paragraph={true}>
          Click on the "+" symbol on the bottom right corner to zoom in, and "-"
          symbol to zoom out. For finer control, you can also scroll up on the
          mouse wheel to zoom in, and down to zoom out.
        </Typography>
        <Typography variant="title">Panning</Typography>

        <Typography variant="body1" paragraph={true}>
          Hold down the left mouse button and drag to move the map.
          Alternatively, click anywhere on the map and press the the directional
          arrow keys to move the map.
        </Typography>
      </Grid>
    );
  }

  renderSearch() {
    return (
      <Grid item zeroMinWidth className={this.props.classes.helpContent}>
        <Typography style={gridStyle} variant="title">
          Making a Search
        </Typography>

        <Typography variant="body1" paragraph={true}>
          Click on the search bar near the top of the screen and type in your
          search term. This feature supports searching by plot ID, plot address,
          suburb names, Aboriginal place names as well as general addresses and
          locations.
        </Typography>
        <Typography variant="title">Drop-down Suggestions</Typography>

        <Typography variant="body1" paragraph={true}>
          As you type in your search term, a list of suggestions will drop down
          from the search bar. Click on one of the suggestions to automatically
          zoom in on that location.
        </Typography>

        <Typography style={gridStyle} variant="title">
          Storing History
        </Typography>

        <Typography variant="body1" paragraph={true}>
          Your searches will be automatically saved to a list. The maximum
          number of saved entries is 20.
        </Typography>
      </Grid>
    );
  }

  renderAccount() {
    return (
      <Grid item zeroMinWidth className={this.props.classes.helpContent}>
        <Typography style={gridStyle} variant="title">
          Registering
        </Typography>

        <Typography variant="body1" paragraph={true}>
          To register an account, click on the Register button on the top right
          corner. Type in your preferred username in the username field, and
          your password in the password field, and again in the confirm password
          field. Click submit to finish. In the case that registration fails,
          please try again with a different username.
        </Typography>
        <Typography variant="title">Login</Typography>

        <Typography variant="body1" paragraph={true}>
          To login to your account, click on the Login button on the top right
          corner. Type in your registered username and password, and click
          submit to finish. If you do no have an account, please refer to the
          above on how to register one.
        </Typography>

        <Typography variant="title">Sign Out</Typography>

        <Typography variant="body1" paragraph={true}>
          Once you have finished with your session, click the sign out button on
          the top right. This will remove your bookmarks and search history from
          the session.
        </Typography>
      </Grid>
    );
  }
  renderBookmarks() {
    return (
      <Grid item zeroMinWidth className={this.props.classes.helpContent}>
        <Typography style={gridStyle} variant="title">
          Adding Bookmarks
        </Typography>

        <Typography variant="body1" paragraph={true}>
          You can add any number of plots to your list of bookmarks. To do so,
          simply login, select a plot and click the "Add to bookmarks" button.
        </Typography>
        <Typography variant="title">Viewing Bookmarks</Typography>

        <Typography variant="body1" paragraph={true}>
          To view your list of bookmarks, scroll down on the left drawer and
          click on the Bookmarks tab. From here, you can search any bookmarks
          stored and view their details by clicking on the corresponding
          magnifying glass icon.
        </Typography>

        <Typography variant="title">Deleting Bookmarks</Typography>

        <Typography variant="body1" paragraph={true}>
          You can also delete bookmarks by clicking on the corresponding bin
          icon, or with the "Delete bookmark" button when viewing the details of
          a bookmarked plot.
        </Typography>
      </Grid>
    );
  }

  renderPrint() {
    return (
      <Grid item zeroMinWidth className={this.props.classes.helpContent}>
        <Typography style={gridStyle} variant="title">
          Print Map
        </Typography>

        <Typography variant="body1" paragraph={true}>
          To print the map, adjust the map so the contents you wish to have on
          the page is on the screen. Then click on the "Print Page" button on
          the left drawer to open the print page. It is recommended to print the
          map with landscape layout.
        </Typography>
      </Grid>
    );
  }
}

function typographyV1Theme(theme) {
  return createMuiTheme({
    ...theme,
    typography: {
      suppressDeprecationWarnings: true,
      useNextVariants: true
    }
  });
}

export default withStyles(styles)(Help);
