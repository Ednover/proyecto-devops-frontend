import { useContext } from "react";
import { AuthUser } from "../../context";
import { useNavigate } from "react-router-dom";

function Logout () {
    const { setAuthUser } = useContext(AuthUser);
    const navigate = useNavigate();
    window.sessionStorage.removeItem("Context");
    setAuthUser({});
    navigate('/');
}

export default Logout;