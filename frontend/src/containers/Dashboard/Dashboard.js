import React, {Fragment} from "react";
import { connect } from "react-redux";
import AdminScreen from '../../pages/AdminScreen'
import UserScreen from '../../pages/UserScreen'

function Dashboard({ darkTheme }) {
  const userInfoJSON = localStorage.getItem('userInfo');
  let userInfo = JSON.parse(userInfoJSON) || null;

  return (
    <Fragment>
      {(userInfo && userInfo.isAdmin)?<AdminScreen/>:<UserScreen/>}
    </Fragment>
    );
}

const mapStateToProps = (state) => {
  return {
    darkTheme: state.ui.darkTheme,
  };
};
  
export default connect(mapStateToProps)(Dashboard);
