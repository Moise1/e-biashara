import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {Grid, TextField } from '@material-ui/core';

export  const FormInput = props => {
  const {name, label} = props;
  const { control } = useFormContext();
  const isError = false;

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        render={({field})=>(
            <TextField
                variant="outlined"
                {...field}
                label={label}
                fullWidth
                required
            />
        )}
        defaultValue=""
        name={name}
        control={control}
        error={isError}
      />
    </Grid>
  );
}

