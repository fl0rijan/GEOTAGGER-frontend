import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "../ui/Input.tsx";
import {Modal} from "../ui/Modal.tsx";
import Button from "../ui/Button.tsx";
import {useForm} from "react-hook-form";
import type {UpdatePasswordDto} from "../../types/api";
import {useUpdatePasswordMutation} from "../../store/api/authApi.ts";
import {openErrorModal} from "../../store/slices/uiSlice.ts";
import {useAppDispatch} from "../../store/hooks.ts";
import {useEffect} from "react";

const passwordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

type PasswordFields = z.infer<typeof passwordSchema>;

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ChangePasswordModal = ({isOpen, onClose}: ChangePasswordModalProps) => {
    const [updatePassword, {isLoading}] = useUpdatePasswordMutation();
    const dispatch = useAppDispatch();
    const {register, handleSubmit, reset, formState: {errors, isDirty}} = useForm<PasswordFields>({
        resolver: zodResolver(passwordSchema),
        mode: 'onTouched',
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        }
    });


    const onSubmit = async (data: PasswordFields) => {
        try {
            const dto: UpdatePasswordDto = {
                currentPassword: data.currentPassword,
                newPassword: data.newPassword
            };

            await updatePassword(dto).unwrap();


            dispatch(openErrorModal({
                title: "Information changed.",
                message: "Your settings are saved.",
                variant: "success"
            }));

            onClose();
        } catch { /* empty */
        }
    };

    useEffect(() => {
        if (!isOpen) {
            reset({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        }
    }, [isOpen, reset]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={"profile-settings-alt-text"}>
                <h2 className="profile-settings-title">
                    Profile&nbsp;<span>settings.</span>
                </h2>
                <p>Change your password</p>

                <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3">
                    <div className="profile-settings-form">
                        <Input
                            label="Current password"
                            type="password"
                            {...register("currentPassword")}
                            error={errors.currentPassword?.message}
                        />

                        <Input
                            label="New password"
                            type="password"
                            {...register("newPassword")}
                            error={errors.newPassword?.message}
                        />

                        <Input
                            label="Repeat new password"
                            type="password"
                            {...register("confirmPassword")}
                            error={errors.confirmPassword?.message}
                        />
                    </div>
                    <div className={"d-flex justify-content-end gap-3 mt-13"}>
                        <Button type="button" variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" isLoading={isLoading || isLoading} disabled={!isDirty || isLoading}>
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    )
        ;
}

