import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../services/userContext';
import { Fieldset, Legend, Field, Label, Input, Select } from '@headlessui/react';
import api from '../services/api';
import { Driver } from '../interface/Driver';
import { Car } from '../interface/Car';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

type NewTripInput = {
    driver: string;
    origin: string;
    destination: string;
    time: Date;
    passenger: string;
};

const NewTrip = () => {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [cars, setCars] = useState<Car[]>([]);
    const [tripInput, setTripInput] = useState<NewTripInput>({} as NewTripInput);
    const userContext = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        getDrivers().then((response) => {
            setDrivers(response);
        });
    }, []);

    useEffect(() => {
        drivers.forEach((driver) => {
            getCar(driver.car).then((response) => {
                setCars((cars) => [...cars, response]);
            });
        });
    }, [drivers]);

    const submitTrip = async (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault();

        try {
            tripInput.passenger = userContext.user._id;
            tripInput.time = new Date();

            const request = api.post('/trips', tripInput);
            const response = await request;

            if (response.status === 201) {
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className='flex justify-center items-center | min-h-screen w-full p-3 | bg-blue-200'>
            <button
                onClick={() => navigate(-1)}
                className='absolute left-3 top-3 | p-1 | bg-blue-600 | hover:bg-blue-700 active:bg-blue-700 transition-all rounded shadow'
            >
                <ChevronLeftIcon className='size-6 stroke-2 | text-white' />
            </button>
            <div className='flex flex-col justify-center gap-4 | w-full p-4 | bg-white | rounded shadow'>
                <div className='flex flex-col gap-4 | w-full px-4 py-8 | bg-slate-100 rounded shadow'>
                    <Fieldset className='space-y-8'>
                        <Legend className='text-lg font-bold'>Criar um novo trajeto</Legend>

                        <Field className='flex flex-col gap-2'>
                            <Label className='font-medium'>Motorista</Label>
                            <Select
                                onChange={(e) => {
                                    setTripInput({ ...tripInput, driver: e.target.value });
                                }}
                                onFocus={() => {
                                    setTripInput({ ...tripInput, driver: drivers[0]._id });
                                }}
                                className='p-2 rounded shadow w-full'
                                name='driver'
                                aria-label='Driver'
                            >
                                {drivers.map((driver, index) => (
                                    <>
                                        {driver && cars[index] && (
                                            <option key={driver._id} value={driver._id}>
                                                {driver.name} {driver.surname} - {cars[index].make} {cars[index].model}
                                            </option>
                                        )}
                                    </>
                                ))}
                            </Select>
                        </Field>

                        <Field className='flex flex-col gap-2'>
                            <Label className='font-medium'>Origem</Label>
                            <Input
                                onBlur={(e) => setTripInput({ ...tripInput, origin: e.target.value })}
                                className='rounded p-1 focus:outline-blue-700 transition-all'
                                name='origin'
                            />
                        </Field>

                        <Field className='flex flex-col gap-2'>
                            <Label className='font-medium'>Destino</Label>
                            <Input
                                onBlur={(e) => setTripInput({ ...tripInput, destination: e.target.value })}
                                className='rounded p-1 focus:outline-blue-700 transition-all'
                                name='destination'
                            />
                        </Field>

                        <Input
                            disabled={!tripInput.driver || !tripInput.origin || !tripInput.destination}
                            onClick={submitTrip}
                            className='px-4 py-2 w-full | font-semibold | bg-blue-600 text-white | rounded shadow cursor-pointer | hover:bg-blue-700 active:bg-blue-700 disabled:bg-blue-400 disabled:cursor-default transition-all'
                            type='submit'
                            value='Cadastrar'
                        />
                    </Fieldset>
                </div>
            </div>
        </main>
    );
};

const getDrivers = async () => {
    const request = api.get('/drivers');
    const response = await request;

    return response.data;
};

const getCar = async (id: string) => {
    const request = api.get(`/cars/${id}`);
    const response = await request;

    return response.data;
};

export default NewTrip;
