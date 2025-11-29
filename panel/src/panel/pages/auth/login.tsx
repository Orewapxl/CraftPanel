import { useEffect, useState } from "react";
import { LoginUser } from "@/panel/utils/api/auth";
import { User, Key } from "lucide-react"
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
    const { registered, redirect, verified } = Object.fromEntries(new URLSearchParams(window.location.search))
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
        <div className="flex h-screen w-screen items-center justify-center">
                <div className="absolute top-0 left-0 w-full h-full z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,165,0,0.15),rgba(255,255,255,0))]" />
                <div className="px-2 w-screen h-screen justify-center items-center flex">
                    <div className="bg-slate-950 p-8 max-w-lg w-full mx-auto flex flex-col gap-4 border-2 border-lime-500 hover:border-lime-400 rounded-none transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_-5px_rgba(132,204,22,0.4)]">
                        {registered === "true" && <p className="bg-lime-500/20 border-lime-500 text-lime-300 px-4 py-3 rounded mb-6 text-center">
                            We sent you a confirmation email. Please check your inbox to confirm your account.
                        </p>}
                        {verified === "true" && <p className="bg-lime-500/20 border-lime-500 text-lime-300 px-4 py-3 rounded mb-6 text-center">
                            Your email has been verified. You can now log in.
                        </p>}
            <h1 className="font-semibold text-2xl text-lime-300">Login</h1>

            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                    <label className="text font-bold text-lime-500">Email</label>
                    {errors.email && <p className="text-red-400">{errors.email[0]}</p>}
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="px-4 py-3 rounded-lg bg-[#313131] border-b-3 border-[#242323] text-white focus:outline-none focus:ring-lime-400/50 transition-all" />

                </div>
                <div className="flex flex-col gap-1">
                    <label className="text font-bold">Password</label>
                    {errors.password && <p className="text-red-400">{errors.password[0]}</p>}
                    <div className="flex focus-within:ring-2 rounded-lg focus-within:ring-lime-400/50 transition-all">
                    <input
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="px-4 py-3 rounded-l-lg w-full bg-[#313131] border-b-3 border-[#242323] text-white focus:outline-none transition-all" />

                    </div>
                    
                </div>
                <button
                    onClick={() => request()}
                    disabled={!Object.keys(errors).length}
                    className="mt-4 w-full flex justify-center items-center py-2 border-2 border-lime-500 hover:border-lime-400 text-lime-400 font-bold rounded-none hover:bg-lime-500/10 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                    <User className="w-5" />
                    Login
                    </button>

                    <div className="flex justify-between text-sm text-gray-400 mt-2 gap-1 ">
                        <p>
                            Don't have an account? <a href="/register" className="text-lime-300">Sign up</a>
                        </p>
                    </div>
            </div>
            </div>
            </div>
        </div>

    )

}
