import {Modal, Button} from 'react-bootstrap';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {closeErrorModal} from '../../store/slices/uiSlice';
import {AlertTriangle} from 'lucide-react';

export const ErrorModal = () => {
    const dispatch = useAppDispatch();
    const {isOpen, title, message, statusCode} = useAppSelector((state) => state.ui.errorModal);

    const handleClose = () => dispatch(closeErrorModal());

    return (
        <Modal
            show={isOpen}
            onHide={handleClose}
            centered
            backdrop="static"
        >
            <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title className="fw-black text-primary d-flex align-items-center gap-2">
                    <AlertTriangle className="text-danger"/>
                    {title}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="pt-2">
                {statusCode && (
                    <div className="badge bg-danger-subtle text-danger mb-2">
                        Status Code: {statusCode}
                    </div>
                )}
                <p className="text-muted fw-light">{message}</p>
            </Modal.Body>

            <Modal.Footer className="border-0 pt-0">
                <Button variant="secondary" className="w-100 py-3" onClick={handleClose}>
                    Dismiss
                </Button>
            </Modal.Footer>
        </Modal>
    );
};