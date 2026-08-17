import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Always import from AuthContext

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const savedToken = localStorage.getItem("komsify_token");

  if (!isAuthenticated && !savedToken) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;