import { Button, Grid, IconButton, Link, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import useForm from '../../components/Resue/useForm';
import { deleteUser, listUsers, saveUser } from '../../Redux/User/UserAction';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";


const initialLoginValues = {
    id:0,
    userName:'',
    email:'',
    password:'',
    confirmPassword:'',
    phone:'',
  }
  
const useStyles = makeStyles((theme) => ({
    root:{
        margin: "1rem",
    },
    productHeader:{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
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
        textTransform: "none",
        margin:"10px 5px"
    },
    textField:{
      margin:"5px 0"
  },
  table:{
    width: "100%",
  },
  autoScroll:{
    overflowX:"auto",
  }
}))


function UserList(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const classes = useStyles();
    const userList = useSelector(state=>state.userList);
    const {loading, users, error} = userList;
    const userSave = useSelector(state=>state.userSave);
    const {success: successSave} = userSave;
    const userDelete = useSelector(state=>state.userDelete);
    const {success: successDelete} = userDelete;
    const dispatch = useDispatch();

    useEffect(()=>{
        if(successSave){
            setModalVisible(false);
        }
        dispatch(listUsers());
        return () =>{
        };
    }, [successSave,successDelete,dispatch]);

    const openModal = (user) => {
        setModalVisible(true);
        values.id = user._id;
        values.userName = user.name;
        values.email=user.email;
        values.password = '';
        values.confirmPassword = '';
        values.phone = user.phone;
    }

    const {
      values, 
      handleInputChange, 
      errors, 
      setErrors
    } = useForm(initialLoginValues);
    
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
    
    const submitHandler = (e) => {
        e.preventDefault();
        if (validate()){
            dispatch(saveUser({_id:values.id, name:values.userName, email:values.email, password:values.password, phone:values.phone}));
        }
    }

    const deleteHandler = (userId) => {
        dispatch(deleteUser(userId));
    }
    
    return  <div className={classes.root}> 
    {!modalVisible && <div className={classes.productHeader}>
        <h2>Users</h2>
        <Button className={classes.button} variant="contained" color="primary" onClick ={()=>openModal({name:'',email:'',password:'',phone:''})}>Add New User</Button>
    </div>}
    {modalVisible && 
      <Grid container>
      <Paper elevation={10} className={classes.paper}>
          <Grid align="center">
            <h2>{(values.id)?"Update User":"Create New User"}</h2>
                {loading&&<div>Loading...</div>}
                {error&&<div style={{color:"red",margin:"10px 5px"}}>{error.response.data.msg}</div>}
                <TextField 
                  variant="outlined"
                  label="Username" 
                  name="userName"
                  value={values.userName} 
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
                  value={values.password} 
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
                  value={values.confirmPassword} 
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
                  value={values.email} 
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
                  value={values.phone} 
                  placeholder="Enter phone number here.." 
                  type="number" 
                  className={classes.textField}
                  fullWidth
                  onChange={handleInputChange}
                  {...(errors.phone && {error:true, helperText:errors.phone} )}
                  />
                <Button className={classes.button} variant="contained" color="primary" onClick={submitHandler} >
                    {(values.id)?"Update":"Create"}
                </Button>
                <Button className={classes.button} variant="contained" color="primary" onClick={()=>{setModalVisible(false)}} >
                    Cencel
                </Button>
                <Typography> Already have an account?
                  <Link href="/login">Signin</Link>
                </Typography>
            </Grid>
        </Paper>
    </Grid>
    }
    {!modalVisible && <div className={classes.autoScroll}>
        <table className={classes.table}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>email</th>
                    <th>Phone</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {users.map((user,count) => (
              <tr key={user._id}>
                <td>{count+1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <IconButton onClick={()=>openModal(user)} color="primary" aria-label="upload picture" component="span">
                    <EditIcon />
                  </IconButton>
                </td>
                <td>
                  <IconButton onClick={()=>deleteHandler(user._id)} color="secondary" aria-label="upload picture" component="span">
                    <DeleteForeverIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
            </tbody>
        </table>
    </div>
    }
    </div>
}

export default UserList;