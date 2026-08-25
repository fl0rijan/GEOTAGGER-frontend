import {clsx} from "clsx";

import AddIcon from '../../assets/icons/Add.svg?react';
import DefaultAvatar from '../../assets/icons/Avatar.svg';

interface AvatarProps {
    src?: string | null;
    variant?: "default" | "upload";
    className?: string;
    size?: "small-avatar" | "default" ;
}

const Avatar = ({src, variant = "default", className, size="small-avatar"}: AvatarProps) => {
    const isDefault = src === null || src === undefined || src.trim() === "";

    return (
        <div className={clsx(
            variant === "upload" ? "avatar-upload" : "avatar",
            size,
            className
        )}>
            {variant === "upload" ? (
                <AddIcon/>
            ) : (
                <img
                    src={src && src.trim() !== "" ? src : DefaultAvatar}
                    alt="User Profile"
                    className={isDefault? "avatar-default": "avatar-img"}
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = DefaultAvatar;
                    }}
                />
            )}
        </div>
    );
};

export default Avatar;