import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/store/store';

// Simulating authentication status

const UnAuthenticateRouteWrapper = () => {
    const { token } = useAppSelector(state => state.auth);
    return !token ? <Outlet /> : <Navigate to="/home" replace />;
};

export { UnAuthenticateRouteWrapper };
