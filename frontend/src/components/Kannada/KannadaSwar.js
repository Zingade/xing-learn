import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import '../../index.css';
import {swarList} from "./KannadaSwarDefs"
import KanCardItem from '../../components/Kannada/Ui/KanLetterCard'
import { Grid, Typography } from "@material-ui/core";
import heroImage from "../../assets/images/kan-alphabet/Aplabets.jpg";

const useStyles = makeStyles((theme) => ({
  bigFont:{
    fontSize: "10rem",
    margin: "0 5% 0 5%",
    fontWeight: "bold",
  },
  header: {
    height: "60vh",
    color: "#ffffff",
    fontWeight: "bold",
    backgroundSize: "cover",
    backgroundPosition: "65% 50%",
    backgroundAttachment: "fixed",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroImage})`,
  },
}));


// ಅ ಆ ಇ ಈ ಉ ಊ ಋ ೠ ಎ ಏ ಐ ಒ ಓ ಔ ಅಂ ಅಃ 

export const KannadaSwar = () => {

  const classes = useStyles();

  return <>
  <Grid  container alignItems="center" className={classes.header}>
    <Typography variant="h2" gutterBottom>
      ಸ್ವರಗಳು(Vowels) - ೧೩
    </Typography>
      <Typography variant="h3" gutterBottom>
          The first thirteen letters of the alphabet, which can be spelled independently without the help of another letter, are called vowels
      </Typography>
      <Typography variant="h4" gutterBottom>
          ಬೇರೊಂದು ಅಕ್ಷರದ ಸಹಾಯವಿಲ್ಲದೆ ಸ್ವತಂತ್ರವಾಗಿ ಉಚ್ಛರಿಸಲು ಬರುವ ವರ್ಣಮಾಲೆಯ ಮೊದಲ ಹದಿಮೂರು ಅಕ್ಷರಗಳನ್ನು ಸ್ವರ ಎಂದು ಕರೆಯುತ್ತಾರೆ.
      </Typography>
  </Grid>
  <Grid container spacing={2} justify="center">
  {swarList.map((letter,index) => (
    <Grid item key={index}>
      <KanCardItem letter={letter} />
    </Grid>
  ))}
  </Grid>
  </>
};


export default KannadaSwar;
