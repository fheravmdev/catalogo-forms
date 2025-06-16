import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedRoute({children, allowedRoles}){
    const {auth} = useAuth();

    //si no está autenticado pal lobby
    if(!auth?.isAuthenticated) return <Navigate to="/"></Navigate>;

    //si no tiene permiso, pal lobby (para que se loggee como admin)
    if(allowedRoles && !auth.roles?.some(role => allowedRoles.includes(role))){
        return <Navigate to="/"></Navigate>
    }

    //finalmente si pasó los check, q lo deje pasar al componente que rodea ProtectedRoute
    return children
}

export default ProtectedRoute