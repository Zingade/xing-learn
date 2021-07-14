import React, { useState } from 'react'
import { Link, Avatar, Button, Checkbox, FormControlLabel, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import { connect } from "react-redux";
import LockIcon from '@material-ui/icons/LockOutlined'
import useForm from '../../components/Resue/useForm'

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
    margin: '8px 0'
  }
}))

const initialLoginValues = {
  id:0,
  userName:'',
  password:'',
  remindMe:false,
}

function Login(props) {

  const [validateSuccess, setValidateSuccess] = useState(false);
  const validate = () =>{
    let temp = {}
    temp.userName = values.userName?"":"userName field is required"
    //temp.email = (/$|.+@.+.+/).test(values.email)?"":"Email is not valid"
    temp.password = values.password?"":"Password field is required"
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
            <Grid align='center'>
              <Avatar className={classes.avatar}>
                <LockIcon/>
              </Avatar>
              <h2>Login</h2>
            </Grid>
              <TextField 
                label="User name:"
                name="userName" 
                placeholder="Enter User name here.." 
                value={values.userName}
                fullWidth
                onChange={handleInputChange}
                {...(errors.userName && {error:true, helperText:errors.userName} )}
                />
              <TextField 
                label="Password:" 
                name="password" 
                placeholder="Enter Password here.." 
                type="password" 
                fullWidth
                value={values.password}
                onChange={handleInputChange}
                {...(errors.password && {error:true, helperText:errors.password} )}
                />
              <FormControlLabel
                control={
                  <Checkbox
                    name="remember"
                    color="primary"
                    value={values.remindMe}
                    onChange={handleInputChange}
                  />
                }
                label="Remember Me"
              />
              <Button 
                className={classes.button} 
                variant="contained" 
                type="submit" 
                color="primary" 
                fullWidth 
                onClick={handleSubmit} href={(validateSuccess)?"/":"#"}>
                Sign in
              </Button>
              <Typography>
                <Link href="#" >
                  Forgot Password?
                </Link>
              </Typography>
              <Typography> Do you have an account ?
                <Link href="/register" >
                  Register
                </Link>
              </Typography>
            </Paper>
        </Grid>
  )
}

const mapStateToProps = (state) => {
  return {
    darkTheme: state.ui.darkTheme,
  };
};
  
export default connect(mapStateToProps)(Login);
