import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { token, loading } = useAuth();

    if (loading) return (
        <div style={{
            display:"flex", justifyContent:"center",
            alignItems:"center", height:"100vh", background:"#060d1f", color:"#38bdf8"
        }}>
            Loading...
        </div>
    );

    return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;