import { Link } from "react-router-dom";
import {useAppSelector} from "../../store/hooks.ts";
import Avatar from "./Avatar.tsx";

const ProfilePoints = () => {
    const {user} = useAppSelector((state) => state.auth);

    return (
        <div className="profile-points profile-points-mobile">
            <div className="points">{user?.gamePoints}</div>
            <Link
            to="/location/create">
                <Avatar variant={"upload"}/>
            </Link>

        </div>
    );
};

export default ProfilePoints;