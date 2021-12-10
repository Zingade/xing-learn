import React, { Fragment } from "react";
import AdminCards from '../components/AdminCards'
import { Grid } from "@material-ui/core";

const AdminScreen = () => {

  return (
    <Fragment>
        <Grid container justifyContent="center" style={{display:"flex"}}>
          <AdminCards/>
        </Grid>
    </Fragment>
  );
};

export default AdminScreen;
