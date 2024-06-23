import { useEffect, useState } from "react"
import UserContext from "./UserContext"

const UserContextProvider = ({children}) =>{

    const user = JSON.parse(localStorage.getItem('userInfo'));
    const [currentUser,setCurrentUser] = useState(user || null);

    useEffect(() => {
        localStorage.setItem('userInfo',JSON.stringify(currentUser));
    }, [currentUser])
    

    return (
        <UserContext.Provider value={{currentUser,setCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider