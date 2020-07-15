import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewJob from "./containers/NewJob";
import Jobcards from "./containers/Jobcards";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <UnauthenticatedRoute exact path="/login">
        <Login />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/signup">
        <Signup />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/jobcards/new">
        <NewJob />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/jobcards/:id">
        <Jobcards />
      </AuthenticatedRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}