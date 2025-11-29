import axios from "axios";

export function CreateUser(email: string, password: string, username: string){
    return axios.post("/api/auth/register", {
        email,
        password,
        username: !username ? undefined : username
    });
}

export function LoginUser(email: string, password: string){
    return axios.post("/api/auth/login", {
        email,
        password
    });
}
