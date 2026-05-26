import React, {useRef} from 'react';
import {clsx} from 'clsx';
import {Upload, X} from 'lucide-react';
import {Spinner} from 'react-bootstrap';

interface ImageUploadProps {
    value?: string;
    onChange: (file: File | null) => void;
    onRemove: () => void;
    error?: string;
    isLoading?: boolean;
}

export const ImageUpload = ({
                                value,
                                onChange,
                                onRemove,
                                error,
                                isLoading,
                            }: ImageUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleContainerClick = () => {
        if (!isLoading && !value) {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onChange(file);
        }
    };

    return (
        <div className="w-100 flex flex-column gap-2">
            <div
                className={clsx(
                    'image-upload-container',
                    error && 'image-upload-error',
                    value && "border-solid border-light"
                )}
                onClick={handleContainerClick}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="d-none"
                    id="tracker-location-image-input"
                />

                {isLoading ? (
                    <div className="text-center">
                        <Spinner animation="border" variant="primary"/>
                        <p className="mt-2 small text-muted">Uploading to AWS...</p>
                    </div>
                ) : value ? (
                    <>
                        <img src={value} alt="Preview" className={'image-upload-preview'}/>
                        <button
                            type="button"
                            className={'image-upload-remove'}
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemove();
                            }}
                            id="btn-remove-image"
                        >
                            <X size={18}/>
                        </button>
                    </>
                ) : (
                    <div className={'image-upload-upload-content'}>
                        <div className="bg-light p-3 rounded-circle mb-2">
                            <Upload size={24} className="text-primary"/>
                        </div>
                    </div>
                )}
            </div>

            {error && <div className="text-danger small fw-bold px-1">{error}</div>}
        </div>
    );
};