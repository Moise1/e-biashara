import React, { useState, useEffect } from 'react';
import { Products, Navbar, Cart } from './components';
import { commerce } from './lib/commerce';

export const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts = async () => {
        const {data} = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async () => {
        const cartData = await commerce.cart.retrieve();
        setCart(cartData);
    }

    const handleAddToCart = async (productId, quantity) => {
        const response = await commerce.cart.add(productId, quantity);
        setCart(response.cart);
    }
    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);
    
    return (
        <div>
            <Navbar totalItems={cart.total_items}/>
            {/* <Products
                productList={products}
                onAddToCart={handleAddToCart}
            /> */}
            <Cart cart={cart}/>
        </div>
    )
}


// Stopped at 1:15:40;