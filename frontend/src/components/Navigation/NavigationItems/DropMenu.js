import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { Menu, Box, useMediaQuery } from "@material-ui/core";
import { Button, IconButton } from "@material-ui/core";

import LockIcon from "@material-ui/icons/LockOutlined"
import MoreIcon from "@material-ui/icons/MoreVert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ArchiveIcon from "@material-ui/icons/Archive";

import DarkThemeSwitch from "../../SwitchButton/DarkThemeSwitch";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { Tooltip } from "@material-ui/core";


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
  const { isAuthenticated, darkTheme } = props;
  const matchMD = useMediaQuery("(min-width:960px)");
  const localTheme = JSON.parse(localStorage.getItem("darkTheme"));

  let isTheme = darkTheme;
  if (!darkTheme) {
    isTheme = localTheme;
  }
  
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(false);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const menuRender = isAuthenticated ? (
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
          component={Link}
          to={"/logout"}
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
      <Tooltip title="Login">
        <Button
            startIcon={<LockIcon style={{ fontSize: 35, color:"skyblue" }}/>}
            component={Link}
            to={"/login"}
            className={classes.button}
          >
        </Button>
      </Tooltip>
      <Tooltip title="Register">
        <Button
          startIcon={<VpnKeyIcon style={{ fontSize: 35, color:"skyblue" }}/>}
          component={Link}
          to={"/register"}
          className={classes.button}
          >
        </Button>
      </Tooltip>
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
  };
};

export default connect(mapStateToProps)(DropMenu);
