import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {closeErrorModal} from '../../store/slices/uiSlice';
import {Modal} from './Modal';
import Button from "./Button.tsx";

export const FeedbackModal = () => {
    const dispatch = useAppDispatch();
    const {isOpen, title, message, statusCode, variant} = useAppSelector((state) => state.ui.errorModal);

    const renderTitle = () => {
        if (variant === 'error') {
            return statusCode ? `Ooppss! Error Code ${statusCode}` : "Ooppss!";
        }
        return title || "Information changed.";
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => dispatch(closeErrorModal())}
            className="error-modal-layer"
        >
            <div className="error-modal-text">
                <h2 className="error-modal-title">
                    {renderTitle()}
                </h2>


                <p>
                    {message || (variant === 'success' ? "Your settings are saved." : "An unexpected error occurred.")}
                </p>
            </div>

            <div className="error-modal-buttons">
                <Button
                    variant="primary"
                    onClick={() => dispatch(closeErrorModal())}
                >
                    {variant === 'error' ? "Dismiss" : "Close"}
                </Button>
            </div>
        </Modal>
    );
};