import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/store/store';

// Simulating authentication status

const AuthenticateRouteWrapper = () => {
    const { token } = useAppSelector(state => state.auth);
    console.log(token, "token")
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export { AuthenticateRouteWrapper };
