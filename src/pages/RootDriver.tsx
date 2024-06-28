import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../services/userContext';
import api from '../services/api';
import { Car } from '../interface/Car';

const RootDriver = () => {
    const userContext = useContext(UserContext);
    const [car, setCar] = useState<Car>({} as Car);

    useEffect(() => {
        fetchCar(userContext.driver.car).then((car) => {
            setCar(car);
        });
    }, []);

    return (
        <main className='flex justify-center items-center | min-h-screen w-full p-3 | bg-orange-200'>
            <div className='flex flex-col justify-center gap-4 | w-full p-4 | bg-white | rounded shadow'>
                <p>{userContext.driver._id}</p>
                <p>
                    {userContext.driver.name} {userContext.driver.surname}
                </p>
                <p>
                    {car.make} {car.model} {car.year} - {car.licensePlate}
                </p>
            </div>
        </main>
    );
};

const fetchCar = async (carId: string) => {
    const request = api.get(`/cars/${carId}`);
    const response = await request;

    return response.data;
};

export default RootDriver;
