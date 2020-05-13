import React from "react";
//Styles
import "../../public/styles.scss";
import store from "../store";
import { Provider } from "react-redux";
import { Router, Route } from "react-router-dom";
import history from "../history";

//Components
import Login from "./login/Login.jsx";
import HomePage from "../components/homepage/HomePage.jsx";
import Signup from "../components/signup/Signup.jsx";
import TeamPage from "../components/teams/TeamPage.jsx";
import BoardPage from "./boards/BoardPage.jsx";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path='/' exact component={HomePage} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/teams/pages/:id' exact component={TeamPage} />
          <Route path='/boards/pages/:id' exact component={BoardPage} />
        </Router>
      </Provider>
    );
  }
}
