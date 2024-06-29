import { PopulatedDriver } from './Driver';
import { Passenger } from './Passenger';

export interface Trip {
    _id: string;
    driver: string;
    passenger: string;
    origin: string;
    destination: string;
    time: Date;
    started: boolean;
    concluded: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface PopulatedTrip {
    _id: string;
    driver: PopulatedDriver;
    passenger: Passenger;
    origin: string;
    destination: string;
    time: Date;
    started: boolean;
    concluded: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
