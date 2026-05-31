import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDashboardPath, useAuth } from '../context/AuthContext';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const { isAuthenticated, loading, signup, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && isAuthenticated && user) {
            navigate(getDashboardPath(user.role), { replace: true });
        }
    }, [isAuthenticated, loading, navigate, user]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            const signedUpUser = await signup({ name, email, password });
            navigate(getDashboardPath(signedUpUser.role), { replace: true });
        } catch (err) {
            setError(err.message || 'Signup failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main style={styles.page}>
            <section style={styles.card}>
                <div style={styles.brandBadge}>HMS</div>
                <h1 style={styles.title}>Create Patient Account</h1>
                <p style={styles.subtitle}>Public signup is only for patients. Staff accounts are created by an admin.</p>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <label style={styles.label} htmlFor="name">Full name</label>
                    <input
                        id="name"
                        style={styles.input}
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Jane Smith"
                        autoComplete="name"
                        required
                    />

                    <label style={styles.label} htmlFor="email">Email address</label>
                    <input
                        id="email"
                        style={styles.input}
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="jane@example.com"
                        autoComplete="email"
                        required
                    />

                    <label style={styles.label} htmlFor="password">Password</label>
                    <input
                        id="password"
                        style={styles.input}
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="At least 8 characters"
                        autoComplete="new-password"
                        minLength={8}
                        required
                    />

                    <div style={styles.roleNotice}>Account type: Patient</div>

                    <button style={styles.submitButton} type="submit" disabled={submitting}>
                        {submitting ? 'Creating patient account...' : 'Create Patient Account'}
                    </button>
                </form>

                <p style={styles.footerText}>
                    Already registered? <Link style={styles.link} to="/login">Login</Link>
                </p>
            </section>
        </main>
    );
}

const styles = {
    page: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #052e16 0%, #155e75 55%, #2563eb 100%)',
        padding: '24px',
        fontFamily: 'Arial, sans-serif',
    },
    card: {
        width: '100%',
        maxWidth: '480px',
        background: '#ffffff',
        borderRadius: '24px',
        padding: '34px',
        boxShadow: '0 24px 80px rgba(2, 6, 23, 0.35)',
    },
    brandBadge: {
        width: '64px',
        height: '64px',
        borderRadius: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0891b2',
        color: '#ffffff',
        fontWeight: 800,
        marginBottom: '18px',
    },
    title: { margin: 0, color: '#0f172a', fontSize: '30px' },
    subtitle: { color: '#64748b', marginTop: '8px', marginBottom: '24px', lineHeight: 1.5 },
    error: {
        background: '#fee2e2',
        color: '#991b1b',
        borderRadius: '12px',
        padding: '12px',
        marginBottom: '16px',
        fontWeight: 600,
    },
    form: { display: 'flex', flexDirection: 'column', gap: '10px' },
    label: { color: '#334155', fontWeight: 700, fontSize: '14px' },
    input: {
        border: '1px solid #cbd5e1',
        borderRadius: '12px',
        padding: '13px 14px',
        fontSize: '15px',
        marginBottom: '8px',
        background: '#ffffff',
    },
    roleNotice: {
        background: '#ecfeff',
        color: '#0e7490',
        border: '1px solid #a5f3fc',
        borderRadius: '12px',
        padding: '12px',
        fontWeight: 800,
        marginBottom: '4px',
    },
    submitButton: {
        border: 'none',
        borderRadius: '12px',
        padding: '14px 18px',
        background: '#0891b2',
        color: '#ffffff',
        fontWeight: 800,
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '8px',
    },
    footerText: { textAlign: 'center', color: '#64748b', marginTop: '22px' },
    link: { color: '#0891b2', fontWeight: 800, textDecoration: 'none' },
};

export default Signup;
