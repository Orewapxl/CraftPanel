import { useEffect, useState } from "react";
import { LoginUser } from "@/panel/utils/api/auth";
import { setToken } from "../../utils/user";

const validate = (form: {[key: string]: string}) => {
    const errors: {[key: string]: string[]} = {};
    if (!form.email.trim()) errors.email = ["Email is required."];
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(form.email)) errors.email = ["Email is invalid."];
    if (!form.password) errors.password = ["Password is required."];
    else if (form.password.length < 6) errors.password = ["Password must be at least 6 characters."];
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(form.password)) errors.password = ["Password must contain uppercase, lowercase, number, and special character."];
    return errors;

};

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const { registered, redirect} = Object.fromEntries(new URLSearchParams(window.location.search))
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const request = async () => {
        const response = await LoginUser(form.email, form.password)
        if (response?.data?.success){
            setToken(response.data.data.token);
            window.location.href = redirect || "/";

        }
        setErrors(response?.data.errors || {})
    }


useEffect(() => {
    setErrors({});
    if (!form.email && !form.password) return;
    const validationErrors = validate(form);
    setErrors(validationErrors);
    }, [form]);

    return(
        <div className="flex min-h-screen relative overflow-hidden font-sans text-white">
            <div className="absolute inset-0 z-0"
            style={{background: "url('bg.jpg')", backgroundSize: "cover", backgroundPosition: "center"}}>
                <div className="absolute inset-0 bg-[#111]/80 backdrop-blur-sm"></div>
            </div>

            <div className="absolute inset-0 opacity-10">
                <svg className="absolute w-full h-full">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" className="text-lime-500"></rect>
                </svg>
            </div>
            <div className="w-full md:w-2/5 flex items-center justify-center bg[#242424]/50 backdrop-blur-sm">
            <div className="w-full max-w-mdmx-auto flex-col px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <h2 className="text-3x1 font-bold mb-6 text-white text-center">
                    Login to Yout Account
                </h2>
                {registered === "true" && <p className="bg-green-400/20 border border-green-500 text-green-300 px-4 py-3 rounded mb-6 text-center">
                    We’ve sent you a verification email — check your inbox to activate your account!
                </p>}
            </div>
            </div>
        </div>
    )



}


