import React, { useContext } from 'react'
import UserContext from '../../../context/AuthContext/UserContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({element}) => {

    const {currentUser} = useContext(UserContext);
    if(!currentUser || !currentUser.emailVerified){
        return <Navigate to ='/login' />
    }

  return element
}

export default ProtectedRoute