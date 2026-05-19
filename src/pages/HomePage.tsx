import {usePerformLogoutMutation} from "../store/api/authApi.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {baseApi} from "../store/api/baseApi";
import Button from "../components/ui/Button.tsx";
import Avatar from "../components/ui/Avatar.tsx";
import SocialButton from "../components/ui/SocialButton.tsx";
import ProfilePoints from "../components/ui/ProfilePoints.tsx";
import GuessCard from "../components/ui/GuessCard.tsx";
import {useGetLocationsQuery} from "../store/api/locationApi.ts";
import {Spinner} from "react-bootstrap";
import {Input} from "../components/ui/Input.tsx";

import MailIcon from '../assets/icons/mail.svg?react';
import {GoogleMap} from "../components/ui/GoogleMap.tsx";
import {useState} from "react";
import {openErrorModal} from "../store/slices/uiSlice.ts";
import {ProfileSettingsModal} from "../components/profile/ProfileSettingsModal.tsx";
import {ChangePasswordModal} from "../components/profile/ChangePasswordModal.tsx";

type ModalType = 'none' | 'settings' | 'password' | 'picture';

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [logout] = usePerformLogoutMutation();
    const {data, isLoading} = useGetLocationsQuery({page: 1, limit: 10});

    const locations = data?.data || [];

    const handleLogout = async () => {
        try {
            await logout().unwrap();

            dispatch(baseApi.util.resetApiState());

            navigate("/login", {replace: true});

        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const testModal = () => {
        dispatch(openErrorModal({
            title: "Testna napaka",
            message: "Lorem ipsum dolor sit amet consectetur. Sit morbi ac nisi nunc sollicitudin sed viverra lacus. Nisi erat quis et scelerisque tortor. Dui lacinia habitasse amet scelerisque pretium felis risus magna. Elit dolor nunc placerat morbi tristique felis amet.",
            statusCode: 500
        }));
    };

    const [userGuess, setUserGuess] = useState<{ lat: number, lng: number } | null>(null);

    const {user, token, isAuthenticated} = useAppSelector((state) => state.auth);

    const [activeModal, setActiveModal] = useState<ModalType>('none');

    const closeAll = () => setActiveModal('none');

    if (isLoading) return <Spinner/>;

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
                <ProfilePoints/>

                <Button variant={"ghost"}>Button CTA</Button>
                <GuessCard location={locations[0]}/>

                <Input label={"Email"} placeholder={"hey@geotagger.com"} leftIcon={<MailIcon/>} type={"password"}/>

                <GoogleMap
                    marker={userGuess}
                    onLocationSelect={(lat, lng) => setUserGuess({ lat, lng })}
                />

                <Button onClick={testModal}>Error Modal</Button>


                <>
                    <Button onClick={() => setActiveModal('settings')}>Edit Profile</Button>

                    <ProfileSettingsModal
                        isOpen={activeModal === 'settings'}
                        onClose={closeAll}
                        onOpenPassword={() => setActiveModal('password')}
                        onOpenPicture={() => setActiveModal('picture')}
                    />

                    <ChangePasswordModal
                        isOpen={activeModal === 'password'}
                        onClose={() => setActiveModal('settings')}
                    />
                </>
            </section>
        </div>
    );
};

export default HomePage;