import React from "react";
import { Box, Grid } from "@material-ui/core";
import {courseList} from '../../components/CourseList/CourseContents'
import CourseInfo from '../../components/CourseList/CourseDetail/CourseTabs/CourseInfo'

import CourseCardItem from "../../components/CourseList/CourseCard/CourseCard";

const Courses = (props) => {

  let courseListRender;
  if (courseList.length > 0) {
    courseListRender = courseList.map((course, index) => (
      <Grid item key={index}>
        <CourseCardItem course={course} />
      </Grid>
    ));
  }

  return (
    <Box>
      <Grid container spacing={2} justify="center">
        <CourseInfo courseList={courseList}/>
      </Grid>
    </Box>
  );
};

export default Courses;
