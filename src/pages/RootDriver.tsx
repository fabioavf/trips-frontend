import { useContext } from 'react';
import { UserContext } from '../services/userContext';

const RootDriver = () => {
    const userContext = useContext(UserContext);

    return (
        <main className='flex justify-center items-center | min-h-screen w-full p-3 | bg-orange-200'>
            <div className='flex flex-col justify-center gap-4 | w-full p-4 | bg-white | rounded shadow'>
                <p>{userContext.driver._id}</p>
                <p>
                    {userContext.driver.name} {userContext.driver.surname}
                </p>
            </div>
        </main>
    );
};

export default RootDriver;
