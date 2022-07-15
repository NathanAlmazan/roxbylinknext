import React from 'react';
// formik
import * as Yup from "yup";
import { Formik } from "formik";
// mui
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
// api
import axios from "axios";
import { Facility } from 'src/types/facility';

interface FacilityFormProps {
    open: boolean;
    initialData?: Facility;
    handleClose: () => void;
    updateFacilityList: (fcility: Facility) => void;
}

export default function FacilityForm({ open, initialData, handleClose, updateFacilityList }: FacilityFormProps) {
  return (
    <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
    >
        <Formik 
            initialValues={{
                facilityCode: initialData ? initialData.facilityCode : '',
                facilityName: initialData ? initialData.facilityName : '',
                facilityCapacity: initialData ? initialData.facilityCapacity : 1,
                submit: null
            }}
            validationSchema={Yup.object().shape({
                facilityCode: Yup.string().max(5, "Too long").required("Facility Code is required"),
                facilityName: Yup.string().max(64, "Too long").required("Facility Name is required"),
                facilityCapacity: Yup.number().min(1).required("Facility Capacity is required")
            })}
            onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                if (!initialData) {
                    submitNewFacility(values).then(data => {
                        setStatus({ success: true });
                        setSubmitting(false);
                        updateFacilityList(data);
                        handleClose();
                    }).catch(err => {
                        setStatus({ success: false });
                        setErrors({ submit: (err as Error).message });
                        setSubmitting(false);
                    })
                } else {
                    updateFacility(values).then(data => {
                        setStatus({ success: true });
                        setSubmitting(false);
                        updateFacilityList(data);
                        handleClose();
                    }).catch(err => {
                        setStatus({ success: false });
                        setErrors({ submit: (err as Error).message });
                        setSubmitting(false);
                    })
                }
                
            }}
        >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <Stack component="form" noValidate onSubmit={handleSubmit} direction="column" spacing={3} justifyContent="center" sx={{ m: 3 }}>
                <TextField 
                    disabled={initialData !== undefined}
                    label="Facility Code"
                    variant="standard"
                    name="facilityCode"
                    value={values.facilityCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.facilityCode && errors.facilityCode)}
                    helperText={Boolean(touched.facilityCode && errors.facilityCode) && errors.facilityCode}
                    fullWidth
                />
                <TextField 
                    label="Facility Name"
                    variant="standard"
                    name="facilityName"
                    value={values.facilityName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.facilityName && errors.facilityName)}
                    helperText={Boolean(touched.facilityName && errors.facilityName) && errors.facilityName}
                    fullWidth
                />
                <TextField 
                    type="number"
                    label="Facility Capacity"
                    variant="standard"
                    name="facilityCapacity"
                    value={values.facilityCapacity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.facilityCapacity && errors.facilityCapacity)}
                    helperText={Boolean(touched.facilityCapacity && errors.facilityCapacity) && errors.facilityCapacity}
                    fullWidth
                />
                <Button
                    disabled={isSubmitting}
                    type="submit"
                    color="secondary"
                    variant="contained"
                    size="large"
                    sx={{ minWidth: 300 }}
                >
                    Add Facility
                </Button>
            </Stack>
        )}
        </Formik>
    </Dialog>
  )
}

interface FacilityFormik {
    facilityCode: string;
    facilityName: string;
    facilityCapacity: number;
}

export async function submitNewFacility(form: FacilityFormik) {

    const body = JSON.stringify(form);

    const result = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/facility/create`, body, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return result.data as Facility;
}

export async function updateFacility(form: FacilityFormik) {

    const body = JSON.stringify(form);

    const result = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/facility/update`, body, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return result.data as Facility;
}