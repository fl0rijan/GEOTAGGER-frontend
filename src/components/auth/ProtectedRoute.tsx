import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {Spinner} from "react-bootstrap";

export const ProtectedRoute = () => {
    const {isAuthenticated, isInitialLoading} = useAuth();
    const location = useLocation();

    if (isInitialLoading) {
        return <Spinner/>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return <Outlet/>;
};