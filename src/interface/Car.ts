export interface Car {
    _id: string;
    make: string;
    model: string;
    year: number;
    licensePlate: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface CarInput {
    make: string;
    model: string;
    year: number;
    licensePlate: string;
}
