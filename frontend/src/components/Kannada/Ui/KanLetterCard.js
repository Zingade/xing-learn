import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
} from "@material-ui/core";

import { VolumeUp, PlayCircleOutline, Stop, ExpandMore } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 110,
  },
  title: {
    height: 45,
    fontSize: "3.2rem",
    lineHeight: 1,
    fontWeight: "bold",
    '&:hover': {
        color: "#ff8000",
     },
},
  media: {
    height: 77,
  },
  media_w: {
    height: 77,
    width: 125,
  },
  cardMedia:{
    width: 77,
    height: 80,
    objectFit: "cover",
    objectPosition: "center",
    },
  textMargin:{
    margin: 0,
    },
  contentPadding:{
    paddingBottom: 0,
    },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));


const KanLetterCard = ({ letter }) => {
  let classes = useStyles();

  const [expanded, setExpanded] = useState(false);
  const [gifPlay, setGifPlay] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleGifClick = () => {
    setGifPlay(!gifPlay);
  };

  return (
    <Card className={classes.root}>
        {gifPlay?(
        <>
        <CardMedia
        className={(letter.width_adjust)?classes.media_w:classes.media}
        image={letter.gif}
        title="Writing"
        />
      </>
      ):(
      <CardContent>
          <Typography
            className={classes.title}
            variant="subtitle2"
            component="h1"
          >
            {letter.charecter}
          </Typography>
      </CardContent>
      )}
      <CardActions disableSpacing>
        <IconButton size="small" aria-label="share" onClick={letter.audio()}>
          <VolumeUp />
        </IconButton>
        <IconButton size="small" aria-label="add to favorites" onClick={handleGifClick}>
          {gifPlay?<Stop/>:<PlayCircleOutline />}
        </IconButton>
        <IconButton  size="small"
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMore />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardMedia
          className={classes.cardMedia}
          image={letter.image}
          title={letter.english}
          />
          <Typography className={classes.textMargin} paragraph variant="h4">
            {letter.description}
          </Typography>
          <IconButton size="small" aria-label="share" onClick={letter.audio()}>
            <VolumeUp />
          </IconButton>
      </Collapse>
    </Card>
  );
};

export default KanLetterCard;
