export interface Customer {
    customerId: number;
    commName: string;
    contactPerson: string;
    phone: string;
    email: string;
    postAddress: string;
}

export interface CustomerInput {
    commName: string;
    contactPerson: string;
    phone: string;
    email: string;
    postAddress: string;
}