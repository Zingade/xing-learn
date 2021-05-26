import React from "react";
import '../../index.css';
import {swarList} from "./KannadaSwarDefs"
import KanCardItem from '../../components/Kannada/Ui/KanLetterCard'
import { Grid, Typography } from "@material-ui/core";


// ಅ ಆ ಇ ಈ ಉ ಊ ಋ ೠ ಎ ಏ ಐ ಒ ಓ ಔ ಅಂ ಅಃ 
/*
      <Typography variant="h3" gutterBottom>
          The first thirteen letters of the alphabet, which can be spelled independently without the help of another letter, are called vowels
      </Typography>
      <Typography variant="h4" gutterBottom>
          ಬೇರೊಂದು ಅಕ್ಷರದ ಸಹಾಯವಿಲ್ಲದೆ ಸ್ವತಂತ್ರವಾಗಿ ಉಚ್ಛರಿಸಲು ಬರುವ ವರ್ಣಮಾಲೆಯ ಮೊದಲ ಹದಿಮೂರು ಅಕ್ಷರಗಳನ್ನು ಸ್ವರ ಎಂದು ಕರೆಯುತ್ತಾರೆ.
      </Typography>
*/

export const KannadaSwar = () => {

  return <>
  <Grid>
    <Typography variant="h4" gutterBottom>
      ಸ್ವರಗಳು(Vowels) - 15
    </Typography>
  </Grid>
  <Grid container spacing={2} justify="center">
  {swarList.map((letter,index) => (
    <Grid item key={index}>
      <KanCardItem letter={letter}/>
    </Grid>
  ))}
  </Grid>
  </>
};


export default KannadaSwar;
