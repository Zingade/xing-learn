import React from 'react'
import './Table.scss'

const BatchCell = (props) => {
  const {cellID, isBatch, updateDatabase} = props;
  let selectStatus = (isBatch)?'selectStatus':''; 

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

  return (
    <div id={cellID} className={`cell ${selectStatus}`} onClick={handleClick}>
    </div>
  );
};

export default BatchCell;
  