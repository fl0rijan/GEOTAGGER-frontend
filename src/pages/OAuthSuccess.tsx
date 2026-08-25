import {useEffect} from "react";
import {useSearchParams, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../store/hooks";
import {setToken, setCredentials} from "../store/slices/authSlice";
import {authApi} from "../store/api/authApi";
import {Spinner} from "react-bootstrap";

export default function OAuthSuccess() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = searchParams.get("token");

        const finalizeLogin = async () => {
            if (token) {
                try {
                    dispatch(setToken(token));

                    const userProfile = await dispatch(
                        authApi.endpoints.getMe.initiate(undefined, {forceRefetch: true})
                    ).unwrap();

                    dispatch(setCredentials({user: userProfile, token}));

                    navigate("/", {replace: true});
                } catch (error) {
                    console.error("OAuth Profile Fetch failed", error);
                    navigate("/login");
                }
            } else {
                navigate("/login");
            }
        };

        void finalizeLogin();
    }, [searchParams, dispatch, navigate]);

    return (
        <div className="h-screen w-screen d-flex flex-column align-items-center justify-content-center bg-alternative">
            <Spinner/>
        </div>
    );
}