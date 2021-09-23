import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, saveUser } from '../../../Redux/User/UserAction';
import useForm from '../../Resue/useForm';
import { StudentCard } from '../../Utils/StudentCard';

const initialLoginValues = {
    id:0,
    userName:'',
    loginID:'',
    email:'',
    password:'',
    confirmPassword:'',
    phone:'',
  }
    
const useStyles = makeStyles(theme => ({
    newButton:{
        position:"flex",
        top:"10px",
        borderRadius:"20px",
        fontSize:15,
        textTransform:"none"
    },
    paper:{
        padding: "10px",
        width: "300px",
        height: "80vh",
        margin:"8px auto",
    },
    dialogButton:{
        textTransform: "none",
        margin:"10px 5px"
    },
    textField:{
        margin:"5px 0"
    },
}))


function UserManagement(props) {
    const [open, setOpen] = React.useState(false);
    const userList = useSelector(state=>state.userList);
    const {users} = userList;
    const classes = useStyles()
    const saveList = useSelector(state=>state.userSave);
    const {success: successSave} = saveList;
    const dispatch = useDispatch();
    const  studentList = users.filter((stud)=>{return (stud.isAdmin === false)});

    const handleAddNew = () => {
        setDialogOpen({id:0, name:'', loginID:'', email:'', password:'', confirmPassword:'', phone:''})
    }

    const {
        values, 
        handleInputChange, 
        errors, 
        setErrors
    } = useForm(initialLoginValues);

    const setDialogOpen = (user) => {
        values.id = user.id;
        values.userName = user.name;
        values.loginID = user.loginID;
        values.email=user.email;
        values.password = user.password;
        values.confirmPassword = user.confirmPassword;
        values.phone = user.phone;
        setOpen(true)
    }
    
    useEffect(()=>{
        dispatch(listUsers());
        return () =>{
        };
    }, [successSave, dispatch]);

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

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = () => {
        if(validate()){
            dispatch(saveUser({_id:values.id, name:values.userName, loginID:values.loginID, email:values.email, password:values.password, phone:values.phone}));
            setOpen(false);
      }
    }

    return (
        <>
        {
            studentList.map((student,count) => (
                <StudentCard key={count} 
                    data={student}
                    setDialogOpen={setDialogOpen} 
                />
            ))
        }
        <Grid container justifyContent="center">
            <Button 
            className={classes.newButton} 
            color="primary" 
            variant="contained"
            size="small"
            onClick={handleAddNew}> 
                Add New 
            </Button>
        </Grid>
        <Dialog open={open} onClose={handleClose} classes={{paper: classes.dialog}}>
            <DialogTitle >{(values.id)?"Update User":"Create New User"}</DialogTitle>
            <DialogContent>
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
        </DialogContent>
        <DialogActions>
        <Button className={classes.dialogButton} variant="contained" color="primary" onClick={handleSubmit} >
            {(values.id)?"Update":"Create"}
        </Button>
        <Button className={classes.dialogButton} variant="contained" color="primary" onClick={()=>{setOpen(false)}} >
            Cencel
        </Button>
        </DialogActions>
        </Dialog>
    </>
    )
}

export default UserManagement;