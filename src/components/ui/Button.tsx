import React from 'react';
import {Spinner} from "react-bootstrap";
import {clsx} from "clsx";

import EditIcon from '../../assets/icons/ModeFilled.svg?react';
import DeleteIcon from '../../assets/icons/CloseFilled.svg?react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    variant?: 'primary' | 'secondary' | 'ghost' | 'link' | 'link-green' | 'primary-icon';
    icon?: null | 'edit' | 'delete';
    iconBg?: 'danger' | null;
}

const Button = ({
                    children,
                    icon = null,
                    isLoading,
                    variant = 'primary',
                    className,
                    iconBg = null,
                    ...props
                }: ButtonProps) => {
    const variants = {
        primary: 'button-primary text-white bg-primary border-primary border-opacity-50 box-shadow-xs',
        secondary: 'button-secondary bg-white',
        ghost: 'button-ghost bg-white',
        link: 'button-link text-dark',
        'link-green': 'button-green-link text-primary',
        'primary-icon': 'bg-primary text-white button-primary ' + (iconBg ? `bg-${iconBg}` : ''),
    };

    const isLink = variant === 'link' || variant === 'link-green';
    const isIcon = icon !== null && variant === 'primary-icon';

    const icons = {
        edit: <EditIcon fill="none"/>,
        delete: <DeleteIcon fill="none"/>,
    };

    return (
        <button
            disabled={isLoading || props.disabled}
            className={clsx(
                "btn",
                isLink ? "link-button" : isIcon ? "icon-button base-button" : "base-button",
                variants[variant],
                className
            )}
            {...props}
        >
            {isLoading ? (
                <Spinner animation="border" size="sm" role="status" aria-hidden="true"/>
            ) : (
                isIcon ? icons[icon] :
                    children
            )}
        </button>
    );
};

export default Button;