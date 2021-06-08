import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/Accordion";
import ExpansionPanelDetails from "@material-ui/core/AccordionActions";
import ExpansionPanelSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {CardMedia, Button} from '@material-ui/core'
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight:"bold",
    flexBasis: "80%",
    flexShrink: 0,
    paddingLeft:10,
  },
  media: {
    height: 60,
    width: 110,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function CourseInfo({courseList}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  let renderList = courseList.map((course,index)=> (
    <div key={index}>
      <ExpansionPanel
      expanded={expanded === `panel${index}`}
      onChange={handleChange(`panel${index}`)}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${index}bh-content`}
          id={`panel${index}bh-header`}
        >
          <CardMedia
          className={classes.media}
          image={course.image}
          title="Image"
          />
          <Typography className={classes.heading}>
            {course.topic} 
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {course.courseDesc} 
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/courses/${course.courseLink}`}
            style={{ width: 150 }}
          >
            Start
          </Button>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
)); 
  
  return (
    <div className={classes.root}>
      {renderList}
    </div>
  );
}
