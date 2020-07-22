import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Drawer from "./Drawer";
import Account from "./Account";
import Map from "./Map";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      id: "",
      username: ""
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

  signOut = () => {
    this.setState({ token: "", id: "" });
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Account
              token={this.state.token}
              username={this.state.username}
              updateToken={this.updateToken}
              signOut={this.signOut}
            />
            <div>
              <Map
                token={this.state.token}
                id={this.state.id}
                signOut={this.signOut}
              />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
