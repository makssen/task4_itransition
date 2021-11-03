import { Grid, Typography } from '@mui/material';
import React from 'react'

export const Message = ({ message, username, createdAt }) => {
    return (
        <Grid
            item
            sx={{
                borderRadius: 10,
                padding: '7px 20px',
                mb: 2,
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'
            }}
        >
            <Typography variant="h5">{message}</Typography>
            <Typography variant="body2">
                Sent by {username} at {new Date(createdAt).toLocaleTimeString().substring(0, 5)}
            </Typography>
        </Grid>
    );
}
