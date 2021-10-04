import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../routers/Home.js";
import Auth from "../routers/Auth.js";
import Profile from "../routers/Profile.js";
import Navigation from "./Navigation";

const AppRouter = ({ isLogggedIn, userObj }) => {
  return (
    <Router>
      <Navigation />
      <Switch>
        {isLogggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
