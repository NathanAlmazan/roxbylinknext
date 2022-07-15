import React, { useState, useEffect } from 'react';
// next
import Image from "next/image";
// formik
import { FormikErrors, FormikTouched } from "formik";
// mui
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
// icons
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// types
import { EventInput } from "src/types/event";

interface FormValues {
    purpose: string;
    timeStart: Date;
    timeEnd: Date;
    eventDate: Date;
    participantsNum: number;
}

interface EventListProps {
    events: EventInput[];
    values: FormValues;
    errors: FormikErrors<FormValues>;
    touched: FormikTouched<FormValues>;
    handleChange: (e: React.ChangeEvent<any>) => void;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    addEvent: (e: EventInput) => void;
    removeEvent: (e: EventInput) => void;
}

export default function EventList({ events, values, handleChange, handleBlur, setFieldValue, addEvent, removeEvent, errors, touched }: EventListProps) {
  const { eventDate, timeStart, timeEnd, participantsNum } = values;

  const [schedule, setSchedule] = useState<EventInput>({
    eventDate: eventDate.toISOString(),
    timeStart: timeStart.toISOString(),
    timeEnd: timeEnd.toISOString(),
    participantsNum: participantsNum
  })

  useEffect(() => {
    setSchedule(state => ({
        eventDate: eventDate.toISOString(),
        timeStart: timeStart.toISOString(),
        timeEnd: timeEnd.toISOString(),
        participantsNum: participantsNum
    }))

  }, [eventDate, timeStart, timeEnd, participantsNum])

  const handleAddSchedule = () => {
    addEvent(schedule);
    setFieldValue("eventDate", new Date())
    setFieldValue("timeStart", new Date())
    setFieldValue("timeEnd", new Date())
    setFieldValue("participantsNum", 1)
  }

  return (
    <Stack direction="column" spacing={3}>
        <div>
            <Typography variant="h4" component="div" gutterBottom>
                Venue Use Details
            </Typography>
            <Divider />
        </div>
        
        <TextField 
            label="Event Purpose"
            variant="standard"
            name="purpose"
            value={values.purpose}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.purpose && errors.purpose)}
            helperText={Boolean(touched.purpose && errors.purpose) && errors.purpose}
            fullWidth
        />

        <Typography variant="h6" align="center" component="div">
            Please indicate the exact date and times of proposed booking then click the add icon to add an event schedule
        </Typography>

        <Divider />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <MobileDatePicker
                    label="Event Date"
                    inputFormat="MM/dd/yyyy"
                    value={values.eventDate}
                    onChange={(newValue: Date | null) => setFieldValue("eventDate", newValue)}
                    renderInput={(params) => <TextField variant="standard" {...params} />}
                />
                <TimePicker
                    label="Start Time"
                    value={values.timeStart}
                    onChange={(newValue: Date | null) => setFieldValue("timeStart", newValue)}
                    renderInput={(params) => <TextField variant="standard" {...params} />}
                />
                <TimePicker
                    label="Finish Time"
                    value={values.timeEnd}
                    onChange={(newValue: Date | null) => setFieldValue("timeEnd", newValue)}
                    renderInput={(params) => <TextField variant="standard" {...params} />}
                />
                <TextField 
                    label="Event Purpose"
                    type="number"
                    variant="standard"
                    name="participantsNum"
                    value={values.participantsNum}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.participantsNum && errors.participantsNum)}
                    helperText={Boolean(touched.participantsNum && errors.participantsNum) && errors.participantsNum}
                />
                <Tooltip title="Add Schedule">
                    <IconButton onClick={handleAddSchedule}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
        </LocalizationProvider>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Day</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Start Time</TableCell>
                    <TableCell align="right">Finish Time</TableCell>
                    <TableCell align="right">Total Participants</TableCell>
                    <TableCell align="right" padding="checkbox" />
                </TableRow>
                </TableHead>
                <TableBody>
                {events.map((event, i) => {
                    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
                    const eventDate = new Date(event.eventDate);
                    const timeStart = new Date(event.timeStart);
                    const timeEnd = new Date(event.timeEnd);
                
                    return (
                    <TableRow
                        key={i}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {weekday[eventDate.getDay()]}
                        </TableCell>
                        <TableCell align="right">{eventDate.toLocaleDateString()}</TableCell>
                        <TableCell align="right">{timeStart.toLocaleTimeString()}</TableCell>
                        <TableCell align="right">{timeEnd.toLocaleTimeString()}</TableCell>
                        <TableCell align="right">{event.participantsNum}</TableCell>
                        <TableCell align="right">
                            <Tooltip title="Remove Schedule">
                                <IconButton onClick={() => removeEvent(event)}>
                                    <DeleteOutlineIcon />
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                )})}

                {events.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={7}>
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
    </Stack>
  )
}