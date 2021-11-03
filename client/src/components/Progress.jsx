import React from 'react';
import { CircularProgress, Grid } from '@mui/material';

export const Progress = () => {
    return (
        <Grid
            sx={{ height: 'calc(100vh - 115px)' }}
            container
            alignItems="center"
            justifyContent="center">
            <CircularProgress />
        </Grid>
    );
}
