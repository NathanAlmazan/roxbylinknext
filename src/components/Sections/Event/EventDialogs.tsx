import React from 'react';
import Dialog from "@mui/material/Dialog";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
// types
import { EventByDate } from 'src/types/event';

interface EventDialogProps {
    open: boolean;
    handleClose: () => void;
    events: EventByDate[];
}

function EventDialogs({ open, handleClose, events }: EventDialogProps) {
  return (
    <Dialog
        open={open}
        onClose={handleClose}
    >
        <DialogTitle>{events.length > 0 && `Active Facilities at ${new Date(events[0].eventDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}</DialogTitle>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {events.map(e => (
                <ListItem key={e.facilityCode}>
                    <ListItemText primary={e.facilityCode} secondary={`${e.eventCount} event(s) with ${e.totalParticipants} expected participants`} />
                </ListItem>
            ))}
        </List>
    </Dialog>
  )
}

export default EventDialogs