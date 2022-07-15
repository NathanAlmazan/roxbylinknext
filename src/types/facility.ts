export interface Facility {
    facilityCode: string;
    facilityName: string;
    facilityCapacity: number;
    facilityEvents: FacilityEvents | null;
}

export interface FacilityEvents {
    facilityCode: string;
    eventCount: number;
    totalParticipants: number;
}