import {motion, AnimatePresence} from "framer-motion";
import {Link, useNavigate} from "react-router-dom";
import Button from "../ui/Button";
import LogoMobile from "../../assets/LogoMobile.svg?react";

import X from "../../assets/ui/icon-x.svg?react";
import ChevronRight from "../../assets/ui/right.svg?react";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {baseApi} from "../../store/api/baseApi.ts";
import {usePerformLogoutMutation} from "../../store/api/authApi.ts";
import Avatar from "../ui/Avatar.tsx";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onClickSettings: () => void;
}

export const MobileMenu = ({isOpen, onClose, onClickSettings}: MobileMenuProps) => {
    const {isAuthenticated, user} = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [logout] = usePerformLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            dispatch(baseApi.util.resetApiState());
            onClose();
            navigate("/");
        } catch { /* empty */
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{x: '100%'}}
                    animate={{x: 0}}
                    exit={{x: '100%'}}
                    transition={{type: "spring", damping: 25, stiffness: 200}}
                    className="mobile-menu fixed z-[1000] bg-white d-flex flex-column gap-2"
                >
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="navbar-logo">
                            <LogoMobile/>
                        </div>
                        <button onClick={onClose} className="btn p-0 border-0">
                            <X className="text-primary"/>
                        </button>
                    </div>

                    <div className="d-flex flex-column gap-3 pt-2">
                        {isAuthenticated ? (
                                <div className="text-center gap-24">
                                    <Link
                                        to="/profile"
                                        onClick={onClose}
                                        className="d-flex gap-3 align-items-center text-decoration-none text-dark pr-1"
                                    >
                                        <Avatar src={user?.image}/>
                                        <span className={"menu-nav-text"}>{user?.firstName}&nbsp;{user?.lastName}</span>
                                    </Link>
                                    <Link
                                        to="/"
                                        onClick={onClose}
                                        className="d-flex justify-content-between align-items-center text-decoration-none text-dark"
                                    >
                                        <Button variant={"link"} className={"menu-nav-text"}>Home</Button>
                                        <div className={"menu-nav-icon"}>
                                            <ChevronRight className="text-muted"/>
                                        </div>
                                    </Link>
                                    <Link
                                        to="/"
                                        onClick={onClose}
                                        className="d-flex justify-content-between align-items-center text-decoration-none text-dark"
                                    >
                                        <Button variant={"link"} className={"menu-nav-text"} onClick={onClickSettings}>Profile
                                            settings</Button>
                                        <div className={"menu-nav-icon"}>
                                            <ChevronRight className="text-muted"/>
                                        </div>
                                    </Link>
                                    <Link
                                        to="/"
                                        onClick={handleLogout}
                                        className="d-flex justify-content-between align-items-center text-decoration-none text-dark"
                                    >
                                        <Button variant={"link-green"} className={"menu-nav-text"}>Logout</Button>
                                        <div className={"menu-nav-icon"}>
                                            <ChevronRight className="text-muted"/>
                                        </div>
                                    </Link>
                                </div>
                            ) :
                            (
                                <>
                                    <Link
                                        to="/"
                                        onClick={onClose}
                                        className="d-flex justify-content-between align-items-center py-3 text-decoration-none text-dark"
                                    >
                                        <span className="menu-nav-text">Home</span>
                                        <div className={"menu-nav-icon"}>
                                            <ChevronRight className="text-muted"/>
                                        </div>
                                    </Link>
                                    <Link to="/register" onClick={onClose} className="w-100 text-decoration-none">
                                        <Button variant="primary" className="w-100">Sign up</Button>
                                    </Link>
                                    <Link to="/login" onClick={onClose} className="w-100 text-decoration-none">
                                        <Button variant="secondary" className="w-100">Sign in</Button>
                                    </Link>

                                </>)}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};