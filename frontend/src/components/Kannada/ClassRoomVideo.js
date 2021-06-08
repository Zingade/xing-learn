import React from "react"
import {YoutubePlayer} from "reactjs-media"
import '../../index.css';
import { Grid, Typography } from "@material-ui/core";



export const ClassRoomVideo = (props) => {

  const {url} = props;

  return <>
  <Grid>
    <Typography variant="h4" gutterBottom>
        ಉಪನ್ಯಾಸ(Leacture)
    </Typography>
  </Grid>
  <div>
      <YoutubePlayer
        src={url}
        width={"100%"}
        height={350}
      />
    </div>
  </>
};


export default ClassRoomVideo;
