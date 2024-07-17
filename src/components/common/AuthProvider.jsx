import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import useAxiosPublic from './../../hooks/useAxiosPublic';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser) {
            setUser(currentUser);
            setLoading(false);
        }
    }, []);

    const createUser = (data) => {
        return axiosPublic.post('/register', data);
    };

    const signInUser = (data) => {
        return axiosPublic.post('/login', data);
    };

    const signOutUser = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
    };
    const AuthInfo = { user, setUser, loading, setLoading, createUser, signInUser, signOutUser };
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;