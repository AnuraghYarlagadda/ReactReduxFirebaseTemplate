import React from "react";
import { Route, Switch } from "react-router-dom";
import Alert from "../layout/Alert";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../dashboard/Dashboard";
import Login from "../auth/Login";
import Register from "../auth/Register";
import NotFound from "../layout/NotFound";

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
