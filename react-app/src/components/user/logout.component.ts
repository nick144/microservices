import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const nav = useNavigate();
    sessionStorage.clear();
    sessionStorage.removeItem('jwttoken');
    sessionStorage.removeItem('user');
    useEffect(() => {
        nav("/login");
    }, []);
}

export default Logout;