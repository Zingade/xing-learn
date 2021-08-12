import React, { useState, Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { Menu, Box, useMediaQuery } from "@material-ui/core";
import { Button, ButtonGroup, IconButton } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import MoreIcon from "@material-ui/icons/MoreVert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ArchiveIcon from "@material-ui/icons/Archive";

import DarkThemeSwitch from "../../SwitchButton/DarkThemeSwitch";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { logout } from "../../../Redux/User/UserAction";
import { withRouter } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "none",
  },
  marginLeft: {
    marginLeft: theme.spacing(1),
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const DropMenu = (props) => {
  const classes = useStyles();

  const { darkTheme } = props;
  const matchMD = useMediaQuery("(min-width:960px)");
  const localTheme = JSON.parse(localStorage.getItem("darkTheme"));
  const dispatch = useDispatch();

  const userInfoJSON = localStorage.getItem('userInfo');
  let userInfo = JSON.parse(userInfoJSON) || null;
  
  let isTheme = darkTheme;
  if (!darkTheme) {
    isTheme = localTheme;
  }
  
  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/");
  }

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(false);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const menuRender = userInfo ? (
    <Box
      display="flex"
      flexDirection={matchMD ? "row" : "column-reverse"}
      alignItems="center"
      minWidth={matchMD ? 0 : 180}
    >
      <Box m={matchMD ? 0 : 1}>
        <Button
          disableElevation
          color="primary"
          variant="contained"
          size="small"
          startIcon={<ExitToAppIcon />}
          className={classes.button}
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </Box>
      <Box my={matchMD ? 0 : 1} ml={matchMD ? 1 : 0}>
        <Button
          disableElevation
          color="default"
          variant={isTheme ? "outlined" : "contained"}
          size="small"
          startIcon={<ArchiveIcon />}
          className={classes.button}
          component={Link}
          to={"/my-courses"}
        >
          My Courses
        </Button>
      </Box>
      <Box m={matchMD ? 0 : 1}>
        <DarkThemeSwitch />
      </Box>
    </Box>
  ) : (
    <Box
      display="flex"
      flexDirection={matchMD ? "row" : "column"}
      alignItems="center"
      m={matchMD ? 0 : 1}
      minWidth={matchMD ? 0 : 180}
    >
      <Box m={matchMD ? 0 : 1}>
        <DarkThemeSwitch />
      </Box>
      <ButtonGroup disableElevation variant="contained" size="small">
        <Button
          color="primary"
          startIcon={<VpnKeyIcon />}
          component={Link}
          to={"/login"}
          className={classes.button}
        >
          Login
        </Button>
        <Button
          color="default"
          startIcon={<PersonAddIcon />}
          component={Link}
          to={"/register"}
          className={classes.button}
        >
          Sign Up
        </Button>
      </ButtonGroup>
    </Box>
  );

  return (
    <Fragment>
      <div className={classes.sectionDesktop}>{menuRender}</div>

      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-controls="menu-mobile"
          aria-haspopup="true"
          onClick={(e) => setMobileMoreAnchorEl(e.currentTarget)}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </div>

      {/* Collapse menu */}
      <Menu
        anchorEl={mobileMoreAnchorEl}
        id="menu-mobile"
        keepMounted
        open={isMobileMenuOpen}
        onClose={() => setMobileMoreAnchorEl(false)}
      >
        {menuRender}
      </Menu>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    darkTheme: state.ui.darkTheme,
//    isAuthenticated: state.user.values.isAuthenticated,
  };
};

export default connect(mapStateToProps)(withRouter(DropMenu));
