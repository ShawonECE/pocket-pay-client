import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './../common/AuthProvider';

const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    if (loading) {
        return (
            <div className="flex flex-col gap-4 w-full">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-1/2"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        );
    } else {
        if (user && user.role === 'admin') {
            return children;
        } else {
            return <Navigate to='/' replace></Navigate>;
        }
    }
};

AdminRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminRoute;