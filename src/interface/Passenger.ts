export interface Passenger {
    _id: string;
    name: string;
    surname: string;
    dateOfBirth: Date;
    email: string;
    phone: string;
    trips: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface PassengerInput {
    name: string;
    surname: string;
    dateOfBirth: string;
    email: string;
    phone: string;
}
