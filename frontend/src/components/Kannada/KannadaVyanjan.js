import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import '../../index.css';
import {swarList} from "./KannadaSwarDefs"
import KanCardItem from '../../components/Kannada/Ui/KanLetterCard'
import { Grid, Typography } from "@material-ui/core";
import heroImage from "../../assets/images/kan-alphabet/Aplabets.jpg";
import { vyanjanList } from "./KannadaVyanjanDefs";

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


export const KannadaVyanjan = () => {

  const classes = useStyles();

  return <>
  <Grid>
    <Typography variant="h2" gutterBottom>
    ವ್ಯಂಜನಗಳು(Consonants) - 34
    </Typography>
  </Grid>
    <Grid container spacing={2} justify="center">
    {vyanjanList.map((letter,index) => (
      <Grid item key={index}>
        <KanCardItem letter={letter}/>
      </Grid>
    ))}
  </Grid>
  </>
};


export default KannadaVyanjan;
