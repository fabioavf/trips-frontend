import { useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { Field, Fieldset, Input, Label, Legend, Select } from '@headlessui/react';
import { Passenger, PassengerInput } from '../interface/Passenger';
import { UserContext } from '../services/userContext';

const PassengerLogin = () => {
    const [passengers, setPassengers] = useState<Passenger[]>([]);
    const [passengerInput, setPassengerInput] = useState<PassengerInput>({
        name: '',
        surname: '',
        dateOfBirth: '',
        email: '',
        phone: '',
    });
    const [passengerLogin, setPassengerLogin] = useState<Passenger>({} as Passenger);

    const userContext = useContext(UserContext);

    const navigate = useNavigate();

    const submitPassenger = async (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault();

        try {
            const request = api.post('/passengers', passengerInput);
            const response = await request;

            if (response.status === 201) {
                userContext.setUser(response.data);

                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const loginPassenger = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        userContext.setUser(passengerLogin);
        navigate('/');
    };

    useEffect(() => {
        fetchPassengers()
            .then((response) => {
                setPassengers(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <main className='flex justify-center items-center | min-h-screen w-full p-3 | bg-blue-200'>
            <button
                onClick={() => navigate(-1)}
                className='absolute left-3 top-3 | p-1 | bg-blue-600 | hover:bg-blue-700 active:bg-blue-700 transition-all rounded shadow'
            >
                <ChevronLeftIcon className='size-6 stroke-2 | text-white' />
            </button>
            <div className='flex flex-col justify-center gap-4 | w-full p-4 mt-11 | bg-white | rounded shadow'>
                {passengers && (
                    <div className='flex flex-col gap-4 | w-full px-4 py-8 | bg-slate-100 rounded shadow'>
                        <h1 className='text-lg font-bold'>Use um passageiro já existente</h1>
                        <Select
                            onChange={(e) =>
                                setPassengerLogin(
                                    passengers.find((passenger) => passenger._id === e.target.value) as Passenger
                                )
                            }
                            onFocus={() => {
                                setPassengerLogin(passengers[0]);
                            }}
                            className='p-2 rounded shadow w-full'
                            name='status'
                            aria-label='Project status'
                        >
                            {passengers.map((passenger) => (
                                <option
                                    key={passenger._id}
                                    value={passenger._id}
                                >{`${passenger.name} ${passenger.surname}`}</option>
                            ))}
                        </Select>

                        <button
                            onClick={loginPassenger}
                            disabled={!passengerLogin._id}
                            className='px-4 py-2 w-full | font-semibold | bg-blue-600 disabled:bg-blue-400 text-white | rounded shadow | hover:bg-blue-700 active:bg-blue-700 transition-all'
                        >
                            Entrar
                        </button>
                    </div>
                )}

                <div className='flex flex-col gap-4 | w-full px-4 py-8 | bg-slate-100 rounded shadow'>
                    <Fieldset className='space-y-8'>
                        <Legend className='text-lg font-bold'>Crie um novo passageiro</Legend>
                        <Field className='flex flex-col gap-2'>
                            <Label className='font-medium'>Nome</Label>
                            <Input
                                className='rounded p-1 focus:outline-blue-700 transition-all'
                                name='name'
                                onBlur={(e) => setPassengerInput({ ...passengerInput, name: e.target.value })}
                            />
                        </Field>

                        <Field className='flex flex-col gap-2'>
                            <Label className='font-medium'>Sobrenome</Label>
                            <Input
                                className='rounded p-1 focus:outline-blue-700 transition-all'
                                name='surname'
                                onBlur={(e) => setPassengerInput({ ...passengerInput, surname: e.target.value })}
                            />
                        </Field>

                        <Field className='flex flex-col gap-2'>
                            <Label className='font-medium'>Data de nascimento</Label>
                            <Input
                                className='rounded p-1 w-full'
                                name='dateOfBirth'
                                type='date'
                                onBlur={(e) => setPassengerInput({ ...passengerInput, dateOfBirth: e.target.value })}
                            />
                        </Field>

                        <Field className='flex flex-col gap-2'>
                            <Label className='font-medium'>Email</Label>
                            <Input
                                className='rounded p-1 focus:outline-blue-700 transition-all'
                                name='email'
                                onBlur={(e) => setPassengerInput({ ...passengerInput, email: e.target.value })}
                            />
                        </Field>

                        <Field className='flex flex-col gap-2'>
                            <Label className='font-medium'>Telefone</Label>
                            <Input
                                className='rounded p-1 focus:outline-blue-700 transition-all'
                                name='phone'
                                onBlur={(e) => setPassengerInput({ ...passengerInput, phone: e.target.value })}
                            />
                        </Field>

                        <Input
                            onClick={submitPassenger}
                            className='px-4 py-2 w-full | font-semibold | bg-blue-600 text-white | rounded shadow cursor-pointer | hover:bg-blue-700 active:bg-blue-700 transition-all'
                            type='submit'
                            value='Cadastrar'
                        />
                    </Fieldset>
                </div>
            </div>
        </main>
    );
};

const fetchPassengers = async () => {
    const request = api.get('/passengers');
    const response = await request;

    return response;
};

export default PassengerLogin;
