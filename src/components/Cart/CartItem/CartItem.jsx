import React from 'react'
import {Card, CardContent, CardMedia, CardActions, Button, Typography} from '@material-ui/core';
import CartItemStyles from './styles';

export const CartItem = (props) => {
    const classes = CartItemStyles();
    const { item, updateQty, removeFromCart } = props;
    return (
        <Card>
            <CardMedia image={item.media.source} alt={item.name} className={classes.media}/>
            <CardContent className={classes.cardContent}>
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button type="button" size="small" onClick={() => updateQty(item.id, item.quantity - 1)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" size="small" onClick={()=> updateQty(item.id, item.quantity + 1)}>+</Button>
                </div>
                <Button type="button"  variant="contained" color="secondary" onClick={() => removeFromCart(item.id,)}>Remove</Button>
            </CardActions>
        </Card>
    )
}
