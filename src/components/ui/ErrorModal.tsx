import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {closeErrorModal} from '../../store/slices/uiSlice';
import {Modal} from './Modal';
import Button from "./Button.tsx";

export const ErrorModal = () => {
    const dispatch = useAppDispatch();
    const {isOpen, message, statusCode} = useAppSelector((state) => state.ui.errorModal);

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => dispatch(closeErrorModal())}
        >
            <div className="error-modal-text">
                <h2 className="error-modal-title">
                    {"Ooppss!"}
                    {" Error Code " + statusCode}
                </h2>


                <p>
                    {message || "An unexpected error occurred. Please try again later."}
                </p>
            </div>

            <div className="error-modal-buttons">
                <Button
                    variant="primary"
                    onClick={() => dispatch(closeErrorModal())}
                >
                    Dismiss
                </Button>
            </div>
        </Modal>
    );
};