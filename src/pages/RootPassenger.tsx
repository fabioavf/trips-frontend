import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../services/userContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Trip } from '../interface/Trip';

const RootPassenger = () => {
    const [trips, setTrips] = useState<Trip[]>([]);

    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        getTrips().then((response) => {
            const trips: Trip[] = [] as Trip[];

            response.forEach((trip: Trip) => {
                if (trip.passenger === userContext.user._id) {
                    trips.push(trip);
                }
            });

            setTrips(trips);
        });
    }, []);

    useEffect(() => {
        const updatedTrips = trips.map(async (trip) => {
            const driver = await getDriver(trip.driver);
            const passenger = await getPassenger(trip.passenger);
            const car = await getCar(driver.car);

            return { ...trip, driver: { ...driver, car: car }, passenger };
        });

        Promise.all(updatedTrips).then((response) => console.log(response));

        // Promise.all(updatedTrips).then((response) => setTrips(response));
    }, [trips]);

    return (
        <main className='flex justify-center items-center | min-h-screen w-full p-3 | bg-blue-200'>
            <div className='flex flex-col justify-center gap-4 | w-full p-4 | bg-white | rounded shadow'>
                <h1 className='text-lg font-bold'>Olá, {userContext.user.name}.</h1>

                {trips.length &&
                    trips.map((trip) => (
                        <div
                            key={trip._id}
                            className='flex flex-col gap-4 | w-full px-4 py-8 | bg-slate-100 rounded shadow'
                        >
                            <p>{trip.driver}</p>
                        </div>
                    ))}
                <button
                    onClick={() => navigate('/new-trip')}
                    className='px-4 py-2 w-full | font-semibold | bg-blue-600 text-white | rounded shadow | hover:bg-blue-700 active:bg-blue-700 transition-all'
                >
                    Iniciar novo trajeto
                </button>
            </div>
        </main>
    );
};

const getTrips = async () => {
    const request = api.get('/trips');
    const response = await request;

    return response.data;
};

const getDriver = async (id: string) => {
    const request = api.get(`/drivers/${id}`);
    const response = await request;

    return response.data;
};

const getPassenger = async (id: string) => {
    const request = api.get(`/passengers/${id}`);
    const response = await request;

    return response.data;
};

const getCar = async (id: string) => {
    const request = api.get(`/cars/${id}`);
    const response = await request;

    return response.data;
};

export default RootPassenger;
