import * as React from 'react';
// next
import type { NextPage, GetServerSideProps } from 'next';
import Head from "next/head";
import Image from "next/image";
// mui
import Box from "@mui/material/Box";
// components
import Appbar from "src/components/Appbar";
import CreateEventForm from 'src/components/Forms/Event';
// api
import axios from 'axios';
import { Facility } from "src/types/facility"
import { Event, EventInput } from 'src/types/event';

interface CreateEventProps {
    facilities: Facility[];
    events: Event[];
}

const CreateEventPage: NextPage<CreateEventProps> = (props: CreateEventProps) => {
    const { facilities, events } = props;
    const [eventList, setEvents] = React.useState<EventInput[]>([]);
    const [facilityCodes, setFacilities] = React.useState<string[]>([]);

    React.useEffect(() => {
        let facilityList: string[] = []
        let eventList: EventInput[] = []

        events.forEach(event => {
            const { eventId, eventDate, participantsNum, timeStart, timeEnd } = event;

            if (!eventList.find(e => e.eventId === event.eventId)) eventList.push({
                eventDate: eventDate,
                timeStart: `${eventDate}T${timeStart}`,
                timeEnd: `${eventDate}T${timeEnd}`,
                participantsNum: participantsNum,
                eventId: eventId
            })

            event.facilities.forEach(facility => {
                if (!facilityList.includes(facility)) facilityList.push(facility)
            })
        })

        setEvents(state => eventList)
        setFacilities(state => facilityList)

    }, [events])

    return (
        <>
            <Head>
                <title>Update Event</title>
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
                        src="/covers/outdoor.jpg"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="right bottom"
                    />
                </Box>
                <Box sx={{ position: "absolute", top: 500, right: 0, width: "100%" }}>
                    <CreateEventForm 
                        facilities={facilities} 
                        initialData={{
                            events: eventList,
                            facilities: facilityCodes,
                            purpose: events[0].purpose,
                            customer: events[0].customer
                        }}
                    />
                </Box>
            </Box>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { query } = ctx;

    const response = await axios.get(`${process.env.API_BASE_URL}/api/facility/all`, { headers: {
        'Accept': 'application/json'
    }})

    const eventsResp = await axios.get(`${process.env.API_BASE_URL}/api/event/find/${query.eventId}`, { headers: {
        'Accept': 'application/json'
    }})

    const facilities: Facility[] = response.data;
    const events: Event[] = eventsResp.data;

    if (events.length === 0) return {
        notFound: true
    }

    return {
        props: { 
            facilities,
            events
        }
    }
}

export default CreateEventPage