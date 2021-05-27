import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Dashboard from './containers/Dashboard/Dashboard'
import CourseDetail from "./components/CourseList/CourseDetail/CourseDetail";
import KannadaSwar from './components/Kannada/KannadaSwar'
import UserLayout from "./hoc/Layout/UserLayout";
import Courses from "./containers/Courses/Courses";
import Auth from "./containers/Auth/Auth";

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
        <RouteUser path="/" exact Component={Dashboard} />
        <RouteUser path="/courses" exact Component={Courses} />
        <RouteUser path="/kannadaswar" exact Component={KannadaSwar} />
        <RouteUser path="/courses/:id" Component={CourseDetail} />
        <Route path="/sign-in" component={Auth} />
        <Route path="/sign-up" component={Auth} />
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
