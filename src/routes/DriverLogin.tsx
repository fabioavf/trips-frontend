import { useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { Field, Fieldset, Input, Label, Legend, Select } from '@headlessui/react';
import { UserContext } from '../services/userContext';
import { Driver, DriverInput } from '../interface/Driver';
import { CarInput } from '../interface/Car';

const DriverLogin = () => {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [driverInput, setDriverInput] = useState<DriverInput>({
        name: '',
        surname: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        car: '',
    });
    const [carInput, setCarInput] = useState<CarInput>({
        make: '',
        model: '',
        year: 0,
        licensePlate: '',
    });

    const [driverLogin, setDriverLogin] = useState<Driver>({} as Driver);

    const userContext = useContext(UserContext);

    const navigate = useNavigate();

    const submitDriver = async (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault();

        api.post('/cars', carInput)
            .then((response) => {
                if (response.status === 201) {
                    api.post('/drivers', { ...driverInput, car: response.data._id })
                        .then((response) => {
                            if (response.status === 201) {
                                userContext.setDriver(response.data);

                                navigate('/');
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            })
            .catch((error) => {
                console.error(error);
            });

        try {
            const request = api.post('/cars', carInput);
            const response = await request;

            if (response.status === 201) {
                setDriverInput({ ...driverInput, car: response.data._id });

                const driverRequest = api.post('/drivers', driverInput);
                const driverResponse = await driverRequest;

                if (driverResponse.status === 201) {
                    userContext.setUser(driverResponse.data);

                    navigate('/');
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const loginDriver = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        userContext.setDriver(driverLogin);
        navigate('/');
    };

    useEffect(() => {
        fetchDrivers()
            .then((response) => {
                setDrivers(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    });

    return (
        <main className='flex justify-center items-center | min-h-screen w-full p-3 | bg-orange-200'>
            <button
                onClick={() => navigate(-1)}
                className='absolute left-3 top-3 | p-1 | bg-orange-600 | hover:bg-orange-700 active:bg-orange-700 transition-all rounded shadow'
            >
                <ChevronLeftIcon className='size-6 stroke-2 | text-white' />
            </button>
            <div className='flex flex-col justify-center gap-4 | w-full p-4 mt-11 | bg-white | rounded shadow'>
                {drivers && (
                    <div className='flex flex-col gap-4 | w-full px-4 py-8 | bg-slate-100 rounded shadow'>
                        <h1 className='text-lg font-bold'>Use um motorista já existente</h1>
                        <Select
                            onChange={(e) =>
                                setDriverLogin(drivers.find((driver) => driver._id === e.target.value) as Driver)
                            }
                            onFocus={() => {
                                setDriverLogin(drivers[0]);
                            }}
                            className='p-2 rounded shadow w-full'
                            name='status'
                            aria-label='Project status'
                        >
                            {drivers.map((passenger) => (
                                <option
                                    key={passenger._id}
                                    value={passenger._id}
                                >{`${passenger.name} ${passenger.surname}`}</option>
                            ))}
                        </Select>

                        <button
                            onClick={loginDriver}
                            disabled={!driverLogin._id}
                            className='px-4 py-2 w-full | font-semibold | bg-orange-600 disabled:bg-orange-400 text-white | rounded shadow | hover:bg-orange-700 active:bg-orange-700 transition-all'
                        >
                            Entrar
                        </button>
                    </div>
                )}

                <div className='flex flex-col gap-4 | w-full px-4 py-8 | bg-slate-100 rounded shadow'>
                    <Fieldset className='space-y-8'>
                        <Legend className='text-lg font-bold'>Crie um novo motorista</Legend>
                        <Field className='flex flex-col gap-2'>
                            <Label className='font-medium'>Nome</Label>
                            <Input
                                className='rounded p-1 focus:outline-orange-700 transition-all'
                                name='name'
                                onBlur={(e) => setDriverInput({ ...driverInput, name: e.target.value })}
                            />
                        </Field>

                        <Field className='flex flex-col gap-2'>
                            <Label className='font-medium'>Sobrenome</Label>
                            <Input
                                className='rounded p-1 focus:outline-orange-700 transition-all'
                                name='surname'
                                onBlur={(e) => setDriverInput({ ...driverInput, surname: e.target.value })}
                            />
                        </Field>

                        <Field className='flex flex-col gap-2'>
                            <Label className='font-medium'>Data de nascimento</Label>
                            <Input
                                className='rounded p-1 w-full'
                                name='dateOfBirth'
                                type='date'
                                onBlur={(e) => setDriverInput({ ...driverInput, dateOfBirth: e.target.value })}
                            />
                        </Field>

                        <Field className='flex flex-col gap-2'>
                            <Label className='font-medium'>Email</Label>
                            <Input
                                className='rounded p-1 focus:outline-orange-700 transition-all'
                                name='email'
                                onBlur={(e) => setDriverInput({ ...driverInput, email: e.target.value })}
                            />
                        </Field>

                        <Field className='flex flex-col gap-2'>
                            <Label className='font-medium'>Telefone</Label>
                            <Input
                                className='rounded p-1 focus:outline-orange-700 transition-all'
                                name='phone'
                                onBlur={(e) => setDriverInput({ ...driverInput, phone: e.target.value })}
                            />
                        </Field>

                        <Legend className='text-lg font-bold'>Seu carro</Legend>

                        <Field className='flex flex-col gap-2'>
                            <Label className='font-medium'>Marca</Label>
                            <Input
                                className='rounded p-1 focus:outline-orange-700 transition-all'
                                name='make'
                                onBlur={(e) => setCarInput({ ...carInput, make: e.target.value })}
                            />
                        </Field>

                        <Field className='flex flex-col gap-2'>
                            <Label className='font-medium'>Modelo</Label>
                            <Input
                                className='rounded p-1 focus:outline-orange-700 transition-all'
                                name='model'
                                onBlur={(e) => setCarInput({ ...carInput, model: e.target.value })}
                            />
                        </Field>

                        <Field className='flex flex-col gap-2'>
                            <Label className='font-medium'>Ano</Label>
                            <Input
                                className='rounded p-1 focus:outline-orange-700 transition-all'
                                name='year'
                                type='number'
                                onBlur={(e) => setCarInput({ ...carInput, year: parseInt(e.target.value) })}
                            />
                        </Field>

                        <Field className='flex flex-col gap-2'>
                            <Label className='font-medium'>Placa</Label>
                            <Input
                                className='rounded p-1 focus:outline-orange-700 transition-all'
                                name='licensePlate'
                                onBlur={(e) => setCarInput({ ...carInput, licensePlate: e.target.value })}
                            />
                        </Field>

                        <Input
                            onClick={submitDriver}
                            className='px-4 py-2 w-full | font-semibold | bg-orange-600 text-white | rounded shadow cursor-pointer | hover:bg-orange-700 active:bg-orange-700 transition-all'
                            type='submit'
                            value='Cadastrar'
                        />
                    </Fieldset>
                </div>
            </div>
        </main>
    );
};

const fetchDrivers = async () => {
    const request = api.get('/drivers');
    const response = await request;

    return response;
};

export default DriverLogin;
