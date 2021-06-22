import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import CartStyles from './styles';
import { CartItem } from './CartItem/CartItem';

export const Cart = props => {
    const classes = CartStyles();
    const { cart, updateQty, removeFromCart, emptyCart } = props;

    if (!cart.line_items) return (
        <div className={classes.noCartData}>
            <p>Loading...</p>
        </div>
    );

    const emptiedCart = (
        <Typography variant="subtitle1">
            You have no items in your shopping cart. <Link to="/" className={classes.link}>Add some now!</Link>
        </Typography>
    )

    const filledCart = (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem
                            item={item}
                            updateQty={updateQty}
                            removeFromCart={removeFromCart}
                        />
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
                        onClick={emptyCart}
                    >
                        Empty Cart
                </Button>
                    <Button
                        component={Link}
                        to="/checkout"
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
            <div className={classes.toolbar} />
            <Typography variant="h4" className={classes.title} gutterBottom>Your Shopping Cart</Typography>
            {!cart.line_items.length ? emptiedCart : filledCart}
        </Container>
    )
}
