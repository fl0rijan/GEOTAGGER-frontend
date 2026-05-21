import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {MobileMenu} from "./MobileMenu";
import LogoIcon from "../../assets/Logo.svg?react";
import OnlyLogo from "../../assets/OnlyLogo.svg?react";

import Button from "../ui/Button.tsx";

import Menu from '../../assets/ui/menu-line.svg?react';
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import ProfilePointsMobile from "../ui/ProfilePointsMobile.tsx";
import {baseApi} from "../../store/api/baseApi.ts";
import {usePerformLogoutMutation} from "../../store/api/authApi.ts";
import ProfilePoints from "../ui/ProfilePoints.tsx";
import Avatar from "../ui/Avatar.tsx";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {isAuthenticated} = useAppSelector((state) => state.auth);
    const [logout] = usePerformLogoutMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            dispatch(baseApi.util.resetApiState());
            navigate("/");
        } catch { /* empty */
        }
    };

    return (
        <nav
            className="my-navbar fixed-top bg-white d-flex align-items-center justify-content-between z-[900]">
            <Link to="/">
                {isAuthenticated ? (
                        <>
                            <div className="navbar-logo d-lg-none">
                                <OnlyLogo/>
                            </div>
                            <div className="navbar-logo d-none d-lg-flex">
                                <LogoIcon/>
                            </div>
                        </>
                    ) :
                    <div className="navbar-logo">
                        <LogoIcon/>
                    </div>
                }

            </Link>

            <div className="d-block d-lg-none">
                <div className="nav-mobile">
                    {isAuthenticated && (<ProfilePointsMobile/>)}
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="btn py-1 px-05 border-0"
                    >
                        <Menu width={23} height={22}/>
                    </button>
                </div>
            </div>

            <div className="d-none d-lg-flex">
                {isAuthenticated ? (
                    <div className={"nav-desktop"}>
                        <Link
                            to="/"
                            className="d-flex justify-content-between align-items-center text-decoration-none text-dark"
                        >
                            <Button variant={"link"} className={"menu-nav-text-desktop"}>Home</Button>
                        </Link>
                        <Link
                            to="/"
                            className="d-flex justify-content-between align-items-center text-decoration-none text-dark"
                        >
                            <Button variant={"link"} className={"menu-nav-text-desktop"}>Profile settings</Button>
                        </Link>
                        <Link
                            to="/"
                            onClick={handleLogout}
                            className="d-flex justify-content-between align-items-center text-decoration-none text-dark"
                        >
                            <Button variant={"link"} className={"menu-nav-text-desktop"}>Logout</Button>
                        </Link>

                        <div className="d-flex align-items-center gap-3">
                            <ProfilePoints/>
                            <Link
                                to="/location/create">
                                <Avatar variant={"upload"}/>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className={"d-flex align-items-baseline gap-3"}>
                        <Link to="/login" className="w-100 text-decoration-none">
                            <Button variant="link">Sign In</Button>
                        </Link>
                        <span>or</span>
                        <Link to="/register" className="w-100 text-decoration-none">
                            <Button>Sign Up</Button>
                        </Link>
                    </div>
                )}
            </div>

            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}/>
        </nav>
    );
};