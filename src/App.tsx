import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './routes/Root';
import PassengerLogin from './routes/PassengerLogin';
import { Passenger } from './interface/Passenger';
import { useState } from 'react';
import { UserContext } from './services/userContext';
import { Driver } from './interface/Driver';
import DriverLogin from './routes/DriverLogin';
import NewTrip from './routes/NewTrip';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
    },
    {
        path: '/passenger/login',
        element: <PassengerLogin />,
    },
    {
        path: '/driver/login',
        element: <DriverLogin />,
    },
    {
        path: '/new-trip',
        element: <NewTrip />,
    },
]);

const App = () => {
    const [user, setUser] = useState<Passenger>({} as Passenger);
    const [driver, setDriver] = useState<Driver>({} as Driver);

    return (
        <UserContext.Provider value={{ user, setUser, driver, setDriver }}>
            <RouterProvider router={router} />
        </UserContext.Provider>
    );
};

export default App;
