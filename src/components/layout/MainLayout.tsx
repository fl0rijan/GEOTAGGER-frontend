import {Outlet} from "react-router-dom";
import {Navbar} from "./Navbar";

export const MainLayout = () => {
    return (
        <div className="min-h-screen bg-white d-flex flex-column top-level-container">
            <Navbar/>

            <main className="flex main-content">
                <Outlet/>
            </main>

        </div>
    );
};