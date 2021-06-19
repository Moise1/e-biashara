import React from 'react'
import {Container, Grid, Typography, Button} from '@material-ui/core';
import CartStyles from './styles';

export const Cart = props => {
    const classes = CartStyles();
    const {cart} = props;

    if(!cart.line_items) return (
        <div className={classes.noCartData}>
            <p>Loading...</p>
        </div>
    );

    const emptyCart =  (
        <Typography variant="subtitle1">
            You have no items in your shopping cart. Add some now!
        </Typography>
    )

    const filledCart = (
         <>
         <Grid container spacing={3}>
            {cart.line_items.map((item)=>(
                <Grid item xs={12} sm={4} key={item.id}>
                    <div>{item.name}</div>
                    {/* <CartItem/> */}
                </Grid>
            ))}
         </Grid>
         <div className={classes.cardDetails}>
            <Typography variant="h4">
                Subtotal: {cart.subtotal.formatted_with_symbol}
            </Typography>
            <div>
                <Button 
                className={classes.emptyButton} 
                size="large"
                type="button"
                variant="contained"
                color="secondary"
                >
                    Empty Cart
                </Button>
                <Button
                className={classes.checkoutButton} 
                size="large"
                type="button"
                variant="contained"
                color="primary"
                >
                    Checkout
                </Button>
            </div>
         </div>
         </>
    );

    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography variant="h4" className={classes.title}>Your Shopping Cart</Typography>
            {!cart.line_items.length ? emptyCart : filledCart} 
        </Container>
    )
}
