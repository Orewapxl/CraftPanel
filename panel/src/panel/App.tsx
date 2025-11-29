import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { useUser } from "@/utils/api/queries"
import Loading from "./components/loading";

function App(){ 
    const path = window.location.pathname;
    const user = useUser();
    const nav = useNavigate();
    if ( user.isLoading ) return ; <Loading />;
    if ( !user.data?.user && !path.startsWith("/auth")) nav('/auth/login?redirect=${encodeURIComponent(path)}');
    return(
        <Routes>
            <Route path="/" element={<Navigate to={user?.data?.user ? "dashboard" : "auth/login"} replace={true} />}></Route>
            <Route path="/auth/login" element={user?.data?.user ? <Navigate to="/" replace={true} /> : <Login /> }></Route>
            <Route path="/auth/register" element={user?.data?.user ? <Navigate to="/" replace={true} /> : <Register />} />
        </Routes>
    )
}

export default App