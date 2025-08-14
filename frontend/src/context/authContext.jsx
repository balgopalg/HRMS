// src/context/authContext.jsx

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"; // Make sure to import axios

// The context should have a more descriptive name, like AuthContext
const AuthContext = createContext();

// Component name should be capitalized
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Add a loading state

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const response = await axios.get('http://localhost:5000/api/auth/verify', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (response.data.success) {
                        setUser(response.data.user);
                    } else {
                        // If the backend response indicates failure, clear the token
                        localStorage.removeItem("token");
                        setUser(null);
                    }
                }
            } catch (error) {
                // If the request fails (e.g., 401 Unauthorized), clear the token
                console.error("Error verifying user:", error);
                localStorage.removeItem("token");
                setUser(null);
            } finally {
                // Set loading to false regardless of the outcome
                setIsLoading(false);
            }
        };
        verifyUser();
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook name should also be capitalized
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthProvider;