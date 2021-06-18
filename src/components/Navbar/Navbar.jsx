import React from 'react'
import { AppBar, ToolBar, IconButton, Badge, Menu, MenuItem, Typography, Toolbar} from '@material-ui/core';
import { AddShoppingCart as ShoppingCart } from '@material-ui/icons'
import logo from '../../assets/images/shop.png';
import NavbarStyles from './styles';

export const Navbar = () => {

    const classes = NavbarStyles();
    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="E-Biashara" height="25" className={classes.image}/>
                        E-Biashara
                    </Typography>
                    <div className={classes.grow}/>
                    <div className={classes.button}>
                        <IconButton aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={2} color="secondary">
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}
