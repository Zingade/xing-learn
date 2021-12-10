import React, { useEffect } from 'react';
import { Avatar, Button, Card, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputAdornment, InputLabel, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, saveUser } from '../Redux/User/UserAction';
import { BATCH_BUMBER_VALUE, LAST_MONTH_AMOUNT_VALUE, TOTAL_AMOUNT_VALUE, summaryFees, THIS_MONTH_AMOUNT_VALUE } from './Utils/CommonConstants';
import { Search } from '@material-ui/icons';
import useForm from './Resue/useForm'
import { useHistory } from "react-router-dom";

const initialLoginValues = {
  id:0,
  name:'',
  month:'',
  monthDisplay:'',
  amount:'',
  payMethod:0,
  lastMMonth:false,
}
  
const useStyles = makeStyles((theme) => ({
    maincard:{
      display:"flex",
      padding:"5px 5px",
    },
    summaryContainer:{
      flexWrap:"nowrap",
      alignItems:'center',
      justifyContent:'space-between',
      width:"100%",
      margin:'8px',
      borderRadius:10,
      overflowX:"auto",    
    },
    controlContainer:{
      flexWrap:"nowrap",
      alignItems:'center',
      justifyContent:'center',
      margin:'8px',
      borderRadius:10,
      overflowX:"auto",    
    },
    studentcard:{
      minWidth: 230,
      margin:"5px 5px",
      borderRadius:15,
      overflow: 'hidden',
    },
    orangeAvatar: {
      margin: 2,
      color: '#fff',
      backgroundColor: deepOrange[500],
    },
    snapBoardInside:{
      backgroundColor:"#edeeef",   
      width:`calc(${100 / 3}%)`,
      margin:'8px',
      textAlign:"center",
      borderRadius:10,
    },
    studentNumbers:{
      padding:"8px"
    },
    dialog:{
      position: 'absolute',
      top: 10,
    },
    controlSize:{
      width:"95%",
    },
    cash:{
      fontSize: "14px",
      color:"blue",
    },
    gpay:{
      fontSize: "14px",
      color:"green",
    },
  }))

function findGrandTotal(users)  {
    const currentMonth = (((new Date()).getMonth()+7)%12)
    summaryFees.total.Overall = 0
    summaryFees.total.Cash = 0
    summaryFees.total.GPay = 0
    summaryFees.delta.Overall = 0
    summaryFees.delta.Cash = 0
    summaryFees.delta.GPay = 0
    users.map(user => {
      user.fees.map((fee,count) => {
        summaryFees.total.Overall += parseInt(fee.amount)
        if (fee.payMethod === "1") {
          summaryFees.total.GPay += parseInt(fee.amount)
          if ((count%12) === currentMonth){
            summaryFees.delta.GPay += parseInt(fee.amount);
            summaryFees.delta.Overall += parseInt(fee.amount);
          }
        }
        else{
          summaryFees.total.Cash += parseInt(fee.amount)
          if ((count%12) === currentMonth){
            summaryFees.delta.Cash += parseInt(fee.amount);
            summaryFees.delta.Overall += parseInt(fee.amount);
          }
        }
        return fee
      })
      return user
    })
  }

function FeesSummaryCard (props) {
    const classes = useStyles()

    return (<>
        <Grid container spacing={1} className={classes.summaryContainer}>
            <SnapBoard text={"Total"} number={summaryFees.total.Overall}/>
            <SnapBoard text={"Cash"} number={summaryFees.total.Cash}/>
            <SnapBoard text={"GPay"} number={summaryFees.total.GPay}/>
        </Grid>
          <Grid container spacing={1} className={classes.summaryContainer}>
            <SnapBoard text={"This month"} number={summaryFees.delta.Overall}/>
            <SnapBoard text={"Cash"} number={summaryFees.delta.Cash}/>
            <SnapBoard text={"GPay"} number={summaryFees.delta.GPay}/>
        </Grid>
    </>
    );
}
  
function SnapBoard (props) {
  const classes = useStyles()
  const {id, text, number, name, onClickHandle} = props;

  return (<>
      <Grid item className={classes.snapBoardInside}>
        <Typography id={id} name={name} text={text} style={{fontSize:"25px"}} onClick={onClickHandle}>
          {number}
        </Typography>
        <Typography style={{fontFamily:"Franklin Gothic Medium"}} variant="body2">
          {text}
        </Typography>
      </Grid>
  </>
  )
}

