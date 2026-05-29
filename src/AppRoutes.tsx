import {Navigate, Route, Routes} from "react-router-dom";
import {AdminLogsPage} from "./pages/AdminLogsPage.tsx";
import {AdminRoute} from "./components/auth/AdminRoute.tsx";
import {ProtectedRoute} from "./components/auth/ProtectedRoute.tsx";
import {Spinner} from "react-bootstrap";
import {GuestRoute} from "./components/auth/GuestRoute.tsx";
import {useGetMeQuery} from "./store/api/authApi.ts";
import {MainLayout} from "./components/layout/MainLayout.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import UserProfilePage from "./pages/UserProfilePage.tsx";
import LocationFormPage from "./pages/LocationFormPage.tsx";
import {LocationGuessPage} from "./pages/LocationGuessPage.tsx";

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
            <Route element={<MainLayout/>}>
                <Route path="/" element={<HomePage/>}/>

                <Route element={<GuestRoute/>}>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                </Route>

                <Route element={<ProtectedRoute/>}>
                    <Route path={"location/:id"} element={<LocationGuessPage/>}/>
                    <Route path="/location/create" element={<LocationFormPage/>}/>
                    <Route path="/location/edit/:id" element={<LocationFormPage/>}/>
                    <Route path="/profile" element={<UserProfilePage/>}/>
                    <Route element={<AdminRoute/>}>
                        <Route path="/admin/logs" element={<AdminLogsPage/>}/>
                    </Route>
                </Route>

                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Route>
        </Routes>
    )
        ;
};