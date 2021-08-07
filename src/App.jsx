import React, { Component } from "react";

import NavBar from "./Components/NavBar/NavBar";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Search from "./Components/Core/SearchPopup";
import NotFound from "./Components/NotFound";
import SearchRide from "./Components/Core/SearchRide";

class App extends Component {
  state = { user: {}, start: {}, end: {}, result: [] };

  componentDidMount = async () => {
    // vérifier le token et recupérer this.state.user
    // faire un endpoit dans le backend
  };

  handleUserLogin = (user) => {
    this.setState({ user });
  };

  render() {
    const { user } = this.state;
    const { username } = this.state.user;

    if (!localStorage.token) {
      return (
        <Switch>
          <Route
            path={"/login"}
            render={(props) => (
              <Login {...props} onLogin={this.handleUserLogin} />
            )}
          />
          <Route
            path={"/register"}
            render={(props) => <Register {...props} />}
          />
          <Redirect to="/login" />
          {/* <Route path={"/"} component={NotFound} /> */}
        </Switch>
      );
    }

    return (
      <React.Fragment>
        <NavBar username={username} />
        <main className="w-full h-full mt-2 rounded bg-gray-700 overflow-auto p-1 flex flex-col">
          <Switch>
            <Route
              path={"/search"}
              component={(props) => (
                <SearchRide
                  google={this.props.google}
                  center={{ lat: 18.5204, lng: 73.8567 }}
                  height="300px"
                  zoom={15}
                />
              )}
            />
            <Redirect exact path="/" to="/search" />
            <Route path={"/"} component={NotFound} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
