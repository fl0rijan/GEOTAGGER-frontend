import {Form} from 'react-bootstrap';

interface InputProps {
    label: string;
    error?: string;
    //ostalo..
}

export const Input = ({label, error, ...props}: InputProps) => (
    <Form.Group className="mb-3">
        <Form.Label className="fw-bold text-secondary small">{label}</Form.Label>
        <Form.Control
            className={`py-2 px-3 ${error ? 'is-invalid' : ''}`}
            {...props}
        />
        <Form.Control.Feedback type="invalid" className="fw-bold">
            {error}
        </Form.Control.Feedback>
    </Form.Group>
);