import { createBrowserRouter } from "react-router-dom"
import Layout from "../components/Layout"
import Login from "../pages/Login";
import ProtectedRoute from "../components/shared/ProtectedRoute";
import AssignRoles from "../pages/user/AssignRoles";
import ChangePassword from "../pages/ChangePassword";
import AccessDenied from "../pages/AccessDenied";
import ManageUser from "../pages/user/ManageUser";
import dashbaord from "./dashboard";
import ManageRoles from "../pages/roles/ManageRoles";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

   {
    path: "/",
    element: <ProtectedRoute>
        <Layout />
    </ProtectedRoute>
   ,
    children: [
      {
        path: "user",
        element: 
          <ProtectedRoute roleName='Manage Users'>
            <ManageUser />
          </ProtectedRoute>
      },

      {
        path: "role",
        element: 
          <ProtectedRoute roleName='Manage Roles'>
            <ManageRoles />
          </ProtectedRoute>
      },
      {
        path: "changePassword",
        element: (
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        )
      },
      {
        path: "assignRoles",
        element: 
        <ProtectedRoute>
        <AssignRoles />
        </ProtectedRoute>
      },
      {
        path: "accessdenied",
        element: 
        <ProtectedRoute>
        <AccessDenied />
        </ProtectedRoute>
      },
      
      ...dashbaord,
      {
        path: "*",
        element:<h4>Not Found</h4> 
       
      },
    ],
  },
]);

export default router;