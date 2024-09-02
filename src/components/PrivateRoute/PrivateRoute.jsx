import React from 'react'
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isSignedIn = useSelector(selectIsLoggedIn);

    return isSignedIn ? children : <Navigate to="/signin" replace />;
}

export default PrivateRoute;