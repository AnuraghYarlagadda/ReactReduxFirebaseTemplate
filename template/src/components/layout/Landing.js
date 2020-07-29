import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "./Alert";
import NavBar from "./NavBar";
import Home from "./Home";
import PrivateRoute from "../routing/PrivateRoute";
import NotFound from "./NotFound";

const Landing = ({ auth: { uid, isLoaded } }) => {
  //If Loading Show Spinner
  if (!isLoaded) {
    return (
      <div className="text-center">
        <CircularProgress size="5rem" color="secondary" />
      </div>
    );
  } else if (uid) {
    return <NavBar />;
  }

  return (
    <section>
      <Alert />
      <Switch>
        <Route exact path="/" component={Home} />

        <PrivateRoute component={NotFound} />
      </Switch>
    </section>
  );
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
});

export default connect(mapStateToProps, {})(Landing);
