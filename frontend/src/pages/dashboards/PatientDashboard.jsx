import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PatientDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => { logout(); navigate('/login', { replace: true }); };
    const patientActions = ['View profile and hospital number','Book or view appointments','View prescriptions','View lab and scan reports','Review bills and payment history','Submit feedback or complaints'];
    return (
        <main style={styles.page}>
            <section style={styles.header}>
                <div>
                    <p style={styles.kicker}>Patient Portal</p>
                    <h1 style={styles.title}>Hello, {user?.name || 'Patient'}</h1>
                    <p style={styles.subtitle}>Access your appointments, medical documents, billing information, and notifications.</p>
                </div>
                <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
            </section>
            <section style={styles.panel}>
                <h2 style={styles.panelTitle}>My Patient Services</h2>
                <div style={styles.actionGrid}>
                    {patientActions.map((action) => <div key={action} style={styles.actionCard}>{action}</div>)}
                </div>
            </section>
        </main>
    );
};

const styles = {
    page: { minHeight: '100vh', background: '#fff7ed', padding: '32px', fontFamily: 'Arial, sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', background: '#c2410c', color: '#fff', padding: '30px', borderRadius: '24px', marginBottom: '24px' },
    kicker: { color: '#fed7aa', margin: 0, textTransform: 'uppercase', fontWeight: 800 },
    title: { margin: '8px 0', fontSize: '34px' },
    subtitle: { margin: 0, color: '#ffedd5', maxWidth: '760px' },
    logoutButton: { border: 'none', background: '#0f172a', color: '#fff', borderRadius: '12px', padding: '12px 18px', fontWeight: 800, cursor: 'pointer' },
    panel: { background: '#fff', borderRadius: '22px', padding: '26px', boxShadow: '0 12px 30px rgba(194, 65, 12, 0.12)' },
    panelTitle: { marginTop: 0, color: '#9a3412' },
    actionGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' },
    actionCard: { background: '#ffedd5', color: '#9a3412', padding: '18px', borderRadius: '14px', fontWeight: 800 },
};

export default PatientDashboard;
