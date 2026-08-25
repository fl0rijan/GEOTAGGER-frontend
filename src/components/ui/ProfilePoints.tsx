import {useAppSelector} from "../../store/hooks.ts";
import Avatar from "./Avatar.tsx";

const ProfilePoints = () => {
    const {user} = useAppSelector((state) => state.auth);

    return (
        <div className="profile-points">
            <Avatar src={user?.image}/>
            <div className="points">{user?.gamePoints}</div>
        </div>
    );
};

export default ProfilePoints;