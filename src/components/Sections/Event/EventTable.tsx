import * as React from 'react';
import Image from "next/image";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import TextField from '@mui/material/TextField';

// types 
import { Event } from 'src/types/event';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface EventTableProps {
    events: Event[];
}

export default function EventTable({ events }: EventTableProps) {
  const [filteredEvents, setFilteredEvents] = React.useState<Event[]>(events);
  const [start, setStart] = React.useState<Date | null>(new Date());
  const [end, setEnd] = React.useState<Date | null>(new Date());


  React.useEffect(() => {
    let end = new Date();

    events.forEach(e => {
        if (new Date(e.eventDate) > end) end = new Date(e.eventDate);
    })

    setEnd(state => end);
  }, [events])

  
  React.useEffect(() => {
    let start = new Date();

    events.forEach(e => {
        if (new Date(e.eventDate) < start) start = new Date(e.eventDate);
    })

    setStart(state => start);
  }, [events])


  React.useEffect(() => {
    if (start && end) {
        setFilteredEvents(state => events.filter(e => new Date(e.eventDate) >= start && new Date(e.eventDate) <= end))
    }
  }, [start, end, events])


  
  return (
    <TableContainer component={Paper}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ height: 70 }}>
            <Typography variant="h4" color="secondary">
                All Events
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <MobileDatePicker
                        label="Minimum Date"
                        inputFormat="MM/dd/yyyy"
                        value={start}
                        onChange={(newValue: Date | null) => setStart(newValue)}
                        renderInput={(params) => <TextField variant="standard" {...params} />}
                    />
                    <MobileDatePicker
                        label="Maximum Date"
                        inputFormat="MM/dd/yyyy"
                        value={end}
                        onChange={(newValue: Date | null) => setEnd(newValue)}
                        renderInput={(params) => <TextField variant="standard" {...params} />}
                    />
                </Stack>
            </LocalizationProvider>
      </Stack>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Contact Person</StyledTableCell>
            <StyledTableCell align="right">Organization</StyledTableCell>
            <StyledTableCell align="right">Contact no.</StyledTableCell>
            <StyledTableCell align="right">Event Date</StyledTableCell>
            <StyledTableCell align="right">Time Start</StyledTableCell>
            <StyledTableCell align="right">Time Finish</StyledTableCell>
            <StyledTableCell align="right">Participants</StyledTableCell>
            <StyledTableCell align="right">Facilities</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredEvents.map((row) => (
            <StyledTableRow key={row.eventId}>
              <StyledTableCell component="th" scope="row">
                {row.customer.contactPerson}
              </StyledTableCell>
              <StyledTableCell align="right">{row.customer.commName}</StyledTableCell>
              <StyledTableCell align="right">{"0" + row.customer.phone}</StyledTableCell>
              <StyledTableCell align="right">{new Date(row.eventDate).toLocaleDateString()}</StyledTableCell>
              <StyledTableCell align="right">{new Date(row.eventDate + "T" + row.timeStart).toLocaleTimeString()}</StyledTableCell>
              <StyledTableCell align="right">{new Date(row.eventDate + "T" + row.timeEnd).toLocaleTimeString()}</StyledTableCell>
              <StyledTableCell align="right">{row.participantsNum}</StyledTableCell>
              <StyledTableCell align="right">{row.facilities.join(", ")}</StyledTableCell>
            </StyledTableRow>
          ))}

        {filteredEvents.length === 0 && (
            <TableRow>
                <TableCell colSpan={8}>
                    <Stack sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: "column",
                        width: '100%',
                        height: 200
                    }}>
                        <Image alt="assignment" src="/fallbacks/event.png" width={200} height={200}  objectFit="scale-down" />
                        <Typography variant="subtitle2" align="center">Please add an event schedule.</Typography>
                    </Stack>
                </TableCell>
            </TableRow>
        )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