function BatchDetails (props) {
  const classes = useStyles()
  const {id, batches, onClickHandle} = props
  var batchNumber = 0;
  var days = [false,false,false,false,false]
  const daysString = ["Mon","Tue","Wed","Thu","Fri"]
  batches.map((batch, count)=>{
    if (batch.isBatch) {
      batchNumber = (count % 3)+1;
      days[parseInt(count/3)] = true;
    }
    return true
  })

  return (<>
      <Grid item className={classes.snapBoardInside}>
        <Typography id={id} style={{fontSize:"20px"}} onClick={onClickHandle}>
          Batch {batchNumber}
        </Typography>
        <Typography style={{fontFamily:"Franklin Gothic Medium"}} variant="body2">
          {days.map((day, count)=>{return (day?daysString[count]+' ':'')})}
        </Typography>
      </Grid>
  </>
  )
}

function StudCard(props) {
  const classes = useStyles()
  const {student} = props;
  const [open, setOpen] = React.useState(false);
  const totalFees = student.fees.reduce((a,c) => a + 1 * c.amount, 0)
  const batches = student.batches
  var todaysDate = new Date();
  const currentMonth = todaysDate.getMonth()+1;
  const currentMonthFees = student.fees[(currentMonth+6)%12]; 
  const lastMonthFees = student.fees[(currentMonth+6-1)%12];
  const dispatch = useDispatch();
  let history = useHistory();

  const {
    values, 
    handleInputChange, 
    errors, 
    setErrors
  } = useForm(initialLoginValues);

  const updateDatabase = (values) => {
    const index = (values.lastMMonth) ? (currentMonth+6-1)%12 : (currentMonth+6)%12 ; 
    student.fees[index].amount = values.amount;
    student.fees[index].payMethod = values.payMethod;
    dispatch(saveUser(student))
  }

  const validate = () =>{
    let temp = {}
    temp.amount = values.amount?"":"Amount is required"
    setErrors({
      ...temp
    })
    return Object.values(temp).every(x => x === "");
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
      if(validate()){
        setOpen(false);
        updateDatabase(values)
        history.push("/");
    }
  };

  const onClickHandle = (e) => {
    values.name = student.name
    values.monthDisplay = "this month"
    if ( e.currentTarget.id === THIS_MONTH_AMOUNT_VALUE ){
      values.payMethod = currentMonthFees.payMethod
      values.amount = currentMonthFees.amount
      values.lastMMonth = false
      setOpen(true)
    }
    if  (e.currentTarget.id === LAST_MONTH_AMOUNT_VALUE ){
      values.monthDisplay = "last month"
      values.payMethod = lastMonthFees.payMethod
      values.amount = lastMonthFees.amount
      values.lastMMonth = true
      setOpen(true)
    }
  }

  return (
    <Card sx={{ maxWidth: 165 }} style={{backgroundColor:"#edeeef"}}>
      <CardHeader style={{padding:"8px"}}
        avatar={
          <Avatar className={classes.orangeAvatar}>
                {student.name[0]}
          </Avatar>
        }
        title={student.name}
        subheader="Class V"
      />
      <Grid container justifyContent="center">
        <SnapBoard id={THIS_MONTH_AMOUNT_VALUE} name={student.name} text={"This month"} number={currentMonthFees.amount} onClickHandle={onClickHandle}/>
        <SnapBoard id={LAST_MONTH_AMOUNT_VALUE} name={student.name} text={"Last month"} number={lastMonthFees.amount}  onClickHandle={onClickHandle}/>
      </Grid>
      <Grid container justifyContent="center">
        <SnapBoard id={TOTAL_AMOUNT_VALUE} text={"Total"} number={totalFees}/>
        <BatchDetails id={BATCH_BUMBER_VALUE} batches={batches}/>
      </Grid>
      <Dialog open={open} onClose={handleClose} classes={{paper: classes.dialog}}>
        <DialogTitle >{values.name}'s {values.monthDisplay} Payment</DialogTitle>
        <DialogContent>
          <Grid container>
            <TextField
              autoFocus
              onFocus={event => {event.target.select()}}
              variant="outlined"
              placeholder="Enter Amount Paid here.." 
              id="amount"
              label="Amount Paid"
              type="text"
              name="amount"
              autoComplete='off'
              value={values.amount}
              onChange={handleInputChange}
              fullWidth
              {...(errors.amount && {error:true, helperText:errors.amount} )}
            />
            <FormControl variant="outlined" fullWidth style={{margin:"8px"}}>
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
          </Grid>
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
    </Card>
  );
}


