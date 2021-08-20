import { Grid } from '@material-ui/core';
import React from 'react';
import AdminTabs from './AdminTab/AdminTabs';

function AdminScreen(props) {
    return (
        <Grid >
            <AdminTabs />
        </Grid>
    )
}

export default AdminScreen;