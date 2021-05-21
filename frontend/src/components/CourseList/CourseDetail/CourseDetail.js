import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Grid, useMediaQuery } from "@material-ui/core";
import CourseTabs from "./CourseTabs/CourseTabs";

const useStyles = makeStyles((theme) => ({
  position: {
    marginTop: "5%",
    [theme.breakpoints.up("md")]: {
      position: "fixed",
      marginTop: "8%",
      marginLeft: "5%",
    },
  },
  chipBox: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

function CourseDetail(props) {
  const classes = useStyles();
  const theme = useTheme();

  const courseId = props.match.params.id ? props.match.params.id : '';

  return (
    <Grid container direction={"row"}>
        {/* Detail */}
        <CourseTabs courseId={courseId}/>
    </Grid>
  );
}

const mapStateToProps = (state) => {
    return {
        courseDetail: 0,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        courseDetail: 0,
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CourseDetail));
