import React from "react";
import {openSidebar, drawOpen, drawClose} from "../../Redux/UI/UiAction";
import { CssBaseline } from "@material-ui/core";
import { makeStyles, responsiveFontSizes } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import { connect } from "react-redux";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Appbar from "../../components/Navigation/Appbar/Appbar";

const UserLayout = (props) => {
    const { sideOpen, sideDraw, darkTheme } = props;
    const { onSideOpen, onDrawOpen, onDrawclose } = props;
    const localTheme = JSON.parse(localStorage.getItem("darkTheme"));
  
    let isTheme = darkTheme;
    if (!darkTheme) {
      isTheme = localTheme;
    }
  
    const theme = responsiveFontSizes(
      createMuiTheme({
        palette: {
          type: isTheme ? "dark" : "light",
        },
        mixins: {
          toolbar: {
            height: 56,
          },
        },
      })
    );
  
    const useStyles = makeStyles((theme) => ({
      root: {
        display: "flex",
      },
      toolbar: {
        marginBottom: 48,
      },
      content: {
        flexGrow: 1,
        overflow: "hidden",
        paddingTop: theme.spacing(1),
      },
    }));
  
    const classes = useStyles();
  
    return (
      <ThemeProvider theme={theme}>
        <SnackbarProvider preventDuplicate maxSnack={3}>
          <div className={classes.root}>
            <CssBaseline />
            <Appbar
              openToggleClicked={onSideOpen}
              drawerToggleClicked={onDrawOpen}
            />
            <SideDrawer
              openSidebar={sideOpen}
              drawSidebar={sideDraw}
              open={onDrawOpen}
              close={onDrawclose}
            />
            <main className={classes.content}>
              <div className={classes.toolbar} />
              {props.children}
            </main>
          </div>
          <footer className="footer">
            xingSoft - Alright reserved.
          </footer>
        </SnackbarProvider>
      </ThemeProvider>
    );
  }

const mapStateToProps = (state) => {
    return {
      sideOpen: state.ui.sideOpen,
      sideDraw: state.ui.sideDraw,
      darkTheme: state.ui.darkTheme,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onSideOpen: () => dispatch(openSidebar()),
      onDrawOpen: () => dispatch(drawOpen()),
      onDrawclose: () => dispatch(drawClose()),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(UserLayout);
  