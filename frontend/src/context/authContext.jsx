// src/context/authContext.jsx

import React,{createContext, useContext, useState} from "react";


const userContext = createContext();

const authContext = ({children}) => {
    const [user,setUser] = useState(null)

    // The login function should accept a user object
    const login = (user) => {
        // Here, you pass the new user data to the state
        setUser(user)
    }
    const logout = () => {
        setUser(null)
        localStorage.removeItem("token")
    }
    return (
        <userContext.Provider value = {{user,login, logout }}>
            {children}
        </userContext.Provider>
    )
}

export const useAuth = () => useContext(userContext)
export default authContext