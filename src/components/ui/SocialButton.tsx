import React from 'react';
import {clsx} from "clsx";

import GoogleIcon from '../../assets/icons/Social icon.svg?react';
import FaceBookIcon from '../../assets/icons/Social icon fb.svg?react';


interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    variant?: "google" | "facebook";
}

const SocialButton = ({isLoading, variant = 'google', ...props}: SocialButtonProps) => {
    const variants = {
        google: 'google-button',
        facebook: 'facebook-button',
    }

    return (
        <button
            type="button"
            disabled={isLoading || props.disabled}
            className={clsx(
                "btn social-button",
                variants[variant],
            )}
            {...props}
        >
            {variant === 'google' ? <GoogleIcon/> : <FaceBookIcon/>}
            Sign in with {variant === 'google' ? "Google" : "Facebook"}
        </button>
    );
};

export default SocialButton;