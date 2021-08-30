import { Button, Grid, IconButton, makeStyles, Paper, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import useForm from '../../components/Resue/useForm';
import { deleteUser, listUsers, saveUser } from '../../Redux/User/UserAction';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";


const initialLoginValues = {
    id:0,
    userName:'',
    loginID:'',
    email:'',
    password:'',
    confirmPassword:'',
    phone:'',
  }
  
const useStyles = makeStyles((theme) => ({
    paper:{
        padding: "10px",
        width: "300px",
        height: "80vh",
        margin:"8px auto",
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
    whiteSpace: "nowrap",
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
        values.id = user._id;
        values.userName = user.name;
        values.loginID = user.loginID;
        values.email=user.email;
        values.password = '';
        values.confirmPassword = '';
        values.phone = user.phone;
        setModalVisible(true);
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
        temp.loginID = values.loginID?"":"user ID field is required"
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
            dispatch(saveUser({_id:values.id, name:values.userName, loginID:values.loginID, email:values.email, password:values.password, phone:values.phone}));
        }
    }

    const deleteHandler = (userId) => {
        dispatch(deleteUser(userId));
    }
    
    return  <> 
    <div> 
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
                  label="Login ID" 
                  name="loginID"
                  value={values.loginID} 
                  placeholder="Enter Login ID here.."
                  fullWidth
                  className={classes.textField}
                  onChange={handleInputChange}
                  {...(errors.loginID && {error:true, helperText:errors.loginID} )}
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
            </Grid>
        </Paper>
    </Grid>
    }
    {!modalVisible && <div className={classes.autoScroll}>
        <table className={classes.table}>
            <thead>
                <tr>
                    <th>Sl no</th>
                    <th>Name</th>
                    <th>Login ID</th>
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
                <td>{user.loginID}</td>
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
    {!modalVisible && <Grid container justifyContent="center">
        <Button className={classes.button} size="small" variant="contained" color="primary" onClick ={()=>openModal({name:'',loginID:'',email:'',password:'',phone:''})}>Add New User</Button>
    </Grid>}
    </>
}

export default UserList;