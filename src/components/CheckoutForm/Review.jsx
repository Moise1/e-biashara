import React from 'react'
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

export const Review = props => {
    const { checkoutToken } = props;
    return (
        <>
            <Typography variant="h6" gutterBottom>Order Summary</Typography>
            <List disablePadding>
                {checkoutToken.live && checkoutToken.live.line_items.map(p => (
                    <ListItem key={p.name} style={{ padding: '10px 0' }}>
                        <ListItemText primary={p.name} secondary={`Quantity: ${p.quantity}`} />
                        <Typography variant="body2">{p.line_total.formatted_with_symbol}</Typography>
                    </ListItem>
                ))}
                <ListItem style={{ padding: '10px 0' }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                        {checkoutToken.live.subtotal.formatted_with_symbol}
                    </Typography>
                </ListItem>
            </List>
        </>
    )
}
