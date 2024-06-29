import { UserCircleIcon } from '@heroicons/react/24/outline';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const RootAnonymous = () => {
    const navigate = useNavigate();

    const navigatePassengerLogin = () => {
        navigate('/passenger/login');
    };

    const navigateDriverLogin = () => {
        navigate('/driver/login');
    };
    return (
        <main className='flex justify-center items-center | min-h-screen w-full p-3 | bg-blue-200'>
            <div className='flex flex-col justify-center gap-4 | w-full max-w-3xl p-4 | bg-white | rounded shadow'>
                <div className='flex flex-col items-center gap-4 | w-full px-4 py-8 | bg-slate-100 rounded shadow'>
                    <UserGroupIcon className='size-8' />
                    <button
                        onClick={navigatePassengerLogin}
                        className='px-4 py-2 w-full | font-semibold | bg-blue-600 text-white | rounded shadow | hover:bg-blue-700 active:bg-blue-700 transition-all'
                    >
                        Entrar como passageiro
                    </button>
                </div>
                <div className='flex flex-col items-center gap-4 | w-full px-4 py-8 | bg-slate-100 rounded shadow'>
                    <UserCircleIcon className='size-8' />
                    <button
                        onClick={navigateDriverLogin}
                        className='px-4 py-2 w-full | font-semibold | bg-orange-600 text-white | rounded shadow | hover:bg-orange-700 active:bg-orange-700 transition-all'
                    >
                        Entrar como motorista
                    </button>
                </div>
            </div>
        </main>
    );
};

export default RootAnonymous;
