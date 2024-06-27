import { useContext } from 'react';
import { UserContext } from '../services/userContext';

const RootPassenger = () => {
    const userContext = useContext(UserContext);

    return (
        <main className='flex justify-center items-center | min-h-screen w-full p-3 | bg-blue-200'>
            <div className='flex flex-col justify-center gap-4 | w-full p-4 | bg-white | rounded shadow'>
                <p>{userContext.user._id}</p>
                <p>
                    {userContext.user.name} {userContext.user.surname}
                </p>
            </div>
        </main>
    );
};

export default RootPassenger;
