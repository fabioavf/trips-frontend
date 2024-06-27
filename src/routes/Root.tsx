import { useContext } from 'react';
import { UserContext } from '../services/userContext';
import RootAnonymous from '../pages/RootAnonymous';
import RootPassenger from '../pages/RootPassenger';
import RootDriver from '../pages/RootDriver';

const Root = () => {
    const userContext = useContext(UserContext);

    if (userContext.user._id && !userContext.driver._id) return <RootPassenger />;
    if (userContext.driver._id && !userContext.user._id) return <RootDriver />;

    return <RootAnonymous />;
};

export default Root;
