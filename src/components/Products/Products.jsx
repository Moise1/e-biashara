import React from 'react';
import {Grid} from '@material-ui/core';
import {Product} from './Product/Product';
import ProductsStyles from './styles';



export const Products = props => {
    const {productList, onAddToCart} = props;
    const classes = ProductsStyles();
    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justify="center" spacing={4}>
                {productList.map(p => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={p.id}>
                        <Product product={p} onAddToCart={onAddToCart}/>
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}
