import {Navigate, Route, Routes} from "react-router-dom";
import {AdminLogsPage} from "./pages/AdminLogsPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import {AdminRoute} from "./components/auth/AdminRoute.tsx";
import {ProtectedRoute} from "./components/auth/ProtectedRoute.tsx";
import {Spinner} from "react-bootstrap";
import {LoginTest} from "./components/testing/LoginTest.tsx";
import {GuestRoute} from "./components/auth/GuestRoute.tsx";
import {useGetMeQuery} from "./store/api/authApi.ts";

export const AppRoutes = () => {
    const {isLoading: isAuthLoading} = useGetMeQuery(undefined, {
        refetchOnMountOrArgChange: false,
    });

    if (isAuthLoading) {
        return (
            <div className="vh-100 vw-100 d-flex align-items-center justify-content-center">
                <Spinner/>
            </div>
        );
    }

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

            <Route element={<GuestRoute/>}>
                <Route path="/login" element={<LoginTest/>}/>
                <Route path="/register" element={<div>Register Page</div>}/>
            </Route>

            <Route element={<ProtectedRoute/>}>
                <Route element={<AdminRoute/>}>
                    <Route path="/admin/logs" element={<AdminLogsPage/>}/>
                </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};