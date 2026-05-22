import {useLoginMutation} from "../store/api/authApi.ts";
import {type LoginFields, loginSchema } from "../lib/validations.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Link, useNavigate} from "react-router-dom";
import {Input} from "../components/ui/Input.tsx";
import MailIcon from '../assets/icons/mail.svg?react';
import Button from "../components/ui/Button.tsx";
import type {LoginDto} from "../types/api";
import SocialButton from "../components/ui/SocialButton.tsx";

const RegisterPage = () => {
    const [signin, {isLoading}] = useLoginMutation();
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}} = useForm<LoginFields>({
        resolver: zodResolver(loginSchema),
        mode: 'onTouched'
    });

    const onSubmit = async (data: LoginFields) => {
        try {
            await signin(data as LoginDto).unwrap();

            navigate("/login");
        } catch { /* empty */
        }
    };

    const handleSocialLogin = (provider: 'google' | 'facebook') => {
        window.location.href = `${import.meta.env.VITE_API_URL}/${provider}`;
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="auth-container">
                    <div className="auth-text-container auth-text text-center">
                        <h2>Sign in</h2>
                        <p>Welcome back to Geotagger. We are glad that you are back.</p>
                    </div>

                    <Input {...register("email")} label={"Email"} placeholder={"hey@geotagger.com"}
                           leftIcon={<MailIcon/>} error={errors.email?.message}/>
                    <Input {...register("password")} label={"Password"} type={"password"}
                           error={errors.password?.message}/>

                    <Button isLoading={isLoading} type={"submit"} className={"w-100"}>Sign in</Button>

                    <SocialButton variant="google" onClick={() => handleSocialLogin('google')}/>
                    <SocialButton variant="facebook" onClick={() => handleSocialLogin('facebook')}/>


                    <div className="d-flex justify-content-between align-items-baseline auth-text">
                        <p>Do you want to create an account?</p>
                        <Link to="/register">
                            <Button variant="link-green">Sign up</Button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;