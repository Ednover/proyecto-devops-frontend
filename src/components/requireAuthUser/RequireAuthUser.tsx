import { useLocation, Navigate, Outlet } from "react-router";
import { useAuthUser } from "../../hooks";

const RequireAuth = () => {
    const { authUser } = useAuthUser();
    const location = useLocation();

    return (
        authUser?.userName
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;