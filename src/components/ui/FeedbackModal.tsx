import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {closeFeedbackModal} from '../../store/slices/uiSlice';
import {Modal} from './Modal';
import Button from "./Button.tsx";
import {clsx} from "clsx";

export const FeedbackModal = () => {
    const dispatch = useAppDispatch();
    const {isOpen, title, message, statusCode, variant, onConfirm} = useAppSelector((state) => state.ui.errorModal);

    const handleClose = () => dispatch(closeFeedbackModal());

    const renderTitle = () => {
        if (variant === 'error') {
            return statusCode ? `Ooppss! Error Code ${statusCode}` : "Ooppss!";
        }
        return title || "Information changed.";
    };

    const handleConfirm = () => {
        if (onConfirm) onConfirm();
        handleClose();
    };

    return (
        <Modal
            size={variant === "confirm" || variant === "quote" ? "small" : "default"}
            isOpen={isOpen}
            onClose={handleClose}
            className={clsx("error-modal-layer",
                variant === 'confirm' && "error-modal-confirm",
                variant === 'quote' && "error-modal-quote",)}
        >
            <div className="error-modal-text">
                {variant !== 'quote' && <h2 className="error-modal-title">
                    {renderTitle()}
                </h2>}

                <p>
                    {message || (variant === 'success' ? "Your settings are saved." : "An unexpected error occurred.")}
                </p>
            </div>

            <div className="error-modal-buttons">
                {variant === 'confirm' ? (
                        <>
                            <Button variant="ghost" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleConfirm}>
                                Submit
                            </Button>
                        </>
                    ) :
                    (<Button
                        variant="primary"
                        onClick={() => dispatch(closeFeedbackModal())}
                    >
                        {variant === 'error' || variant === 'quote' ? "Dismiss" : "Close"}
                    </Button>)}
            </div>
        </Modal>
    );
};