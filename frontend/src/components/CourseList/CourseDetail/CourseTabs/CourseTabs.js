import React, { useState, Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { GmailTabs, GmailTabItem } from "@mui-treasury/components/tabs/gmail";
import { Box, Paper } from "@material-ui/core";
import { Inbox, LocalOffer, People } from "@material-ui/icons";

import KannadaSwar from '../../../Kannada/KannadaSwar'
import KannadaVyanjan from '../../../Kannada/KannadaVyanjan'
import Kagunita from '../../../Kannada/Kagunita'
import ErrorPage from '../../../Kannada/ErrorPage'

import { KANNADA_SWAR, KANNADA_VYANJANA,KANNADA_KAGUNITA } from "../../CourseContents";
import Quiz from '../../../UI/Quiz/Quiz'
import {swarQuestions} from '../../../Kannada/KannadaSwarDefs'
import {vyanjanQuestions} from '../../../Kannada/KannadaVyanjanDefs'
import {kagunitQuestions} from '../../../Kannada/KagunitaDefs'
import ClassRoomVideo from '../../../Kannada/ClassRoomVideo'

const useStyles = makeStyles((theme) => ({
  gmailTabs: {
    backgroundColor: "inherit",
  },
  wrapper: {
    color: "darkgray !important",
  },
  marginL: {
    marginLeft:0,
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

const CourseTabs = ({courseId}) => {
  const classes = useStyles();
  const [tabNum, setTabNum] = useState(0);
  const handleChange = (_, newValue) => {
    setTabNum(newValue);
  };

const shuffleQuestions = () => {
  swarQuestions.sort(()=> Math.random() - 0.5);
  vyanjanQuestions.sort(()=> Math.random() - 0.5);
  }

  shuffleQuestions();

  return (
    <Fragment>
      <GmailTabs
        value={tabNum}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="on"
        aria-label="scrollable force tabs"
        className={classes.gmailTabs}
      >
        <GmailTabItem
          icon={<LocalOffer />}
          label={"Learn"}
          {...a11yProps(0)}
          classes={{ wrapper: classes.wrapper }}
        />
        <GmailTabItem
          icon={<Inbox />}
          label={"Practice"}
          {...a11yProps(1)}
          classes={{ wrapper: classes.wrapper }}
        />
        <GmailTabItem
          icon={<People />}
          label={"Test"}
          {...a11yProps(2)}
          classes={{ wrapper: classes.wrapper }}
        />
        {/*<GmailTabItem
          icon={<LocalOffer />}
          label={"Result"}
          {...a11yProps(2)}
          classes={{ wrapper: classes.wrapper }}
        />*/}
      </GmailTabs>

      <Box className={classes.marginL} ml={3}>
        <Paper elevation={0} >
          <TabPanel tabNum={tabNum} index={0}>
            <ClassRoomVideo
              url={(courseId === KANNADA_SWAR) 
                ?"https://youtu.be/ig64ojxpSjY?rel=0&autoplay=1"
                :(courseId === KANNADA_VYANJANA)
                ? "https://youtu.be/td2OViYnfRc?rel=0&autoplay=1"
                :(courseId === KANNADA_KAGUNITA)
                ?"https://youtu.be/zEkzV1GoCyA?rel=0&autoplay=1"
                :<ErrorPage/>}
            /> 
          </TabPanel>

          <TabPanel tabNum={tabNum} index={1}>
            {(courseId === KANNADA_SWAR)? <KannadaSwar/>:(courseId === KANNADA_VYANJANA)?<KannadaVyanjan/>:(courseId === KANNADA_KAGUNITA)?<Kagunita/>:<ErrorPage/>}
          </TabPanel>

          <TabPanel tabNum={tabNum} index={2}>
            <Quiz 
            aQuestions={(courseId === KANNADA_SWAR)?swarQuestions:(courseId === KANNADA_VYANJANA)?vyanjanQuestions:(courseId === KANNADA_KAGUNITA)?kagunitQuestions:swarQuestions}
            shuffleQuestions={shuffleQuestions}
            />
          </TabPanel>

          {/*<TabPanel tabNum={tabNum} index={2}>
            Result
      </TabPanel>*/}
        </Paper>
      </Box>
    </Fragment>
  );
};

export default CourseTabs;
