import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await loginUser(formData);
            login(data.user, data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <div style={styles.logoRow}>
                    <div style={styles.logoBadge}>✚</div>
                    <div>
                        <h1 style={styles.title}>MediCore HMS</h1>
                        <p style={styles.subtitle}>Hospital Management System</p>
                    </div>
                </div>

                <h2 style={styles.formTitle}>Welcome Back</h2>
                <p style={styles.formSub}>Sign in to your account</p>

                {error && <div style={styles.errorBox}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={styles.fieldGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input
                            style={styles.input}
                            type="email" name="email"
                            placeholder="doctor@hospital.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={styles.fieldGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            style={styles.input}
                            type="password" name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button style={loading ? {...styles.btn, opacity:0.7} : styles.btn}
                        type="submit" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <p style={styles.switchText}>
                    Don't have an account?{" "}
                    <Link to="/signup" style={styles.link}>Create one here</Link>
                </p>
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center",
        background: "linear-gradient(135deg, #060d1f 0%, #0a1628 50%, #060d1f 100%)",
        fontFamily: "'Segoe UI', sans-serif", padding: "20px"
    },
    card: {
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(56,189,248,0.15)",
        borderRadius: "20px", padding: "44px 40px",
        width: "100%", maxWidth: "420px",
        boxShadow: "0 25px 60px rgba(0,0,0,0.5)"
    },
    logoRow: { display:"flex", alignItems:"center", gap:"14px", marginBottom:"32px" },
    logoBadge: {
        width:"48px", height:"48px", borderRadius:"12px",
        background:"linear-gradient(135deg,#38bdf8,#0ea5e9)",
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:"22px", color:"#fff", fontWeight:"bold", flexShrink:0
    },
    title: { color:"#f0f9ff", fontSize:"20px", fontWeight:700, margin:0 },
    subtitle: { color:"#64748b", fontSize:"12px", margin:"2px 0 0 0" },
    formTitle: { color:"#f0f9ff", fontSize:"24px", fontWeight:700, margin:"0 0 6px 0" },
    formSub: { color:"#64748b", fontSize:"14px", margin:"0 0 28px 0" },
    errorBox: {
        background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.3)",
        color:"#fca5a5", borderRadius:"10px", padding:"12px 16px",
        fontSize:"14px", marginBottom:"20px"
    },
    fieldGroup: { marginBottom:"20px" },
    label: { display:"block", color:"#94a3b8", fontSize:"13px", fontWeight:600, marginBottom:"8px" },
    input: {
        width:"100%", padding:"12px 16px", borderRadius:"10px",
        border:"1px solid rgba(56,189,248,0.2)",
        background:"rgba(255,255,255,0.05)", color:"#f0f9ff",
        fontSize:"15px", outline:"none", boxSizing:"border-box",
        transition:"border 0.2s"
    },
    btn: {
        width:"100%", padding:"13px", borderRadius:"10px",
        background:"linear-gradient(135deg,#38bdf8,#0ea5e9)",
        color:"#fff", fontWeight:700, fontSize:"16px",
        border:"none", cursor:"pointer", marginTop:"8px",
        transition:"opacity 0.2s"
    },
    switchText: { textAlign:"center", color:"#64748b", fontSize:"14px", marginTop:"24px" },
    link: { color:"#38bdf8", textDecoration:"none", fontWeight:600 }
};