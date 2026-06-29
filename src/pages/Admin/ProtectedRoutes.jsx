import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";


const ProtectedRoutes = () => {
    const {user} = useAuthContext()
    if (!user) {
        toast.error(`You are not logged in. Please log in first!`);
        return <Navigate to="/login" />;
    }
    else{
        if (user.role !== 'admin' && user.role !== 'superadmin') {
            toast.error(`You are a ${user.role} and cannot access the admin dashboard.`);
            return <Navigate to="/" />;
        }
    }

  return (
    <div>
        {
            user.role === 'admin' || user.role === 'superadmin' ? <Outlet /> : <Navigate to="/" />
        }
    </div>
  )
}

export default ProtectedRoutes