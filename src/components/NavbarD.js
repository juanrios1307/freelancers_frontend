import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, IconButton, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles= makeStyles(()=>({
    root:{
        flexGrow: 1,
        background: 'linear-gradient(90deg, rgb(29, 115, 91) 0%, rgb(40, 121, 19) 100%)'
    },
    toolbar:{
        background: 'linear-gradient(90deg, rgb(29, 115, 91) 0%, rgb(40, 121, 19) 100%)'
    },
    menuButton:{
        marginRight: '16px'
    },
    title:{
        flexGrow: 1,
    },
    imagen:{
        borderRadius: '50%'
    }
}));

function NavbarD() {
    const classes= useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        QuickServices
                    </Typography>

                    <IconButton color="inherit">
                        <img src={require('../assets/images/icono1.png')} width="40px" height="40px" className={classes.imagen}/>
                    </IconButton>
                </Toolbar>

            </AppBar>

        </div>
    );
}

export default NavbarD;