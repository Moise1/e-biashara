import React, { useState, useEffect } from 'react';
import { Products, Navbar, Cart, Checkout } from './components';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProducts = async () => {
        try {
            const { data } = await commerce.products.list();
            setProducts(data)

        } catch (error) {
            error && console.log('FETCHING PRODUCTS FAILED:', error)
        }
    }

    const fetchCart = async () => {
        try {
            const cartData = await commerce.cart.retrieve();
            setCart(cartData)
        } catch (error) {
            error && console.log('RETRIEVING CART FAILED:', error)
        }
    }

    const handleAddToCart = async (productId, quantity) => {
        try {
            const { cart } = await commerce.cart.add(productId, quantity);
            setCart(cart);
        } catch (error) {
            error && console.log('ADDING TO CART FAILED:', error)
        }
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        try {
            const { cart } = await commerce.cart.update(productId, { quantity });
            setCart(cart);
        } catch (error) {
            error && console.log('UPDATING CART FAILED:', error)
        }
    };

    const handleRemoveFromCart = async (productId) => {
        try {
            const { cart } = await commerce.cart.remove(productId);
            setCart(cart);
        } catch (error) {
            error && console.log('REMOVING FROM CART FAILED:', error)

        }
    }

    const handleEmptyCart = async () => {
        try {
            const { cart } = await commerce.cart.empty();
            setCart(cart);
        } catch (error) {
            error && console.log('EMPTYING CART FAILED:', error)
        }
    }

    const refreshCart = async () => {
        try {
            const newCart = await commerce.cart.refresh();
            setCart(newCart);
        } catch (error) {
            error && console.log('REFRESHING CART FAILED:', error)
        }
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            setOrder(incomingOrder);
            refreshCart();
        } catch (error) {
            if (error) setErrorMessage(error.data.error.message);

        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items} />
                <Switch>
                    <Route exact path="/" render={() => <Products
                        productList={products}
                        onAddToCart={handleAddToCart}
                    />} />
                    <Route exact path="/cart" render={() => <Cart
                        cart={cart}
                        updateQty={handleUpdateCartQty}
                        removeFromCart={handleRemoveFromCart}
                        emptyCart={handleEmptyCart}
                    />} />
                    <Route exact path="/checkout" render={(props) => <Checkout
                        cart={cart}
                        order={order}
                        onCaptureCheckout={handleCaptureCheckout}
                        error={errorMessage}
                        {...props}
                    />}/>
                </Switch>
            </div>
        </Router>
    )
}
