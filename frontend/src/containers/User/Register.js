import React, { useEffect } from 'react'
import { Link, Grid, makeStyles, Paper, TextField, Button, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../components/Resue/useForm'
import {register} from '../../Redux'
import { withRouter } from 'react-router-dom';

const initialLoginValues = {
  id:0,
  userName:'',
  email:'',
  password:'',
  confirmPassword:'',
  phone:'',
  isAuthenticated:false,
}


const useStyles = makeStyles((theme) => ({
    paper:{
        padding: "10px",
        width: "300px",
        height: "80vh",
        margin:"8px auto"
    },
    avatar:{
        backgroundColor:'#4b9cd6',
    },
    button:{
        margin:"20px 0"
    },
    textField:{
      margin:"2px 0"
  }
}))

function Register(props) {

  const dispatch = useDispatch();
  const userRegister = useSelector(state=>state.userRegister);
  const {loading, userInfo, error} = userRegister;
  const validate = () =>{
    let temp = {}
    temp.userName = values.userName?"":"userName field is required"
    temp.email = values.email?((/$^|.+@.+..+/).test(values.email)?"":"Email is not valid"):"email field is required"
    temp.password = values.password?"":"Password field is required"
    temp.confirmPassword = (values.password === values.confirmPassword)?"":"Confirm Password should be same as password field"
    temp.phone = (values.phone.length >= 10)?"":"Phone number should be minimum 10 charecters"
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

  const handleSubmit = async() => {
    if (validate()){
      await dispatch(register(values.userName, values.email, values.password,values.phone));
    }
   }

    return (
      <Grid container>
          <Paper elevation={10} className={classes.paper}>
              <Grid align="center">
                <h2>Register</h2>
                    {loading&&<div>Loading...</div>}
                    {error&&<div style={{color:"red",margin:"10px 5px"}}>{error.response.data.msg}</div>}
                    <TextField 
                      variant="outlined"
                      label="Username" 
                      name="userName" 
                      placeholder="Enter Username here.."
                      fullWidth
                      className={classes.textField}
                      onChange={handleInputChange}
                      {...(errors.userName && {error:true, helperText:errors.userName} )}
                      />
                    <TextField 
                      variant="outlined"
                      label="Password" 
                      name="password" 
                      placeholder="Enter password here.." 
                      type="password" 
                      className={classes.textField}
                      fullWidth
                      onChange={handleInputChange}
                      {...(errors.password && {error:true, helperText:errors.password} )}
                      />
                    <TextField 
                      variant="outlined"
                      label="Confirm password" 
                      name="confirmPassword" 
                      placeholder="Reenter password here.." 
                      type="password" 
                      className={classes.textField}
                      fullWidth
                      onChange={handleInputChange}
                      {...(errors.confirmPassword && {error:true, helperText:errors.confirmPassword} )}
                      />
                    <TextField 
                      variant="outlined"
                      label="Email" 
                      name="email" 
                      placeholder="Enter email here.." 
                      className={classes.textField}
                      fullWidth
                      onChange={handleInputChange}
                      {...(errors.email && {error:true, helperText:errors.email} )}
                      />
                    <TextField 
                      variant="outlined"
                      label="Phone" 
                      name="phone" 
                      placeholder="Enter phone number here.." 
                      type="number" 
                      className={classes.textField}
                      fullWidth
                      onChange={handleInputChange}
                      {...(errors.phone && {error:true, helperText:errors.phone} )}
                      />
                    <Button className={classes.button} variant="contained" color="primary" fullWidth onClick={handleSubmit} >
                        Register
                    </Button>
                    <Typography> Already have an account?
                      <Link href="/login">Signin</Link>
                    </Typography>
              </Grid>
          </Paper>
      </Grid>
    );
}

export default withRouter(Register);
  

