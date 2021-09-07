import React from 'react'
import {formatNumberCustom} from './CommonFunctions'
import './Table.scss'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import {MONTH_COLUMNS,STUDENT_MAPPING} from '../Utils/CommonConstants'
import useForm from '../Resue/useForm'

const initialLoginValues = {
    id:0,
    name:'',
    month:'',
    monthDisplay:'',
    amount:'',
    payMethod:0,
}
    
const useStyles = makeStyles({
  cellStat:{
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  dialog:{
    position: 'absolute',
    top: 10
  },
  cash:{
    fontSize: "14px",
    color:"blue",
  },
  gpay:{
    fontSize: "14px",
    color:"green",
  },
})

const FeesCell = (props) => {
  const {cellID, total, updateDatabase, payMethod} = props;
  const [open, setOpen] = React.useState(false);
  const {
    values, 
    handleInputChange, 
    errors, 
    setErrors
  } = useForm(initialLoginValues);

  const validate = () =>{
    let temp = {}
    temp.amount = values.amount?"":"Amount is required"
    setErrors({
      ...temp
    })
    return Object.values(temp).every(x => x === "");
  }

  const handleClick = (event) => {
    let subString = event.target.id;
    let startIndex = 0;
    let endIndex = subString.search("@");
    values.name = subString.substring(startIndex, endIndex);
    if (values.name === "Grand Total"){
        return -1;
    }

    subString = subString.substring(subString.indexOf('@')+1)
    
    startIndex = 0;
    endIndex = subString.search("@");
    const monthIndex = subString.substring(startIndex, endIndex);
    values.month = monthIndex;
    values.monthDisplay = STUDENT_MAPPING[MONTH_COLUMNS[monthIndex]].displayName;
    values.amount = subString.substring(subString.indexOf('@')+1)
    values.payMethod = payMethod
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
      if(validate()){
        setOpen(false);
        updateDatabase(values)
    }
  };

const classes = useStyles()
  return (
    <div className={classes.cellStat}>
      <div id={cellID} className={(payMethod === "1")?classes.gpay:classes.cash} onClick={handleClick}>
        {
          formatNumberCustom(total, 'int')
        }
      </div>
      <Dialog open={open} onClose={handleClose} classes={{paper: classes.dialog}}>
        <DialogTitle >{values.name}'s {values.monthDisplay} Payment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            onFocus={event => {event.target.select()}}
            variant="outlined"
            placeholder="Enter Amount Paid here.." 
            margin="dense"
            id="amount"
            label="Amount Paid"
            type="text"
            name="amount"
            autoComplete='off'
            value={values.amount}
            onChange={handleInputChange}
            {...(errors.amount && {error:true, helperText:errors.amount} )}
            fullWidth
          />
        <FormControl variant="outlined" fullWidth style={{margin:"5px 0"}}>
          <InputLabel id="payMethodInput" >Payment Method</InputLabel>
          <Select
            labelId="payMethod"
            id="papMethod"
            label="Payment Method"
            name="payMethod"
            value={values.payMethod}
            onChange={handleInputChange}
            fullWidth
          >
            <MenuItem value={"0"}>Cash</MenuItem>
            <MenuItem value={"1"}>G Pay</MenuItem>
          </Select>
        </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FeesCell;
  