import React from 'react';
import {Grid} from '@material-ui/core';
import {Product} from './Product/Product';
import shoes from '../../assets/images/shoes.jpg';
import macbook from '../../assets/images/macbook.jpg';
import ProductsStyles from './styles';

const productList = [
    {id: 1, name: 'Shoes', desc: 'Running shoes', price: "$30.5", image: shoes},
    {id: 2, name: 'MacBook', desc: "Apple's laptop", price: "$100.5", image: macbook}
];

export const Products = () => {
    const classes = ProductsStyles();
    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justify="center" spacing={4}>
                {productList.map(p => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={p.id}>
                        <Product product={p}/>
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}
