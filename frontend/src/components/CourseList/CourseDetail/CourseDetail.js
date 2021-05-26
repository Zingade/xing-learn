import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Grid } from "@material-ui/core";
import CourseTabs from "./CourseTabs/CourseTabs";

function CourseDetail(props) {
  const courseId = props.match.params.id ? props.match.params.id : '';

  return (
    <Grid >
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
