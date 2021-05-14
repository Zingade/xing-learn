import React from "react";
import { connect } from "react-redux";


function Dashboard({ darkTheme }) {
    return (
        <h1>Dashboard</h1>
    );
}

const mapStateToProps = (state) => {
  return {
    darkTheme: state.ui.darkTheme,
  };
};
  
export default connect(mapStateToProps)(Dashboard);
