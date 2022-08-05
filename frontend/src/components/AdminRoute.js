import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


// Protecting admin route in FE
const AdminRoute = ({ children }) => {

    // get userinfo
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin

    return userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />;
}

export default AdminRoute;