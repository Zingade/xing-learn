import React, { useState } from 'react'
import { Link, Avatar, Grid, makeStyles, Paper, TextField, Button, Typography } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import { connect } from 'react-redux';
import useForm from '../../components/Resue/useForm'

const initialLoginValues = {
  id:0,
  userName:'',
  email:'',
  password:'',
  confirmPassword:'',
  phone:'',
}


const useStyles = makeStyles((theme) => ({
    paper:{
        padding: "10px",
        width: "300px",
        height: "75vh",
        margin:"8px auto"
    },
    avatar:{
        backgroundColor:'#4b9cd6',
    },
    button:{
        margin:"20px 0"
    }
}))

function Register({ darkTheme }) {

  const [validateSuccess, setValidateSuccess] = useState(false);

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
    return Object.values(temp).every(x => x == "");
  }
  const classes = useStyles();
  const {
    values, 
    setValues, 
    handleInputChange, 
    errors, 
    setErrors
  } = useForm(initialLoginValues);
  
  const handleSubmit = () => {
    setValidateSuccess(validate());
  }

    return (
      <Grid container>
          <Paper elevation={10} className={classes.paper}>
              <Grid align="center">
                <Avatar className={classes.avatar}>
                  <VpnKeyIcon/>
                </Avatar>
                <h2>Register</h2>
                    <TextField 
                      label="Username" 
                      name="userName" 
                      placeholder="Enter Username here.." 
                      fullWidth
                      onChange={handleInputChange}
                      {...(errors.userName && {error:true, helperText:errors.userName} )}
                      />
                    <TextField 
                      label="Password" 
                      name="password" 
                      placeholder="Enter password here.." 
                      type="password" 
                      fullWidth
                      onChange={handleInputChange}
                      {...(errors.password && {error:true, helperText:errors.password} )}
                      />
                    <TextField 
                      label="Confirm password" 
                      name="confirmPassword" 
                      placeholder="Reenter password here.." 
                      type="password" 
                      fullWidth
                      onChange={handleInputChange}
                      {...(errors.confirmPassword && {error:true, helperText:errors.confirmPassword} )}
                      />
                    <TextField 
                      label="Email" 
                      name="email" 
                      placeholder="Enter email here.." 
                      fullWidth
                      onChange={handleInputChange}
                      {...(errors.email && {error:true, helperText:errors.email} )}
                      />
                    <TextField 
                      label="Phone" 
                      name="phone" 
                      placeholder="Enter phone number here.." 
                      type="number" 
                      fullWidth
                      onChange={handleInputChange}
                      {...(errors.phone && {error:true, helperText:errors.phone} )}
                      />
                    <Button className={classes.button} variant="contained" color="primary" fullWidth onClick={handleSubmit} href={(validateSuccess)?"/":"#"}>
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

const mapStateToProps = (state) => {
    return {
      darkTheme: state.ui.darkTheme,
    };
  };
    
export default connect(mapStateToProps)(Register);
  

