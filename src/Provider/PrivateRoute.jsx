import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import Loader from '../Loaders/Default_Loader/Loader'
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) return <Loader />

    if (user && user?.email) return children

    return <Navigate state={location?.pathname} to='/auth/login'/>

};

export default PrivateRoute;