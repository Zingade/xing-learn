import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Dashboard from './containers/dashboard/dashboard'
import KannadaSwar from './components/Kannada/KannadaSwar'
import UserLayout from "./hoc/Layout/UserLayout";

const RouteUser = ({ Component, ...props }) => {
  return (
    <Route
      {...props}
      render={() => (<>
        <UserLayout>
          <Component />
        </UserLayout>
        </>
      )}
    />
  );
};


function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        {/* With Layout */}
        <RouteUser path="/" exact Component={KannadaSwar} />
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
