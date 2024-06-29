import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../services/userContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { PopulatedTrip, Trip } from '../interface/Trip';

const RootPassenger = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [populatedTrips, setPopulatedTrips] = useState<PopulatedTrip[]>([]);

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
            let driver, passenger, car;

            if (typeof trip.driver === 'string') driver = await getDriver(trip.driver);
            if (typeof trip.passenger === 'string') passenger = await getPassenger(trip.passenger);
            if (typeof driver === 'object') car = await getCar(driver.car);

            if (driver && passenger && car) return { ...trip, driver: { ...driver, car: car }, passenger };
            else return trip;
        });

        Promise.all(updatedTrips).then((response) => setPopulatedTrips(response));

        console.log(populatedTrips);
    }, [trips]);

    return (
        <main className='flex justify-center items-center | min-h-screen w-full p-3 | bg-blue-200'>
            <div className='flex flex-col justify-center gap-4 | w-full max-w-3xl p-4 | bg-white | rounded shadow'>
                <h1 className='text-lg font-bold'>Olá, {userContext.user.name}.</h1>

                {populatedTrips.length > 0 ? (
                    populatedTrips.map((trip) => (
                        <div
                            key={trip._id}
                            className='flex flex-col gap-4 | w-full px-4 py-8 | bg-slate-100 rounded shadow'
                        >
                            <div>
                                {trip.concluded ? (
                                    <p className='font-bold text-lg text-green-600'>Concluído</p>
                                ) : (
                                    <p className='font-bold text-lg text-yellow-600'>Em andamento</p>
                                )}
                            </div>
                            <div className='flex justify-between gap-4'>
                                <div className='flex flex-col justify-between'>
                                    <div>
                                        <p className='text-xs'>
                                            de <span className='font-semibold'>{trip.origin}</span> para
                                        </p>
                                        <h3 className='text-lg font-bold'>{trip.destination}</h3>
                                    </div>
                                    <p className='text-xs'>
                                        {trip.time
                                            .toLocaleString('pt-BR')
                                            .split('T')[0]
                                            .split('-')
                                            .reverse()
                                            .map((number, index) => (index === 2 ? number : number + '/'))}
                                    </p>
                                </div>
                                <div className='flex flex-col items-end'>
                                    <p className='text-xs'>Motorista</p>
                                    <h3 className='text-lg font-bold'>
                                        {trip.driver.name} {trip.driver.surname}
                                    </h3>
                                    <p>
                                        {trip.driver.car.make} {trip.driver.car.model} - {trip.driver.car.licensePlate}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        <p>Você não tem nenhum trajeto em andamento ou concluído.</p>
                    </div>
                )}
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
