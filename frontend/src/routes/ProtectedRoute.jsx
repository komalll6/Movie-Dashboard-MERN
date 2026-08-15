import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, token } = useAuth();
  
  // LocalStorage se bhi backup check
  const savedToken = localStorage.getItem("komsify_token");

  if (!isAuthenticated && !savedToken) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
