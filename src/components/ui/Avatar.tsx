import {clsx} from "clsx";

import AvatarIcon from '../../assets/icons/Avatar.svg?react';

interface AvatarProps {
    src?: string | null;
    variant?: "default" | "upload";
    className?: string;
    size?: "small-avatar" | "default" ;
}

const Avatar = ({src, variant = "default", className, size="small-avatar"}: AvatarProps) => {
    const defaultAvatar = "https://gaylhwpyeocilfwtbyrp.supabase.co/storage/v1/object/public/auctions/e65a1f93-500e-49a4-8700-c8f704275f3f.jpg";

    return (
        <div className={clsx(
            variant === "upload" ? "avatar-upload" : "avatar",
            size,
            className
        )}>
            {variant === "upload" ? (
                <AvatarIcon/>
            ) : (
                <img
                    src={src && src.trim() !== "" ? src : defaultAvatar}
                    alt="User Profile"
                    className="avatar-img"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = defaultAvatar;
                    }}
                />
            )}
        </div>
    );
};

export default Avatar;