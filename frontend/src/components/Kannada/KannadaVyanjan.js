import React from "react";
import '../../index.css';
import KanCardItem from '../../components/Kannada/Ui/KanLetterCard'
import { Grid, Typography } from "@material-ui/core";
import { vyanjanList } from "./KannadaVyanjanDefs";

export const KannadaVyanjan = () => {

  return <>
  <Grid>
    <Typography variant="h4" gutterBottom>
    ವ್ಯಂಜನಗಳು(Consonants) - 34
    </Typography>
  </Grid>
    <Grid container spacing={2} justifyContent="center">
    {vyanjanList.map((letter,index) => (
      <Grid item key={index}>
        <KanCardItem letter={letter}/>
      </Grid>
    ))}
  </Grid>
  </>
};


export default KannadaVyanjan;
