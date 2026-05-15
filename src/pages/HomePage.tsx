import {usePerformLogoutMutation} from "../store/api/authApi.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {baseApi} from "../store/api/baseApi";
import Button from "../components/ui/Button.tsx";
import Avatar from "../components/ui/Avatar.tsx";
import SocialButton from "../components/ui/SocialButton.tsx";

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [logout, {isLoading}] = usePerformLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout().unwrap();

            dispatch(baseApi.util.resetApiState());

            navigate("/login", {replace: true});

        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const {user, token, isAuthenticated} = useAppSelector((state) => state.auth);

    return (
        <div className="p-5">
            <h1 className="fw-light fs-caption">Headline 1</h1>
            <h1 className="fw-black">Welcome to GeoTagger</h1>
            <hr/>

            <div className="mb-4">
                <div className="p-3 bg-light rounded-3">
                    <p className="mb-1"><strong>Authenticated:</strong> {isAuthenticated ? 'YES' : 'NO'}</p>
                    <p className="mb-1">
                        <strong>User:</strong> {user ? `${user.firstName} ${user.lastName}` : 'null'}</p>
                    <p className="mb-1"><strong>Points:</strong> {user?.gamePoints ?? 'n/a'}</p>
                    <img src={user?.image} alt="Users image" className={"w-10 rounded-circle"}/>
                    <p className="mb-0 text-truncate">
                        <strong>Token:</strong> {token ? `${token.substring(0, 20)}...` : 'null'}</p>
                </div>
            </div>
            {
                isAuthenticated ? (<div className="max-w-xs">
                    <Button
                        disabled={isLoading}
                        onClick={handleLogout}
                        className="fw-bold py-2 rounded-3"
                    >
                        {isLoading ? 'Logging out...' : 'Logout'}
                    </Button>
                </div>) : null
            }

            <section style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                <p>Components testing</p>

                <Button variant={"primary-icon"} icon={"edit"}>Button CTA</Button>
                <Avatar variant={"upload"}/>
                <SocialButton variant={"google"}/>
            </section>
        </div>
    );
};

export default HomePage;