import { createContext } from 'react';
import { Passenger } from '../interface/Passenger';
import { Driver } from '../interface/Driver';

type UserContextType = {
    user: Passenger;
    setUser: (u: Passenger) => void;
    driver: Driver;
    setDriver: (d: Driver) => void;
};

export const UserContext = createContext<UserContextType>({
    user: {} as Passenger,
    setUser: () => {
        return null;
    },
    driver: {} as Driver,
    setDriver: () => {
        return null;
    },
});
