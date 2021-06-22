import React from 'react'
import { Link, useLocation} from 'react-router-dom';
import { AppBar, IconButton, Badge, Typography, Toolbar } from '@material-ui/core';
import { AddShoppingCart as ShoppingCart } from '@material-ui/icons'
import logo from '../../assets/images/shop.png';

import NavbarStyles from './styles';

export const Navbar = props => {
    const classes = NavbarStyles();
    const { totalItems } = props;
    const location = useLocation();


    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="E-Biashara" height="25" className={classes.image} />
                        E-Biashara
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.button}>
                       {location.pathname === '/' && (
                            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                       )}
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}
