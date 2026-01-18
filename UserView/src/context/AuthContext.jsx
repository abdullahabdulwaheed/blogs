import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('userInfo')) || null
    );

    const login = async (email, password) => {
        const { data } = await axios.post('https://blogs-backend-bde8.onrender.com/api/users/login', {
            email,
            password,
        });
        setUser(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
    };

    const register = async (name, email, password) => {
        const { data } = await axios.post('https://blogs-backend-bde8.onrender.com/api/users', {
            name,
            email,
            password,
        });
        setUser(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
