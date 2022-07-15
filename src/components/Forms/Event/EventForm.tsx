import React, { useState } from 'react';
// next
import Image from "next/image";
import { useRouter } from 'next/router';
// formik
import * as Yup from "yup";
import { Formik } from "formik";
// mui
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
// components
import CustomerForm from "./CustomerForm";
import EventList from "./EventList";
import EventFacilities from "./EventFacilities";
// types
import { Facility } from "src/types/facility";
import { Event, EventInput, EventVars } from "src/types/event";
// utils
import _ from 'lodash';
// api
import axios from "axios";

interface EventFormProps {
    facilities: Facility[];
}

export default function EventForm({ facilities }: EventFormProps) {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const handleAddEvent = (input: EventInput) => setEvents([ ...events, input ]);
  const handleRemoveEvent = (input: EventInput) => setEvents(events.filter(e => _.isEqual(e, input) === false));

  const addSelectedFacility = (code: string) => setSelected([ ...selected, code ])
  const removeSelectedFacility = (code: string) => setSelected(selected.filter(s => s !== code))

  const handleSelectFacility = (code: string, exists: boolean) => {
    if (exists) removeSelectedFacility(code);
    else addSelectedFacility(code);
  }

  return (
    <Container component={Paper} elevation={8} sx={{ p: 3, mb: 8 }}>
        <Formik
            initialValues={{
                commName: '',
                contactPerson: '',
                phone: '',
                email: '',
                street: '',
                barangay: '',
                city: '',
                province: '',
                zipcode: '',
                purpose: '',
                timeStart: new Date(),
                timeEnd: new Date(),
                eventDate: new Date(),
                participantsNum: 1,
                submit: null
            }}
            validationSchema={Yup.object().shape({
                commName: Yup.string().max(64).required("Community/Organization Name is required"),
                contactPerson: Yup.string().max(64).required("Contact person is required"),
                phone: Yup.string().min(10, "invalid phone number").max(10, "Invalid phone number").required("Phone number is required"),
                email: Yup.string().email().required("Email is required"),
                street: Yup.string().max(64).required("Street is required."),
                barangay: Yup.string().max(64).required("Barangay is required."),
                city: Yup.string().max(64).required("City is required."),
                province: Yup.string().max(64).required("Province is required."),
                zipcode: Yup.string().max(4).required("Zipcode is required."),
                participantsNum: Yup.number().min(1, "Participants cannot be 0").required("Participants is required")
            })}
            onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                submitNewEvent(values, events, selected).then(data => {
                    setStatus({ success: true });
                    setSubmitting(false);
                    router.push("/event");
                }).catch(err => {
                    setStatus({ success: false });
                    setErrors({ submit: (err as Error).message });
                    setSubmitting(false);
                })
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
                <Stack direction="column" component="form" spacing={4} noValidate onSubmit={handleSubmit}>
                    <Stack direction="row" justifyContent="center">
                        <Image 
                            src="/covers/logo.png"
                            alt="Roxby Link"
                            width={300}
                            height={100}
                        />
                    </Stack>
                    <CustomerForm 
                        values={values} 
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    <EventList
                        events={events}
                        values={values} 
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                        addEvent={handleAddEvent}
                        removeEvent={handleRemoveEvent}
                    />
                    <EventFacilities 
                        facilities={facilities}
                        selected={selected}
                        selectFacility={handleSelectFacility}
                    />

                    {errors.submit && (
                        <FormHelperText error>{errors.submit}</FormHelperText>
                    )}

                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        color="secondary"
                        variant="contained"
                        size="large"
                    >
                        Submit Event
                    </Button>
                </Stack>
            )}
        </Formik>
    </Container>
  )
}

interface EventFormik {
    commName: string;
    contactPerson: string;
    phone: string;
    email: string;
    street: string;
    barangay: string;
    city: string;
    province: string;
    zipcode: string;
    purpose: string;
    timeStart: Date;
    timeEnd: Date;
    eventDate: Date;
    participantsNum: number;
}

export async function submitNewEvent(form: EventFormik, events: EventInput[], facilities: string[]) {
    

    let allEvents: EventVars[] = events.map(e => {
        let date = new Date(e.eventDate);
        date.setDate(date.getDate() + 1);

        return ({
            purpose: form.purpose,
            timeStart: new Date(e.timeStart).toString().split(" ")[4],
            timeEnd:  new Date(e.timeEnd).toString().split(" ")[4],
            eventDate: date.toISOString().split("T")[0],
            participantsNum: e.participantsNum,
            customer: {
                commName: form.commName,
                contactPerson: form.contactPerson,
                phone: form.phone,
                email: form.email,
                postAddress: [form.street, form.barangay, form.city, form.province, form.zipcode].join(" "),
            },
            facilities: facilities
    })});

    const body = JSON.stringify(allEvents);

    const result = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/event/register`, body, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return result.data as Event[];
}