function StudentsCard (props) {
    const classes = useStyles()
    const {studentList, updateStatus} = props;
    const [sortOption, setSortOption] = React.useState(10);
    const [searchKeyword, setSearchKeyword] = React.useState('');
    var [filteredStudList,setFilteredStudList] = React.useState(studentList); 
    var todaysDate = new Date();
    const currentMonth = todaysDate.getMonth()+1;
    const currentMonthFees = (currentMonth+6)%12; 
    const lastMonthFees = (currentMonth+6-1)%12; 

    const handleChange = (event) => {
      setSortOption(event.target.value);
      if (event.target.value === 10 ){
        setFilteredStudList(studentList);
      } 
      if (event.target.value === 20 ) {
        setFilteredStudList(studentList.filter((stud) => {return (stud.fees[currentMonthFees].amount === "0")}))
      }
      if (event.target.value === 30 ) {
        setFilteredStudList(studentList.filter((stud) => {return (stud.fees[currentMonthFees].amount !== "0")}))
      }
      if (event.target.value === 40 ) {
        setFilteredStudList(studentList.filter((stud) => {return (stud.fees[lastMonthFees].amount === "0")}))
      }
      if (event.target.value === 50 ) {
        setFilteredStudList(studentList.filter((stud) => {return (stud.fees[lastMonthFees].amount !== "0")}))
      }
    };

    const searchContentHandler = (e) => {
      e.preventDefault();
      const searchValue = (e.target.value.length >= 1 )?e.target.value:'';
      setSearchKeyword(searchValue);
    }

    useEffect(()=>{
      if (searchKeyword !== '') {
        setFilteredStudList(studentList.filter((stud) => {return stud.name.toLowerCase().includes(searchKeyword.toLowerCase()) }))
      } else {
        setFilteredStudList(studentList);
      }
      return () =>{
      };
    }, [searchKeyword, updateStatus, studentList]);

    return (<>
              <Grid container spacing={1} className={classes.controlContainer}>
              <TextField id="outlined-basic" 
                size="small" 
                variant="standard" 
                style={{width:150, padding:"0 10px"}}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                onChange={searchContentHandler}/>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  size="small"
                  value={sortOption}
                  onChange={handleChange}
                  label="Sort Option"
                  >
                  <MenuItem value={10}>No Filter</MenuItem>
                  <MenuItem value={20}>NOT Paid this Month</MenuItem>
                  <MenuItem value={30}>PAID this month</MenuItem>
                  <MenuItem value={40}>NOT PAID last month</MenuItem>
                  <MenuItem value={50}>PAID last month</MenuItem>
                </Select>
              </FormControl>
              <Typography className={classes.studentNumbers}>{filteredStudList.length}</Typography>
              </Grid>
              <Grid container spacing={1} className={classes.summaryContainer}>
                    {filteredStudList.map((stud, count) => (<Grid key={count} item className={classes.studentcard}> <StudCard key={count} student={stud}/> </Grid>))}
              </Grid>
        </>
      );
  }
  

const AdminCards = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(listUsers());
        return () =>{
        };
    }, [dispatch]);
    
    const userList = useSelector(state=>state.userList);
    const {loading, users} = userList;
    const  studentList = users.filter((stud)=>{return (stud.isAdmin === false)});
    const updateStatus = (!loading) && (studentList.length !== 0)
    if (updateStatus) {
        findGrandTotal(studentList)
    }

    return (
        <>
            <Grid container spacing={1} className={classes.maincard}>
                <FeesSummaryCard/>
                <StudentsCard updateStatus={updateStatus} studentList={studentList}/>
            </Grid>
        </>
    )
}

export default AdminCards;