import axios from "axios";

export function CreateUser(username: string, email: string, password: string){
    return axios.post("/api/auth/register", {
        username: !username ? undefined : username,
        email,
        password,
    });
}

export function LoginUser(email: string, password: string){
    return axios.post("/api/auth/login", {
        email,
        password
    });
}
