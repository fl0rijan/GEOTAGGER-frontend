import EyeIcon from '../../assets/icons/Eye.svg?react';
import React, {useState} from "react";
import {clsx} from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    placeholder?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, type, leftIcon, rightIcon, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        const isPassword = type === 'password';
        const inputType = isPassword && showPassword ? 'text' : type;

        return (
            <div className={"input-container"}>
                {label && <label className={"input-label"}>{label}</label>}

                <div className={"input-wrapper"}>
                    {leftIcon && (
                        <div className={"icon-left"}>
                            {leftIcon}
                        </div>
                    )}

                    <input
                        ref={ref}
                        type={inputType}
                        className={clsx(
                            "input-component",
                            error && "input-error",
                        )}
                        style={{
                            paddingLeft: leftIcon ? '45px' : '4px',
                            paddingRight: (rightIcon || isPassword) ? '45px' : '4px',
                        }}
                        {...props}
                    />

                    <div className={"icon-right"}>
                        {isPassword ? (
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="border-0 bg-transparent p-0 flex items-center"
                                tabIndex={-1}
                            >
                                <EyeIcon width={20} height={20} />
                            </button>
                        ) : (
                            rightIcon
                        )}
                    </div>
                </div>

                {error && <span className={"error-message"}>{error}</span>}
            </div>
        );
    }
);

Input.displayName = "Input";