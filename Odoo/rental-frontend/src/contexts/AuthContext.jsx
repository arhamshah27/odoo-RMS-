import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiClient } from '../services/apiService'; // Assuming you export apiClient

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            // Set the token on the api client
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            // Fetch user profile to verify token and get user data
            // You'll need to create this '/users/me' endpoint in your FastAPI backend
            apiClient.get('/users/me')
                .then(response => {
                    setUser(response.data);
                })
                .catch(() => {
                    // Token is invalid or expired
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                    delete apiClient.defaults.headers.common['Authorization'];
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [token]);

    const login = async (credentials) => {
        // You'll need to create this '/token' endpoint in your FastAPI backend
        const response = await apiClient.post('/token', { username: credentials.email, password: credentials.password });
        const { access_token } = response.data;
        
        localStorage.setItem('token', access_token);
        setToken(access_token);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

        // Fetch user data after login
        const userResponse = await apiClient.get('/users/me');
        setUser(userResponse.data);
    };

    const register = async (userData) => {
        // You'll need to create this '/users/register' endpoint in your FastAPI backend
        const response = await apiClient.post('/users/register', userData);
        return response.data;
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        delete apiClient.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, register, isAuthenticated: !!token, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};