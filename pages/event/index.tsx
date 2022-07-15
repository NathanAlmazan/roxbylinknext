import * as React from 'react';
// next
import type { NextPage, GetServerSideProps } from 'next';
import Head from "next/head";
import Image from "next/image";
import { useRouter } from 'next/router';
// mui
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// components
import Appbar from "src/components/Appbar";
import Calendar from "src/components/Sections/Event/Calendar";
import EventTable from 'src/components/Sections/Event/EventTable';
// icons
import AddIcon from "@mui/icons-material/Add";
// api
import axios from 'axios';
import { Event, EventByDate } from "src/types/event";

interface EventsPageProps {
    events: Event[];
    eventByDate: EventByDate[]
}

const EventsPage: NextPage<EventsPageProps> = (props: EventsPageProps) => {
    const { events, eventByDate } = props;
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Events</title>
            </Head>
            <Box sx={{ position: "relative" }}>
                <Appbar />
                <Box
                    sx={{
                        width: "100vw",
                        height: 800,
                        position: "relative"
                    }}
                >
                    <Image 
                        alt="Art Gallery"
                        src="/covers/outdoor2.jpg"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="left bottom"
                    />
                </Box>
                <Box sx={{ position: "absolute", top: 350, right: 0, width: "100%" }}>
                    <Container component={Paper} elevation={8} sx={{ mb: 8, p: 2 }}>
                        <Stack direction="column" spacing={2} justifyContent="space-between">

                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <Image 
                                    src="/covers/logo.png"
                                    alt="Roxby Link"
                                    width={300}
                                    height={100}
                                />
                                <Typography variant="h2" color="secondary">
                                    Events
                                </Typography>
                            </Stack>

                            <Stack direction="row" justifyContent="end" alignItems="center">
                                <Button size="large" variant="contained" startIcon={<AddIcon />} onClick={() => router.push("/event/create")}>
                                    Create Event
                                </Button>
                            </Stack>

                            <Calendar events={eventByDate} />

                            <EventTable events={events} />
                        </Stack>
                    </Container>
                </Box>
            </Box>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const fatchEvents = await axios.get(`${process.env.API_BASE_URL}/api/event/all`, { headers: {
        'Accept': 'application/json'
    }})

    const fetchEventsByDate = await axios.get(`${process.env.API_BASE_URL}/api/event/all/summary`, { headers: {
        'Accept': 'application/json'
    }})

    const events: Event[] = fatchEvents.data;
    const eventByDate: EventByDate[] = fetchEventsByDate.data;

    return {
        props: { 
            events,
            eventByDate
        }
    }
}

export default EventsPage