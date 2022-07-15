import React from 'react';
// mui
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
// types
import { Facility } from "src/types/facility";

interface EventFacilities {
    facilities: Facility[];
    selected: string[];
    selectFacility: (code: string, exists: boolean) => void;
}

export default function EventFacilities({ facilities, selected, selectFacility }: EventFacilities) {
  return (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography variant="h4" component="div">
                Venue Requirements
            </Typography>
            <Typography variant="body2" component="div" gutterBottom>
                Please specify all areas required.
            </Typography>
            <Divider />
        </Grid>
        {facilities.map(facility => {
            const { facilityCode, facilityName } = facility;
            const exists = selected.includes(facilityCode)
            
            return (
            <Grid key={facilityCode} item xs={12} sm={3}>
                <FormControlLabel label={facilityName} control={
                    <Checkbox 
                        checked={exists} 
                        onChange={() => selectFacility(facilityCode, exists)}
                    />} 
                />
            </Grid>
        )})}
    </Grid>
  )
}