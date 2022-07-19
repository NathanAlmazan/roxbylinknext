export interface Customer {
    customerId: number;
    commName: string;
    contactPerson: string;
    phone: string;
    email: string;
    postAddress: string;
}

export interface CustomerInput {
    customerId?: number;
    commName: string;
    contactPerson: string;
    phone: string;
    email: string;
    postAddress: string;
}