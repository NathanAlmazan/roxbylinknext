import { Customer, CustomerInput } from "./customer";

export interface Event {
    eventId?: number;
    purpose: string;
    timeStart: string;
    timeEnd: string;
    eventDate: string;
    participantsNum: number;
    customer: Customer;
    facilities: string[];
}

export interface EventInput {
    timeStart: string;
    timeEnd: string;
    eventDate: string;
    participantsNum: number;
}

export interface EventByDate {
    eventDate: string;
    facilityCode: string;
    eventCount: number;
    totalParticipants: number;
}

export interface EventVars extends EventInput {
    customer: CustomerInput;
    facilities: string[];
}