import {z} from "zod";
import {Modal} from "../ui/Modal.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import Button from "../ui/Button.tsx";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useUpdateProfileMutation} from "../../store/api/userApi.ts";
import React, {useEffect, useRef, useState} from "react";
import {useFileUpload} from "../../hooks/useFileUpload.ts";
import Avatar from "../ui/Avatar.tsx";
import {openFeedbackModal} from "../../store/slices/uiSlice.ts";

const pictureSchema = z.object({
    image: z.url("Invalid image URL"),
});

type PictureFields = z.infer<typeof pictureSchema>;

interface ChangePictureModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ChangePictureModal = ({isOpen, onClose}: ChangePictureModalProps) => {
    const {user} = useAppSelector((state) => state.auth);
    const {uploadSingle} = useFileUpload();
    const [updateProfilePicture] = useUpdateProfileMutation();
    const dispatch = useAppDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(user?.image || null);
    const [isProcessing, setIsProcessing] = useState(false);

    const {handleSubmit, reset} = useForm<PictureFields>({
        resolver: zodResolver(pictureSchema),
    });

    const wasOpenRef = useRef(false);

    useEffect(() => {
        if (isOpen && !wasOpenRef.current) {
            reset({ image: user?.image || "" });
            setSelectedFile(null);
            setPreviewUrl(user?.image || null);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }

        wasOpenRef.current = isOpen;
    }, [isOpen, user?.image, reset]);

    const handlePickFile = () => fileInputRef.current?.click();

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const onSubmit = async () => {
        if (!selectedFile) return;

        setIsProcessing(true);
        try {
            const s3Url = await uploadSingle(selectedFile);

            await updateProfilePicture({image: s3Url}).unwrap();

            dispatch(openFeedbackModal({
                title: "Information changed.",
                message: "Your settings are saved.",
                variant: "success"
            }));

            onClose();
        } catch (err) {
            console.error("Upload/Update failed:", err);
        } finally {
            setIsProcessing(false);
        }
    };


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={"profile-settings-alt-text"}>
                <h2 className="profile-settings-title">
                    Profile&nbsp;<span>settings.</span>
                </h2>

                <p>Change your profile photo.</p>

                <div className="profile-settings-picture-container">
                    <Avatar src={previewUrl} size={"default"}/>
                    <input
                        type="file"
                        ref={fileInputRef}
                        hidden
                        accept="image/*"
                        onChange={onFileChange}
                    />
                    <Button variant={"secondary"} onClick={handlePickFile} id={"btn-picture-select"}>Upload new
                        picture</Button>
                </div>


                <div className="d-flex justify-content-end gap-3">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onClose}
                        id="btn-picture-cancel"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        isLoading={isProcessing}
                        disabled={!selectedFile}
                        onClick={handleSubmit(onSubmit)}
                        variant="primary"
                        id="btn-picture-save"
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </Modal>
    );
};