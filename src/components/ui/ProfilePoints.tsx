import {useAppSelector} from "../../store/hooks.ts";
import Avatar from "./Avatar.tsx";
import {Link} from "react-router-dom";

const ProfilePoints = () => {
    const {user} = useAppSelector((state) => state.auth);

    return (
        <Link to="/profile" className="profile-points text-decoration-none">
                <Avatar src={user?.image}/>
                <div className="points">{user?.gamePoints}</div>
        </Link>
    );
};

export default ProfilePoints;