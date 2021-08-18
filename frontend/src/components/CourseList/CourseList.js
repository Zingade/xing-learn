import React, { useState, Fragment } from "react";
import {courseIndex, courseList} from './CourseContents'

import { Grid, Box } from "@material-ui/core";
import { GmailTabs, GmailTabItem } from "@mui-treasury/components/tabs/gmail";
import { makeStyles } from "@material-ui/core/styles";

import CourseInfo from '../../components/CourseList/CourseDetail/CourseTabs/CourseInfo'

const useStyles = makeStyles((theme) => ({
  gmailTabs: {
    backgroundColor: "inherit",
  },
  wrapper: {
    color: "darkgray !important",
  },
}));

function TabPanel({ children, tabNum, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={tabNum !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {tabNum === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

function CourseList(props) {
  const classes = useStyles();
  const [tabNum, setTabNum] = useState(0);

  const handleChange = (_, newValue) => {
    setTabNum(newValue);
  };

  let courseRender = courseIndex.map((tab, index) => (
      <TabPanel tabNum={tabNum} index={index} key={tab.subject}>
        <Grid container justifyContent="center" spacing={2}>
          <CourseInfo courseList={courseList.filter((course) => {return (course.category.subject === courseIndex[index].subject)})} />
        </Grid>
      </TabPanel>
  ));

  return (
    <Fragment>
      <Grid container justifyContent="center">
        <GmailTabs
          value={tabNum}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          aria-label="scrollable force tabs"
          className={classes.gmailTabs}
        >
          {courseIndex.map((tab, index) => (
            <GmailTabItem
              key={tab.subject}
              label={tab.subject}
              classes={{ wrapper: classes.wrapper }}
              {...a11yProps(index)}
            />
          ))}
        </GmailTabs>
        {courseRender}
      </Grid>
    </Fragment>
  );
}

export default CourseList;
