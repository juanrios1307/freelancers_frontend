import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, IconButton, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles= makeStyles(()=>({
    root:{
        flexGrow: 1,
        backgroundColor: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
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
                <Toolbar>
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