import {useRegisterMutation} from "../store/api/authApi.ts";
import {type SignupFields, signupSchema} from "../lib/validations.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Link, useNavigate} from "react-router-dom";
import Avatar from "../components/ui/Avatar.tsx";
import {Input} from "../components/ui/Input.tsx";
import MailIcon from '../assets/icons/mail.svg?react';
import Button from "../components/ui/Button.tsx";
import type {SignUpDto} from "../types/api";
import {openFeedbackModal} from "../store/slices/uiSlice.ts";
import {useAppDispatch} from "../store/hooks.ts";

const RegisterPage = () => {
    const [signup, {isLoading}] = useRegisterMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {register, handleSubmit, formState: {errors}} = useForm<SignupFields>({
        resolver: zodResolver(signupSchema),
        mode: 'onTouched'
    });

    const onSubmit = async (data: SignupFields) => {
        try {
            const {confirmPassword: _, ...dto} = data;
            await signup({signUpDto: dto as SignUpDto}).unwrap();

            dispatch(openFeedbackModal({
                title: "Account created! You may login now.",
                message: "Please check your email to verify your account.",
                variant: "success"
            }));

            navigate("/login");
        } catch { /* empty */
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="auth-container">
                    <div className="auth-text-container auth-text text-center">
                        <h2>Sign up</h2>
                        <p>Your name will appear on posts and your public profile.</p>
                    </div>
                    <div className={"text-center"}>
                        <Avatar size={"default"}/>
                    </div>

                    <Input {...register("email")} label={"Email"} placeholder={"hey@geotagger.com"}
                           leftIcon={<MailIcon/>} error={errors.email?.message}/>
                    <Input {...register("firstName")} label={"First name"} placeholder={"John"}
                           error={errors.firstName?.message}/>
                    <Input {...register("lastName")} label={"Last name"} placeholder={"Doe"}
                           error={errors.lastName?.message}/>
                    <Input {...register("password")} label={"Password"} type={"password"}
                           error={errors.password?.message}/>
                    <Input {...register("confirmPassword")} label={"Repeat password"} type={"password"}
                           error={errors.confirmPassword?.message}/>

                    <Button isLoading={isLoading} type={"submit"} className={"w-100"}>Sign up</Button>

                    <div className="d-flex justify-content-between align-items-baseline auth-text">
                        <p>Already have an account?</p>
                        <Link to="/login">
                            <Button variant="link-green">Sign in</Button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;