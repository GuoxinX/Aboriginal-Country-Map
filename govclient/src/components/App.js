import React, { Component, Fragment } from "react";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import NavigationMenu from "material-ui/svg-icons/navigation/menu";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import Home from "./Home";
import ViewAboriginalCountries from "./ViewAboriginalCountries";
import EditAboriginalCountry from "./EditAboriginalCountry";
import EditPlot from "./EditPlot";
import PlotManager from "./PlotManager";
import AboriginalCountryManager from "./AboriginalCountryManager";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import AddAboriginalCountry from "./AddAboriginalCountry";
import AddPlot from "./AddPlot";
import Login from "./Login";
import Register from "./Register";
import "../style/App.css";

const SubheaderStyle = {
  fontSize: "35"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      token: "",
      id: ""
    };
  }

  componentDidMount() {
    var token = localStorage.getItem("token");
    var id = localStorage.getItem("id");

    if (token && id) {
      this.updateToken({ token: token, id: id });
    }
  }

  updateToken = callback => {
    this.setState({ token: callback.token, id: callback.id });
    localStorage.setItem("token", callback.token);
    localStorage.setItem("id", callback.id);
    // need to set ID too?
    console.log("id: " + this.state.id + "token: " + this.state.token);
  };

  handleToggle = () => this.setState({ open: !this.state.open });

  handleNestedListToggle = item => {
    this.setState({
      open: item.state.open
    });
  };

  signOut = () => {
    this.setState({ token: "", id: "", open: false });
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  };

  handleClose = () => this.setState({ open: false });

  render() {
    return (
      <div className="App">
        <AppBar
          title="Government Employee Application"
          style={{}}
          showMenuIconButton={this.state.token ? true : false}
          iconElementLeft={
            <IconButton onClick={this.handleToggle}>
              <NavigationMenu />
            </IconButton>
          }
        />
        <BrowserRouter>
          <div className="App-body">
            <div className="App-drawer">
              <Drawer
                open={this.state.open}
                docked={false}
                onRequestChange={open => this.setState({ open })}
              >
                <List>
                  <ListItem
                    key={1}
                    innerDivStyle={{
                      padding: "0px",
                      margin: "0px"
                    }}
                    disabled={true}
                  >
                    <Subheader style={SubheaderStyle}>
                      Manage Aboriginal countries
                    </Subheader>

                    <Divider />
                  </ListItem>

                  <ListItem
                    key={2}
                    primaryText="Add new aboriginal country"
                    onClick={this.handleClose}
                    containerElement={
                      <Link
                        to="/addAboriginalCountry"
                        style={{ textDecoration: "none" }}
                      />
                    }
                  />
                  <ListItem
                    key={3}
                    primaryText="View existing aboriginal countries"
                    onClick={this.handleClose}
                    containerElement={
                      <Link
                        to="/aboriginalCountries"
                        style={{ textDecoration: "none" }}
                      />
                    }
                  />
                  <ListItem
                    key={4}
                    innerDivStyle={{
                      padding: "0px",
                      margin: "0px"
                    }}
                    disabled={true}
                  >
                    <Divider />

                    <Subheader style={SubheaderStyle}>Manage plots</Subheader>

                    <Divider />
                  </ListItem>
                  <ListItem
                    key={5}
                    primaryText="Add new plot"
                    onClick={this.handleClose}
                    containerElement={
                      <Link to="/addPlot" style={{ textDecoration: "none" }} />
                    }
                  />
                  <ListItem
                    key={6}
                    primaryText="View existing plots"
                    onClick={this.handleClose}
                    containerElement={
                      <Link to="/plots" style={{ textDecoration: "none" }} />
                    }
                  />
                  <ListItem
                    key={7}
                    disabled={true}
                    innerDivStyle={{
                      padding: "0px",
                      margin: "0px"
                    }}
                  >
                    <Divider />
                  </ListItem>

                  <MenuItem onClick={this.signOut}>Sign Out</MenuItem>
                </List>
              </Drawer>
            </div>
            <Switch>
              {this.state.token ? <Redirect from="/login" to="/" /> : null}
              <Route
                exact
                path="/login"
                render={props => (
                  <Login
                    updateToken={this.updateToken}
                    {...props}
                    {...this.state}
                  />
                )}
              />
              <Route path="/register" component={Register} />
              {this.state.token ? (
                <Fragment>
                  <Route
                    path="/addAboriginalCountry"
                    render={props => (
                      <AddAboriginalCountry
                        signOut={this.signOut}
                        {...props}
                        {...this.state}
                      />
                    )}
                  />
                  <Route
                    path="/aboriginalCountries"
                    render={props => (
                      <AboriginalCountryManager
                        signOut={this.signOut}
                        {...props}
                        {...this.state}
                      />
                    )}
                  />
                  <Route
                    path="/addPlot"
                    render={props => (
                      <AddPlot
                        signOut={this.signOut}
                        {...props}
                        {...this.state}
                      />
                    )}
                  />
                  <Route
                    path="/plots"
                    render={props => (
                      <PlotManager
                        signOut={this.signOut}
                        {...props}
                        {...this.state}
                      />
                    )}
                  />
                  <Route
                    path="/editAboriginalCountry/:id"
                    render={props => (
                      <EditAboriginalCountry
                        signOut={this.signOut}
                        {...props}
                        {...this.state}
                      />
                    )}
                  />
                  <Route
                    path="/editPlot/:id"
                    render={props => (
                      <EditPlot
                        signOut={this.signOut}
                        {...props}
                        {...this.state}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/"
                    render={props => (
                      <Home signOut={this.signOut} {...props} {...this.state} />
                    )}
                  />
                </Fragment>
              ) : (
                <Redirect from="/" to="/login" />
              )}
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
