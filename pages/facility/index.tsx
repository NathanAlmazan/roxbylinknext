import * as React from 'react';
// next
import type { NextPage, GetServerSideProps } from 'next';
import Head from "next/head";
import Image from "next/image";
// mui
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// components
import Appbar from "src/components/Appbar";
import FacilityList from "src/components/Sections/Facility";
import FacilityForm from "src/components/Forms/Facility";
// icons
import AddIcon from "@mui/icons-material/Add";
// api
import axios from 'axios';
import { Facility } from "src/types/facility"

interface FacilityPageProps {
    facilities: Facility[];
}

const FacilityPage: NextPage<FacilityPageProps> = (props: FacilityPageProps) => {
    const { facilities } = props;
    const [open, setOpen] = React.useState<boolean>(false); 
    const [selected, setSelected] = React.useState<Facility>();
    const [filteredFacilities, setFilteredFacilities] = React.useState<Facility[]>(facilities);

    const handleUpdateFacilities = (facility: Facility) => {
        const index = filteredFacilities.findIndex(f => f.facilityCode === facility.facilityCode)
        if (index === -1) {
            setFilteredFacilities([ ...filteredFacilities, facility ])
        } else {
            let temp = filteredFacilities;
            temp[index] = facility;
            setFilteredFacilities(temp);
        }
    }

    const handleRemoveFacility = (code: string) => setFilteredFacilities(filteredFacilities.filter(f => f.facilityCode !== code));

    const handleSelectFacility = (facility: Facility) => {
        setSelected(facility);
        setOpen(true);
    }

    return (
        <>
            <Head>
                <title>Facilities</title>
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
                        src="/covers/office.jpg"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="left center"
                    />
                </Box>
                <Box sx={{ position: "absolute", top: 350, right: 0, width: "100%" }}>
                    <Container component={Paper} elevation={8} sx={{ mb: 8, height: 900, pt: 2 }}>
                        <Stack direction="column" spacing={2} justifyContent="space-between">

                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <Image 
                                    src="/covers/logo.png"
                                    alt="Roxby Link"
                                    width={300}
                                    height={100}
                                />
                                <Typography variant="h2" color="secondary">
                                    Facilities
                                </Typography>
                            </Stack>

                            <Stack direction="row" justifyContent="end" alignItems="center">
                                <Button size="large" variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
                                    Add Facility
                                </Button>
                            </Stack>

                            <FacilityList facilities={filteredFacilities} selectFacility={handleSelectFacility} removeFacility={handleRemoveFacility} />

                        </Stack>
                    </Container>

                    <FacilityForm open={open} initialData={selected} handleClose={() => setOpen(!open)} updateFacilityList={handleUpdateFacilities} />

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

export default FacilityPage