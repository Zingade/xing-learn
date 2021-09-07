import React from 'react'
import './Table.scss'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  cellStat:{
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
})

const BatchCell = (props) => {
  const {cellID, isBatch, updateDatabase} = props;


  const handleClick = (event) => {
    let subString = event.target.id;
    let startIndex = 0;
    let endIndex = subString.search("@");
    const name = subString.substring(startIndex, endIndex);
    if (name === "Grand Total"){
        return -1;
    }

    subString = subString.substring(subString.indexOf('@')+1)
    
    startIndex = 0;
    endIndex = subString.search("@");
    const batchIndex = subString.substring(startIndex, endIndex);
    const batchSelect = subString.substring(subString.indexOf('@')+1)
    updateDatabase({name:name, batch: parseInt(batchIndex), batchSelect:batchSelect})
  }

const classes = useStyles()
  return (
    <div id={cellID} className={classes.cellStat} style={{margin: "0.5rem 0.5rem", backgroundColor:(isBatch)?"green":"white"}} onClick={handleClick}>
    </div>
  );
};

export default BatchCell;
  