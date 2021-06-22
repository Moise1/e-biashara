import React, { useState, useEffect } from 'react';
import {
    Paper, Stepper, Step, StepLabel,
    Typography, CircularProgress,
    Divider, Button, CssBaseline
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import CheckoutStyles from './styles';
import { PaymentForm } from '../PaymentForm';
import { AddressForm } from '../AddressForm';
import { commerce } from '../../../lib/commerce';

const steps = ['Shipping adress', 'Payment details'];

export const Checkout = props => {

    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState({});
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const classes = CheckoutStyles();
    const { cart, error, onCaptureCheckout, order, history } = props;

    useEffect(() => {
        const makeToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                setCheckoutToken(token);
            } catch (error) {
                history.push('/');
            }
        }
        makeToken();
    }, [cart]);

    const handleNext = () => setActiveStep(prevActiveStep => prevActiveStep + 1)
    const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);

    const next = (data) => {
        setShippingData(data);
        handleNext();
    };

    const Form = () => activeStep === 0 ?
        <AddressForm checkoutToken={checkoutToken} next={next} /> :
        <PaymentForm
            shippingData={shippingData}
            checkoutToken={checkoutToken}
            handleNext={handleNext}
            handleBack={handleBack}
            onCaptureCheckout={onCaptureCheckout}
            timeout={timeout}
        />;

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
        }, 3000);
    }

    let Confirmation = () => order.custtomer ? (
        <>
            <div>
                <Typography variant="h5">Thanks for your purchase, {order.customer.firstname} {order.customer.lastname}  </Typography>
                <Divider classes={classes.divider} />
                <Typography variant="subtitle2">Order ref: {order.customer_reference} </Typography>
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Back Home</Button>
        </>
    ) : isFinished ? (
        <>
            <div>
                <Typography variant="h5">Thanks for your purchase </Typography>
                <Divider classes={classes.divider} />
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Back Home</Button>
        </>
    ) : (
                <div className={classes.spinners}>
                    <CircularProgress />
                </div>
            );

    if (error) {
        <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Back Home</Button>
        </>
    }

    return (
        <>
            <CssBaseline />
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map(step => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    )
}
