export interface Driver {
    _id: string;
    name: string;
    surname: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    car: string;
    available: boolean;
    trips: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface DriverInput {
    name: string;
    surname: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    car: string;
}
