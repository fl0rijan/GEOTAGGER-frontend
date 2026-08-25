import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {Spinner} from "react-bootstrap";

export const AdminRoute = () => {
    const {isAuthenticated, isAdmin, isInitialLoading} = useAuth();

    if (isInitialLoading) return <Spinner/>;

    if (!isAuthenticated || !isAdmin) {
        return <Navigate to="/" replace/>;
    }

    return <Outlet/>;
};