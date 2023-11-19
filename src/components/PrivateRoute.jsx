import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';

const PrivateRoute = () => {
    const { login, loading } = useSelector((state) => state.firebase);
    if (loading) {
        return <Spinner />;
    }

    return login ? <Outlet /> : <Navigate to={'/sign-in'} />;
};

export default PrivateRoute;
