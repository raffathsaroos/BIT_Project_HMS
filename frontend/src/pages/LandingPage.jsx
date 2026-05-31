import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <main style={styles.page}>
            <section style={styles.card}>
                <p style={styles.kicker}>Hospital Management System</p>
                <h1 style={styles.title}>Hospital Portal</h1>
                <p style={styles.description}>
                    A secure role-based hospital portal for clinical workflows, patient records, appointments,
                    pharmacy, laboratory, radiology, billing, inventory, reports, and staff operations.
                </p>
                <Link style={styles.loginLink} to="/login">Login</Link>
            </section>
        </main>
    );
};

const styles = {
    page: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 45%, #ecfeff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        color: '#0f172a',
    },
    card: {
        width: '100%',
        maxWidth: '760px',
        background: '#ffffff',
        border: '1px solid #dbeafe',
        borderRadius: '28px',
        padding: '42px',
        boxShadow: '0 24px 70px rgba(37, 99, 235, 0.14)',
        textAlign: 'center',
    },
    kicker: {
        margin: 0,
        color: '#2563eb',
        fontWeight: 800,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontSize: '13px',
    },
    title: {
        margin: '14px 0',
        fontSize: '48px',
        fontWeight: 900,
    },
    description: {
        margin: '0 auto 28px',
        color: '#475569',
        fontSize: '18px',
        lineHeight: 1.7,
        maxWidth: '620px',
    },
    loginLink: {
        display: 'inline-block',
        textDecoration: 'none',
        background: '#2563eb',
        color: '#ffffff',
        padding: '13px 26px',
        borderRadius: '12px',
        fontWeight: 800,
    },
};

export default LandingPage;
