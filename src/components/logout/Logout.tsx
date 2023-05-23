import { useContext, useEffect } from "react";
import { AuthUser } from "../../context";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const { setAuthUser } = useContext(AuthUser);
    const navigate = useNavigate();
    window.sessionStorage.removeItem("Context");
    setAuthUser({});
    useEffect(() =>{
        navigate('/dashboard');
    },[])
    return <></>;
}

export default Logout;