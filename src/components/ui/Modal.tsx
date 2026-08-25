import React, {useEffect} from "react";
import {createPortal} from "react-dom";
import {clsx} from "clsx";

let openModalsCount = 0;

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    size?: "default" | "small";
}

export const Modal = ({isOpen, onClose, children, className, size= "default"}: ModalProps) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            openModalsCount++;

            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';

            document.body.style.height = '100vh';
        }

        return () => {
            if (isOpen) {
                openModalsCount--;

                if (openModalsCount <= 0) {
                    document.body.style.overflow = '';
                    document.body.style.height = '';
                    document.documentElement.style.overflow = '';
                    openModalsCount = 0;
                }
            }
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className="modal-screen"
        >
            <div
                className={size === "default" ? "modal-container" : "modal-container-small"}
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
            >
                <div className={clsx("modal-inner", className)}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};