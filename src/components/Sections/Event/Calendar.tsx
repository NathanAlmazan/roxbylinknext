import React, { useState, useMemo } from 'react';
// components
import EventDialogs from './EventDialogs';
// mui
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
// icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// types 
import { EventByDate } from 'src/types/event';

const WeekdaysWrapper = styled("ul")(
    ({ theme }) => `
    margin: 0;
    padding: 10px 0;
    background-color: ${theme.palette.secondary.main};
  `
);

const Weekday = styled("li")(
    ({ theme }) => `
    display: inline-block;
    width: 13.8%;
    color: #FFFF;
    text-align: center;
  `
);

const DaysWrapper = styled(Stack)(
    ({ theme }) => `
    background: #eee;
    margin: 0;
  `
);


const Day = styled(Box)(
    ({ theme }) => `
    display: inline-block;
    width: 13.8%;
    height: 150px;
    text-align: right;
    margin-bottom: 5px;
    font-size: 1rem;
    color: #777;
  `
);

interface CalendarProps {
    events: EventByDate[];
}

function Calendar({ events }: CalendarProps) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
  const [month, setMonth] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<EventByDate[]>([]);

  const monthEvents: MonthWeek[] = useMemo(() => createCalendar(month, events), [month, events])

  const handleNextMonth = () => {
    let newDate = new Date(month.setMonth(month.getMonth() + 1));

    setMonth(newDate);
  }

  const handlePreviousMonth = () => {
    let newDate = new Date(month.setMonth(month.getMonth() - 1));

    setMonth(newDate);
  }

  const handleClickMore = (events: EventByDate[]) => {
    setSelected(events);
    setOpen(true);
  }

  return (
    <Box sx={{ width: "100%" }}>
        <Stack direction="row" justifyContent="space-between">
            <Tooltip title="Previous Month">
                <IconButton color="primary"  onClick={handlePreviousMonth}>
                    <ArrowBackIosIcon />
                </IconButton>
            </Tooltip>
            <Typography variant="h3" align="center" color="secondary" gutterBottom>{monthNames[month.getMonth()]}</Typography>
            <Tooltip title="Next Month">
                <IconButton color="primary" onClick={handleNextMonth}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Tooltip>
        </Stack>
        <WeekdaysWrapper>
            <Weekday>Sun</Weekday>
            <Weekday>Mon</Weekday>
            <Weekday>Tue</Weekday>
            <Weekday>Wed</Weekday>
            <Weekday>Thu</Weekday>
            <Weekday>Fri</Weekday>
            <Weekday>Sat</Weekday>
        </WeekdaysWrapper>
       {monthEvents.map((w, i) => (
         <DaysWrapper key={i} direction="row">
            {w.days.map((d, i) => (
                d.day !== null ?  
                    <Day key={i}>
                        <Typography variant="body2" color="secondary">{d.day}</Typography>
                        {d.facilities.slice(0, 1).map((f, i) => (
                            <p key={i}>{`${f.facilityCode}, ${f.eventCount} event(s), ${f.totalParticipants} expected participants.`}</p>
                        ))}
                        {d.facilities.length > 0 && (
                            <Button onClick={() => handleClickMore(d.facilities)}>See MOre...</Button>
                        )}
                    </Day> 
                    :  
                    <Day key={i}>.</Day>
            ))}
        </DaysWrapper>
       ))}
       <EventDialogs open={open} handleClose={() => setOpen(!open)} events={selected} />
    </Box>
  )
}

export default Calendar


interface MonthWeek {
    days: WeekDay[]
}

interface WeekDay {
    day: number | null;
    facilities: EventByDate[]
}

function createCalendar(date: Date, events: EventByDate[]) {
    const y = date.getFullYear(), m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

    let month: MonthWeek[] = [];
    let days: WeekDay[] = [];
    let currentDate: number = 1;

    const start = firstDay.getDay();
    const end = lastDay.getDate();

    for (let i = 1; i < 42; i++) {
        if (i <= start) days.push({ day: null, facilities: [] })
        else {
            const current = new Date(date.getFullYear(), date.getMonth(), currentDate + 1);
            const currentDateStr = current.toISOString().split("T")[0];

            days.push({
                day: currentDate,
                facilities: events.filter(e => e.eventDate === currentDateStr)
            })

            if ((i % 7) === 0) {
                month.push({ days });
                days = [];
            }

            else if (end <= currentDate) {
                month.push({ days });
                days = [];
                break;
            }

            currentDate++;
        }
    }

    return month;
}