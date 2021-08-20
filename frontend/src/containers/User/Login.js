import React, { useEffect } from 'react'
import { Button, Grid, makeStyles, Paper, TextField } from '@material-ui/core'
import { connect, useDispatch, useSelector } from "react-redux";
import { withRouter } from 'react-router-dom';
import useForm from '../../components/Resue/useForm'
import { signin } from '../../Redux/User/UserAction';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding:20,
    height:'70vh',
    width:300,
    margin:"20px auto"
    },
  avatar:{
    backgroundColor: '#4b9cd6'
  },
  button:{
    textTransform: "none",
    margin: '8px 8px',
  },
  textField:{
    margin:"5px 0"
  }
}))

const initialLoginValues = {
  id:0,
  loginID:'',
  password:'',
  remindMe:false,
}

function Login(props) {

  const dispatch = useDispatch();
  const userSignin = useSelector(state=>state.userSignin);
  const {loading, userInfo, error} = userSignin;
  const validate = () =>{
    let temp = {}
    temp.loginID = values.loginID?"":"Login ID field is required"
    //temp.email = (/$|.+@.+.+/).test(values.email)?"":"Email is not valid"
    temp.password = values.password?"":"Password field is required"
    setErrors({
      ...temp
    })
    return Object.values(temp).every(x => x === "");
  }
  const classes = useStyles();
  const {
    values, 
    handleInputChange, 
    errors, 
    setErrors
  } = useForm(initialLoginValues);
  
  useEffect(()=>{
    if(userInfo){
        props.history.push("/");
    }
    return () =>{
    };
  }, [userInfo,props.history]);

  const handleSubmit = async () => {
    if (validate()){
      await dispatch(signin(values.loginID,values.password));
    }
  }

  const cancelSubmit = () => {
    props.history.push("/")
  }

  return (
        <Grid container>
          <Paper elevation={10} className={classes.paper}>
            <Grid align='center'>
              <h2>Login</h2>
              {loading&&<div>Loading...</div>}
              {error&&<div style={{color:"red",margin:"10px 5px"}}>{error.response.data.msg}</div>}
            </Grid>
              <TextField 
                label="Login ID:"
                variant="outlined"
                name="loginID" 
                placeholder="Enter User name here.." 
                value={values.loginID}
                fullWidth
                className={classes.textField}
                onChange={handleInputChange}
                {...(errors.loginID && {error:true, helperText:errors.loginID} )}
                />
              <TextField 
                label="Password:" 
                variant="outlined"
                name="password" 
                placeholder="Enter Password here.." 
                type="password" 
                className={classes.textField}
                fullWidth
                value={values.password}
                onChange={handleInputChange}
                {...(errors.password && {error:true, helperText:errors.password} )}
                />
              <Grid container justify="center">
                <Button 
                className={classes.button} 
                variant="contained" 
                type="submit" 
                color="primary" 
                size="small"
                onClick={handleSubmit}>
                  Sign in
                </Button>
                <Button 
                  className={classes.button} 
                  variant="contained" 
                  color="primary" 
                  size="small"
                  onClick={cancelSubmit}>
                  Cancel
                </Button>
              </Grid>
            </Paper>
        </Grid>
  )
}

const mapStateToProps = (state) => {
  return {
    darkTheme: state.ui.darkTheme,
  };
};
  
export default connect(mapStateToProps)(withRouter(Login));
