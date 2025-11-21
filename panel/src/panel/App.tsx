import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/auth/login";
import { useUser } from "@/utils/api/queries"
import Loading from "./components/loading";

function App(){ 
    const path = window.location.pathname;
    const user = useUser();
    const nav = useNavigate();
    if ( user.isLoading ) return ; <Loading />;
    if ( !user.data?.user && !path.startsWith("/auth")) nav('/auth/login?redirect=${encodeURIComponent(path)}');
}