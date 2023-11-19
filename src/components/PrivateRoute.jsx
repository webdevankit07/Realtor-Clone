import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const { login, loading } = useSelector((state) => state.firebase);
    if (loading) {
        return <h1>Loading....</h1>;
    }

    return login ? <Outlet /> : <Navigate to={'/sign-in'} />;
};

export default PrivateRoute;
