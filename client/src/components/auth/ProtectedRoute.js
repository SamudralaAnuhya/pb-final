import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = () => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    // Token has expired, try to refresh it
                    return refreshToken();
                }

                // Token is still valid
                return true;
            } catch (error) {
                // Invalid token
                return false;
            }
        }

        // No token found
        return false;
    };

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
            try {
                const response = await axios.post('user/refresh-token', { refreshToken });
                const { accessToken } = response.data;

                // Store the new access token
                localStorage.setItem('token', accessToken);

                return true;
            } catch (error) {
                // Failed to refresh token
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                return false;
            }
        }

        // No refresh token found
        return false;
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (isAuthenticated()) {
                refreshToken();
            }
        }, 5000); // Refresh token every 5 seconds

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return isAuthenticated() ? <Component {...rest} /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;