import { use, useEffect, useState } from "react";
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
        <div className="flex flex-1"
    )



}


