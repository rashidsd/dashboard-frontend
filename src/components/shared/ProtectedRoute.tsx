import useLocalStorage from "../../hooks/useLocalStorage";
import { Navigate } from "react-router-dom";
import AccessDenied from "../../pages/AccessDenied";

function ProtectedRoute({ children,roleName }: {children:any,roleName:string}) {
 const { user,roles } = useLocalStorage();
 const roleNames = roles.map((r:any)=>r.RoleName)

  if (!user) 
    return <Navigate to="/login" replace={true} />;
    if (!roleNames.includes(roleName) && roleName)
        return <AccessDenied />
  
  return children;
}

export default ProtectedRoute;
