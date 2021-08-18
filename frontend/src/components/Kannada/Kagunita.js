import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import '../../index.css';
import {kagunitList} from "./KagunitaDefs"
import { Grid, Typography, CardMedia, IconButton } from "@material-ui/core"
import { VolumeUp } from "@material-ui/icons";
import KombuImage from "../../assets/images/kan-alphabet/Kombu.jpg"

const useStyles = makeStyles((theme) => ({
  media: {
    height: 30,
    width: 40,
    display:"inline-block"
  },
}));


// ಅ ಆ ಇ ಈ ಉ ಊ ಋ ೠ ಎ ಏ ಐ ಒ ಓ ಔ ಅಂ ಅಃ 
/*
      <Typography variant="h3" gutterBottom>
          The first thirteen letters of the alphabet, which can be spelled independently without the help of another letter, are called vowels
      </Typography>
      <Typography variant="h4" gutterBottom>
          ಬೇರೊಂದು ಅಕ್ಷರದ ಸಹಾಯವಿಲ್ಲದೆ ಸ್ವತಂತ್ರವಾಗಿ ಉಚ್ಛರಿಸಲು ಬರುವ ವರ್ಣಮಾಲೆಯ ಮೊದಲ ಹದಿಮೂರು ಅಕ್ಷರಗಳನ್ನು ಸ್ವರ ಎಂದು ಕರೆಯುತ್ತಾರೆ.
      </Typography>
*/

export const Kagunita = () => {

  const classes = useStyles();

  return <>
  <Grid>
    <Typography variant="h4" gutterBottom >
    ಕನ್ನಡ ಕಾಗುಣಿತ(Kagunita)
      {/*ಅ ಾ (ಆ) ಿ(ಇ) ೀ(ಈ) ು(ಉ) ೂ(ಉ) ೃ(ಋ) ೆ(ಎ) ೇ(ಏ) ೈ(ಐ) ೊ(ಒ) ೋ(ಓ) ೌ(ಔ) ಂ(ಅಂ) ಃ(ಅಃ)*/}
    </Typography>
  </Grid>
  {kagunitList.map((letter,index) => (
    <Grid container key={index} spacing={3}>
      <Grid item>
          <Typography variant="h3" align="justifyContent">
              {letter.charecter1} + {letter.charecter2} + {(index === 0) ?<CardMedia className={classes.media} image={KombuImage} />:letter.charecter3} = {letter.charecter4}
          <IconButton size="small" aria-label="share" onClick={()=>{}}>
            <VolumeUp />
          </IconButton>
          </Typography>
      </Grid>
    </Grid>
  ))}
  </>
};


export default Kagunita;
