// import { Navigate } from "react-router-dom";
// import { useAuthStore } from "../store/useAuthStore";


// export default function ProtectedRoute({ children }) {
//   const { user, loading } = useAuthStore();

//   if (loading) return <p>Loading...</p>;
//   return user ? children : <Navigate to="/login" />;
// }


import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import LoadingRoute from "./LoadingRoute";

export default function ProtectedRoute() {
  const { user, loading } = useAuthStore();

    if (loading) {
      return <LoadingRoute/>; // ⏳ You can replace this with a spinner
    }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // 👈 Renders child routes like <Home />, <Pending />, etc.
}
