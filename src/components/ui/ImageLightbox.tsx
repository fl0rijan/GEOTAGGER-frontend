import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface ImageLightboxProps {
    src: string | undefined;
    isOpen: boolean;
    onClose: () => void;
}

export const ImageLightbox = ({ src, isOpen, onClose }: ImageLightboxProps) => {
    if (!src) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3 p-md-5"
                    style={{ zIndex: 1050 }}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-75"
                        style={{ cursor: "zoom-out", backdropFilter: "blur(24px)" }}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="position-relative mw-100 mh-100 d-flex align-items-center justify-content-center pe-none"
                    >
                        <img
                            src={src}
                            alt="Full view"
                            className="img-fluid rounded-3 shadow-lg"
                            style={{ maxHeight: "90vh", objectFit: "contain" }}
                        />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};
