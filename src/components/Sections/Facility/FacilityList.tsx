import React from 'react';
// mui
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
// icons
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
// types 
import { Facility } from "src/types/facility";
// api
import axios from "axios";

interface FacilityListProps {
    facilities: Facility[];
    selectFacility: (facility: Facility) => void;
    removeFacility: (code: string) => void;
}

export default function FacilityList({ facilities, selectFacility, removeFacility }: FacilityListProps) {

  const handleDeleteFacility = async (code: string) => {
    await deleteFacility(code);
    removeFacility(code);
  }

  return (
    <Grid container spacing={1} alignItems="center" sx={{ overflowY: 'auto', maxHeight: 900 }}>
      {facilities.map(f => (
        <Grid key={f.facilityCode} item xs={12} sm={4}>
          <Card variant="outlined" sx={{ minWidth: 300 }}>
            <CardHeader 
              title={f.facilityName}
              subheader={`Max Capicity: ${f.facilityCapacity}`}
              action={
                <Stack direction="row">
                  <Tooltip title="Update Facility">
                    <IconButton color="secondary" onClick={() => selectFacility(f)}>
                      <ModeEditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Facility">
                    <IconButton color="error" onClick={() => handleDeleteFacility(f.facilityCode)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              }
            />
            <CardContent>
              <Stack direction="row" justifyContent="center"  spacing={5} sx={{ width: "100%" }}>
                <Stack direction="column" justifyContent="center" alignItems="center">
                  <Typography variant="h3">
                    {f.facilityEvents ? padLeadingZeros(f.facilityEvents.eventCount, 3) : padLeadingZeros(0, 3)}
                  </Typography>
                  <Typography variant="subtitle2">
                    Expected Events
                  </Typography>
                </Stack>
                <Stack direction="column" justifyContent="center" alignItems="center">
                  <Typography variant="h3">
                    {f.facilityEvents ? padLeadingZeros(f.facilityEvents.totalParticipants, 3) : padLeadingZeros(0, 3)}
                  </Typography>
                  <Typography variant="subtitle2">
                    Expected Participants
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

function padLeadingZeros(num: number, size: number) {
  var s = num+"";

  while (s.length < size) s = "0" + s;
  return s;
}

export async function deleteFacility(facilityCode: string) {

  const result = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/facility/delete/${facilityCode}`, {
      headers: {
          'Accept': 'application/json'
      }
  })

  return result.data as Facility;
}