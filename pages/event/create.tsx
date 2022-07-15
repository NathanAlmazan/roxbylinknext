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

interface CreateEventProps {
    facilities: Facility[];
}

const CreateEventPage: NextPage<CreateEventProps> = (props: CreateEventProps) => {
    const { facilities } = props;

    return (
        <>
            <Head>
                <title>Create Event</title>
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
                    <CreateEventForm facilities={facilities} />
                </Box>
            </Box>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const response = await axios.get(`${process.env.API_BASE_URL}/api/facility/all`, { headers: {
        'Accept': 'application/json'
    }})

    const facilities: Facility[] = response.data;

    return {
        props: { 
            facilities,
        }
    }
}

export default CreateEventPage