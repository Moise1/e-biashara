import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core'
import { AddShoppingCart as ShoppingCart } from '@material-ui/icons'
import ProductStyles from './styles';


export const Product = props => {
    const { product } = props;
    const classes = ProductStyles();
    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={product.image}
                title={product.name}
            />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.name} 
                    </Typography> 

                    <Typography variant="h5">
                        {product.price}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                        {product.desc}
                    </Typography>
                </div>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to cart">
                    <ShoppingCart/>
                </IconButton>
            </CardActions>
        </Card>
    )
}
