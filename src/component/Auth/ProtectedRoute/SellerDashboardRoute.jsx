import React, { useContext } from 'react'
import UserContext from '../../../context/AuthContext/UserContext'
import { Navigate } from 'react-router-dom';
import useFetchCollection from '../../../hooks/useFetchCollection';

const SellerDashboardRoute = ({element}) => {

    const {currentUser} = useContext(UserContext);

    const userList = useFetchCollection('users');
    const current = userList.find(data=>data.userEmail == currentUser.email)
    // console.log(current);

    if(!currentUser || !currentUser.emailVerified){
        return <Navigate to ='/login' />
    }
    else {
      if(current && current.type != 'seller'){
        return <Navigate to ='/profile' />
      }
    }



  return element
}

export default SellerDashboardRoute