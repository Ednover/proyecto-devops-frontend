import { useContext } from "react";
import AuthContext from "../../context/user/AuthUser";

const useAuthUser = () => {
    return useContext(AuthContext);
}

export default useAuthUser;