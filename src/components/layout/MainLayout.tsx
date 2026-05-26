import {Outlet, useLocation} from "react-router-dom";
import {Navbar} from "./Navbar";
import Footer from "./Footer.tsx";
import {clsx} from "clsx";

export const MainLayout = () => {
    const location = useLocation();

    const authPaths = ["/login", "/register", "/forgot-password", "/oauth-success"];
    const isAuthPage = authPaths.includes(location.pathname);

    return (
        <div className="vh-100 bg-white d-flex flex-column">
            <div className={clsx(isAuthPage && "d-lg-none")}>
                <Navbar/>
            </div>

            <main className={clsx("flex-grow-1",
                isAuthPage ? "main-content-auth" : "main-content")}>
                <Outlet/>
            </main>

            {!isAuthPage && <Footer/>}
        </div>
    );
};