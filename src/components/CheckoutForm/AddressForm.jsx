import React, { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Grid, Typography, MenuItem, Button, TextField } from '@material-ui/core'
import { commerce } from '../../lib/commerce';
import { FormInput } from './FormInput';

export const AddressForm = props => {

    const { checkoutToken, next } = props;
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    
    const {handleSubmit, register, ...rest} = useForm();

    const fetchShippingCountries = async (checkoutTokenId) => {
        try {
            const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
            setShippingCountries(countries);
            setShippingCountry(Object.keys(countries)[0]);
        } catch (error) {
            error.data && console.log("FETCHING COUNTRIES FAILED:", error.data.error.message);
        }
    };

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };

    const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        try {
            const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
            setShippingOptions(options);
            setShippingOption(options[0].id);

        } catch (error) {
            error && console.log("SHIPPING FAILED:", error);
        }
    };

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []);

    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
        if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision]);

    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping address</Typography>
            <FormProvider {...rest}>
                <form onSubmit={handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
                    <Grid container spacing={3}>
                        <FormInput {...register("firstName")} name="firstName"  label="First name" />
                        <FormInput {...register("lastName")} name="lastName"  label="Last name" />
                        <FormInput {...register("address1")} name="address1" label="Address line 1" />
                        <FormInput {...register("email")} name="email"   label="Email"/>
                        <FormInput {...register("city")} name="city"  label="City" />
                        <FormInput {...register("zip")} name="zip"  label="Zip/Postal code" />
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Shipping Country"
                                variant='outlined'
                                select
                                value={shippingCountry}
                                fullWidth
                                onChange={(e) => setShippingCountry(e.target.value)}
                            >
                                {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                   {item.label}
                                </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <TextField
                                label="Shipping Subdivision"
                                variant="outlined"
                                select
                                value={shippingSubdivision}
                                fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}
                            >
                                {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <TextField
                                label="Shipping Options"
                                variant="outlined"
                                select
                                value={shippingOption}
                                fullWidth
                                onChange={(e) => setShippingOption(e.target.value)}
                            >
                                {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
}
