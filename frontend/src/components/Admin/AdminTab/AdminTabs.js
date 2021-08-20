import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GmailTabs, GmailTabItem } from "@mui-treasury/components/tabs/gmail";
import { Box, Paper } from "@material-ui/core";
import { MenuBook, PeopleAlt, Payment } from "@material-ui/icons";
import UserList from "../../../containers/User/UserList";


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

const AdminTabs = () => {
  const classes = useStyles();
  const [tabNum, setTabNum] = useState(0);

  const handleChange = (_, newValue) => {
    setTabNum(newValue);
  };

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
          icon={<PeopleAlt />}
          label={"User Management"}
          {...a11yProps(0)}
          classes={{ wrapper: classes.wrapper }}
        />
        <GmailTabItem
          icon={<Payment />}
          label={"Fees Management"}
          {...a11yProps(1)}
          classes={{ wrapper: classes.wrapper }}
        />
        <GmailTabItem
          icon={<MenuBook />}
          label={"Course Assignment"}
          {...a11yProps(2)}
          classes={{ wrapper: classes.wrapper }}
        />
      </GmailTabs>

      <Box className={classes.marginL} ml={3}>
        <Paper elevation={0} >
          <TabPanel tabNum={tabNum} index={0}>
            <UserList />
          </TabPanel>

          <TabPanel tabNum={tabNum} index={1}>
            Panel 2 Contents
          </TabPanel>

          <TabPanel tabNum={tabNum} index={2}>
            Panel 3 Contents
          </TabPanel>
        </Paper>
      </Box>
    </Fragment>
  );
};

export default AdminTabs;
