import React, {Fragment} from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import CourseList from "../../components/CourseList/CourseList";


const useStyles = makeStyles((theme) => ({
  feature: {
    color: "white",
    minHeight: "20vh",
    position: "relative",
    background: `linear-gradient(120deg, #2980b9, #8e44ad)`,
  },
  topSwoop: {
    position: "absolute",
    top: "-2px",
  },
  bottomSwoop: {
    position: "absolute",
    bottom: "-2px",
    zIndex: 0,
  },
  intro: {
    position: "relative",
    background: `linear-gradient(120deg, #2980b9, #8e44ad)`,
    animation: `5s ease 0s infinite normal none running Gradient`,
    color: "white",
  },
}));


function Courses({ darkTheme }) {
  const classes = useStyles();

  const topSwoop = (
    <svg
      viewBox="0 0 1430 140"
      className={classes.topSwoop}
      fill={darkTheme ? "#303030" : "#fafafa"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1440 0v59.969c-65.287-39.594-188.865-55.343-370.736-47.248C766 26.221 627.87 140 277 140 171.698 140 79.365 124.417 0 93.25V0h1440z"></path>
    </svg>
  );
  const bottomSwoop = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1430 140"
      fill={darkTheme ? "#303030" : "#fafafa"}
      className={classes.bottomSwoop}
    >
      <path d="M0 140h1440V46.75C1360.635 15.583 1268.302 0 1163 0 812.13 0 674 113.78 370.736 127.279 188.866 135.374 65.286 119.625 0 80.03V140z"></path>
    </svg>
  );


  return (
    <Fragment>
      <Box pb={7} className={classes.feature}>
        <Box>{bottomSwoop}</Box>
      </Box>
      <CourseList />
      <Box className={classes.intro}>
      {topSwoop}
      <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          minHeight="30vh"
        >
        </Box>
      </Box>
    </Fragment>
    );
}

const mapStateToProps = (state) => {
  return {
    darkTheme: state.ui.darkTheme,
  };
};
  
export default connect(mapStateToProps)(Courses);
