import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {Spinner} from "react-bootstrap";

export const GuestRoute = () => {
    const {isAuthenticated, isInitialLoading} = useAuth();

    if (isInitialLoading) {
        return <Spinner/>;
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace/>;
    }

    return <Outlet/>;
};