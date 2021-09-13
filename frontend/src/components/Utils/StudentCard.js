import React from 'react';
import { IconButton, Card, CardContent, Grid, makeStyles, Typography, Tooltip } from '@material-ui/core';
import { MdModeEdit } from 'react-icons/md';
const tempPassword = process.env.TEMP_PASSWORD || 'undukushu';

const useStyles = makeStyles((theme) => ({
    studentCard:{
        margin:"2px 2px",
        padding:0,
        width: "320px",
        height:"auto",
        textAlign:"left",    
        borderRadius:"20px",    
        backgroundColor:"#edeeef",
    },
    level1Text:{
        color:"#007bff", 
        fontSize: 15, 
    },
    level2Text:{
        color:"#6c757d", 
        fontSize: 12, 
        fontWeight:600,
    },
    button: {
        float:"right",
        padding:"2px",    
        fontSize:12,
      },
}))

const StudentCard = (props) => {
    const classes = useStyles();
    const {data, setDialogOpen} = props;

    const handleEdit = () => {
        setDialogOpen({id:data._id, name:data.name, loginID:data.loginID, email:data.email, password:(data._id)?tempPassword:'', confirmPassword:(data._id)?tempPassword:'', phone:data.phone})
    }

    return (
        <Grid item component={Card} elevation={10} className={classes.studentCard}>
            <CardContent style={{padding:"8px"}}>
                <Typography className={classes.level1Text}>{data.name}
                    <Tooltip title="Edit">
                        <IconButton onClick={handleEdit} className={classes.button}> <MdModeEdit fontSize={"large"}/>Edit</IconButton>
                    </Tooltip>
                </Typography>
                <Typography className={classes.level2Text}>User ID: <span style={{color:"#28a745", fontSize:"12px"}}>{data.loginID}</span></Typography>
                <Typography className={classes.level2Text}>email:<span style={{color:"#28a745", fontSize:"12px"}}>{data.email}</span></Typography>
                <Typography className={classes.level2Text}>Phone: <span style={{color:"#28a745", fontSize:"12px"}}>{data.phone}</span></Typography>
            </CardContent>
        </Grid>
    )
}

export {StudentCard};