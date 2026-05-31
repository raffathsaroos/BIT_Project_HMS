import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getDashboardPath, useAuth } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { isAuthenticated, loading, login, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!loading && isAuthenticated && user) navigate(getDashboardPath(user.role), { replace: true });
    }, [isAuthenticated, loading, navigate, user]);

    const handleSubmit = async (event) => {
        event.preventDefault(); setError(''); setSubmitting(true);
        try {
            const loggedInUser = await login({ email, password });
            const requestedPath = location.state?.from?.pathname;
            const dashboardPath = getDashboardPath(loggedInUser.role);
            navigate(requestedPath && requestedPath !== '/login' ? requestedPath : dashboardPath, { replace: true });
        } catch (err) { setError(err.message || 'Login failed. Please try again.'); }
        finally { setSubmitting(false); }
    };

    return (
        <main style={styles.page}>
            <section style={styles.card}>
                <div style={styles.brandBadge}>HMS</div>
                <h1 style={styles.title}>Hospital Portal Login</h1>
                <p style={styles.subtitle}>Sign in to access your role-based dashboard.</p>
                {error && <div style={styles.error}>{error}</div>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <label style={styles.label} htmlFor="email">Email address</label>
                    <input id="email" style={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@hospital.com" autoComplete="email" required />
                    <label style={styles.label} htmlFor="password">Password</label>
                    <input id="password" style={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" autoComplete="current-password" required />
                    <button style={styles.submitButton} type="submit" disabled={submitting}>{submitting ? 'Signing in...' : 'Login'}</button>
                </form>
                <p style={styles.footerText}>Create user account as patient here || <Link style={styles.link} to="/signup">Create one</Link></p>
            </section>
        </main>
    );
}

const styles = {
    page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #0891b2 100%)', padding: '24px', fontFamily: 'Arial, sans-serif' },
    card: { width: '100%', maxWidth: '440px', background: '#ffffff', borderRadius: '24px', padding: '34px', boxShadow: '0 24px 80px rgba(2, 6, 23, 0.35)' },
    brandBadge: { width: '64px', height: '64px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#2563eb', color: '#ffffff', fontWeight: 800, marginBottom: '18px' },
    title: { margin: 0, color: '#0f172a', fontSize: '30px' },
    subtitle: { color: '#64748b', marginTop: '8px', marginBottom: '24px' },
    error: { background: '#fee2e2', color: '#991b1b', borderRadius: '12px', padding: '12px', marginBottom: '16px', fontWeight: 600 },
    form: { display: 'flex', flexDirection: 'column', gap: '10px' },
    label: { color: '#334155', fontWeight: 700, fontSize: '14px' },
    input: { border: '1px solid #cbd5e1', borderRadius: '12px', padding: '13px 14px', fontSize: '15px', marginBottom: '8px' },
    submitButton: { border: 'none', borderRadius: '12px', padding: '14px 18px', background: '#2563eb', color: '#ffffff', fontWeight: 800, fontSize: '16px', cursor: 'pointer', marginTop: '8px' },
    footerText: { textAlign: 'center', color: '#64748b', marginTop: '22px' },
    link: { color: '#2563eb', fontWeight: 800, textDecoration: 'none' },
};

export default Login;
