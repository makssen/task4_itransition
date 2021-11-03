import { Button, Grid, Typography } from '@mui/material';
import React, { useContext } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Context } from '../context/ContextProvider';
import { Redirect } from 'react-router-dom';

export const Login = () => {

    const { isAuth, countStatistics } = useContext(Context);

    const login = (type) => {
        window.open(`https://react-chat-itra.herokuapp.com/auth/${type}`, '_self');
    }

    if (isAuth) return <Redirect to="/messages" />

    return (
        <Grid container>
            <Grid item sx={{ margin: '100px auto' }}>
                <h2 style={{ textAlign: 'center' }}>Login</h2>
                <Button
                    onClick={() => login('google')}
                    variant="outlined"
                    color="error"
                    sx={{ mr: 1 }}
                    startIcon={<GoogleIcon color="error" />}
                >
                    Google
                </Button>
                <Button
                    onClick={() => login('facebook')}
                    variant="outlined"
                    sx={{ mr: 1 }}
                    startIcon={<FacebookIcon />}
                >
                    Facebook
                </Button>
                <Button
                    onClick={() => login('twitter')}
                    variant="outlined"
                    startIcon={<TwitterIcon />}
                >
                    Twitter
                </Button>
                <Typography sx={{ mt: 2 }} variant="h5" textAlign="center">
                    {countStatistics('Bro!')} Bro! {countStatistics('Sis!')} Sis!
                </Typography>
            </Grid>
        </Grid>
    );
}
