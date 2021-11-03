import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Context } from '../context/ContextProvider';
import { ListItem, ListItemButton } from '@mui/material';
import { useHistory } from 'react-router-dom';

export const Navbar = () => {

    const { logout, isAuth } = useContext(Context);
    const history = useHistory();

    return (
        <Box sx={{ flexGrow: 1, marginBottom: '30px' }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        React Chat
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {isAuth &&
                            <ListItem
                                onClick={() => logout().then(history.push('/'))}
                                size="large"
                                color="inherit"
                            >
                                <ListItemButton>
                                    Sign out
                                </ListItemButton>
                            </ListItem>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
