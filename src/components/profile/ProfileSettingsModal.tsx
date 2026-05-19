import {z} from "zod";
import {Input} from "../ui/Input.tsx";
import {Modal} from "../ui/Modal.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import Button from "../ui/Button.tsx";
import {useAppSelector} from "../../store/hooks.ts";
import {useUpdateProfileMutation} from "../../store/api/userApi.ts";
import {useEffect} from "react";

const profileSchema = z.object({
    firstName: z.string().min(2, "Name is too short"),
    lastName: z.string().min(2, "Surname is too short"),
});

type ProfileFields = z.infer<typeof profileSchema>;

interface ProfileSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenPassword: () => void;
    onOpenPicture: () => void;
}

export const ProfileSettingsModal = ({isOpen, onClose, onOpenPassword, onOpenPicture}: ProfileSettingsModalProps) => {
    const {user} = useAppSelector((state) => state.auth);

    const [updateProfile, {isLoading: isUpdating}] = useUpdateProfileMutation();

    const {register, handleSubmit, reset, formState: {errors}} = useForm<ProfileFields>({
        resolver: zodResolver(profileSchema)
    });

    useEffect(() => {
        if (isOpen && user) {
            reset({
                firstName: user.firstName,
                lastName: user.lastName,
            });
        }
    }, [isOpen, user, reset]);

    const onSubmit = async (data: ProfileFields) => {
        try {
            await updateProfile(data).unwrap();

            onClose();
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={"profile-settings-text"}>
                <h2 className="profile-settings-title">
                    {"Profile"}
                    {" settings."}
                </h2>

                <p>Change your information.</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="profile-settings-form">
                        <Input
                            label="Email"
                            value={user?.email || ""}
                            readOnly
                        />

                        <div className="profile-settings-input-group">
                            <Input
                                label="Name"
                                id="profile-firstName"
                                {...register("firstName")}
                                error={errors.firstName?.message}
                            />
                            <Input
                                label="Surname"
                                id="profile-lastName"
                                {...register("lastName")}
                                error={errors.lastName?.message}
                            />
                        </div>

                        <div className="profile-settings-buttons">
                            <Button
                                type="button"
                                variant="link-green"
                                id="btn-nav-password"
                                onClick={onOpenPassword}
                                className="p-0 h-auto"
                            >
                                Change password
                            </Button>
                            <Button
                                type="button"
                                variant="link-green"
                                id="btn-nav-picture"
                                onClick={onOpenPicture}
                                className="p-0 h-auto"
                            >
                                Change profile picture
                            </Button>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end gap-3 mt-3">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                            id="btn-profile-cancel"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            isLoading={isUpdating}
                            variant="primary"
                            id="btn-profile-save"
                        >
                            Save changes
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};