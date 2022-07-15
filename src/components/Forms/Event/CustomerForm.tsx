import React from 'react';
// formik
import { FormikErrors, FormikTouched } from "formik";
// mui
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";

interface FormValues { 
    commName: string;
    contactPerson: string;
    phone: string;
    email: string;
    street: string;
    barangay: string;
    city: string;
    province: string;
    zipcode: string;
}

interface CustomerFormProps {
    values: FormValues;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    errors: FormikErrors<FormValues>;
    touched: FormikTouched<FormValues>;
}

export default function CustomerForm({ values, handleChange, handleBlur, errors, touched }: CustomerFormProps) {
    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <Typography variant="h4" component="div">
                    Contact Information
                </Typography>
                <Divider />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField 
                    label="Community/Organization Name"
                    variant="standard"
                    name="commName"
                    value={values.commName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.commName && errors.commName)}
                    helperText={Boolean(touched.commName && errors.commName) && errors.commName}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField 
                    label="Contact Person"
                    variant="standard"
                    name="contactPerson"
                    value={values.contactPerson}
                    onChange={handleChange}
                    error={Boolean(touched.contactPerson && errors.contactPerson)}
                    helperText={Boolean(touched.contactPerson && errors.contactPerson) && errors.contactPerson}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField 
                    type="number"
                    label="Phone"
                    variant="standard"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={Boolean(touched.phone && errors.phone) && errors.phone}
                    fullWidth
                    InputProps={{
                        startAdornment: <InputAdornment position="start">+63</InputAdornment>
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField 
                    label="Email"
                    variant="standard"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email && errors.email)}
                    helperText={Boolean(touched.email && errors.email) && errors.email}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="div">
                            Postal Address
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField 
                            label="House No. and Street"
                            variant="standard"
                            name="street"
                            value={values.street}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.street && errors.street)}
                            helperText={Boolean(touched.street && errors.street) && errors.street}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField 
                            label="Barangay"
                            variant="standard"
                            name="barangay"
                            value={values.barangay}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.barangay && errors.barangay)}
                            helperText={Boolean(touched.barangay && errors.barangay) && errors.barangay}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <TextField 
                            label="City"
                            variant="standard"
                            name="city"
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.city && errors.city)}
                            helperText={Boolean(touched.city && errors.city) && errors.city}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <TextField 
                            label="Province"
                            variant="standard"
                            name="province"
                            value={values.province}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.province && errors.province)}
                            helperText={Boolean(touched.province && errors.province) && errors.province}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField 
                            type="number"
                            label="Zipcode"
                            variant="standard"
                            name="zipcode"
                            value={values.zipcode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.zipcode && errors.zipcode)}
                            helperText={Boolean(touched.zipcode && errors.zipcode) && errors.zipcode}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

