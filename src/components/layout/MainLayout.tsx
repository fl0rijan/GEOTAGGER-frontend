import {Outlet, useLocation} from "react-router-dom";
import {Navbar} from "./Navbar";
import Footer from "./Footer.tsx";
import {clsx} from "clsx";

export const MainLayout = () => {
    const location = useLocation();

    const authPaths = ["/login", "/register", "/forgot-password", "/oauth-success"];
    const isAuthPage = authPaths.includes(location.pathname);

    return (
        <div className="min-h-screen bg-white d-flex flex-column">
            <div className={clsx(isAuthPage && "d-lg-none")}>
                <Navbar />
            </div>

            <main className="flex main-content">
                <Outlet/>
            </main>

            {!isAuthPage && <Footer />}
        </div>
    );
};