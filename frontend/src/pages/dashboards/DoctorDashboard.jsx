import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DoctorDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => { logout(); navigate('/login', { replace: true }); };
    const todayWork = [{ label: 'Assigned Patients', value: '18' }, { label: 'Appointments', value: '12' }, { label: 'Pending Lab Reviews', value: '5' }, { label: 'Scan Results', value: '3' }];
    const workflows = ['View assigned patients','Add diagnosis and clinical notes','Create prescriptions','Request laboratory tests','Request radiology scans','Review lab and scan results'];
    return (
        <main style={styles.page}>
            <section style={styles.hero}>
                <div>
                    <p style={styles.kicker}>Doctor Dashboard</p>
                    <h1 style={styles.title}>Good day, Dr. {user?.name || 'Doctor'}</h1>
                    <p style={styles.subtitle}>Manage clinical consultations, prescriptions, medical records, tests, and scan requests.</p>
                </div>
                <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
            </section>
            <section style={styles.cards}>
                {todayWork.map((item) => (
                    <article key={item.label} style={styles.card}>
                        <strong style={styles.cardValue}>{item.value}</strong>
                        <span style={styles.cardLabel}>{item.label}</span>
                    </article>
                ))}
            </section>
            <section style={styles.panel}>
                <h2 style={styles.panelTitle}>Clinical Workflow</h2>
                {workflows.map((w) => <div key={w} style={styles.row}>✅ {w}</div>)}
            </section>
        </main>
    );
};

const styles = {
    page: { minHeight: '100vh', background: '#eff6ff', padding: '32px', fontFamily: 'Arial, sans-serif' },
    hero: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', background: 'linear-gradient(135deg, #1d4ed8, #0891b2)', color: '#fff', padding: '30px', borderRadius: '24px', marginBottom: '24px' },
    kicker: { margin: 0, fontWeight: 800, color: '#bfdbfe', textTransform: 'uppercase' },
    title: { margin: '8px 0', fontSize: '34px' },
    subtitle: { margin: 0, color: '#dbeafe', maxWidth: '760px' },
    logoutButton: { border: 'none', background: '#0f172a', color: '#fff', borderRadius: '12px', padding: '12px 18px', fontWeight: 800, cursor: 'pointer' },
    cards: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '16px', marginBottom: '24px' },
    card: { background: '#fff', borderRadius: '18px', padding: '22px', boxShadow: '0 12px 30px rgba(30, 64, 175, 0.12)', display: 'flex', flexDirection: 'column', gap: '8px' },
    cardValue: { fontSize: '32px', color: '#1d4ed8' },
    cardLabel: { color: '#475569', fontWeight: 800 },
    panel: { background: '#fff', borderRadius: '22px', padding: '26px', boxShadow: '0 12px 30px rgba(30, 64, 175, 0.12)' },
    panelTitle: { marginTop: 0, color: '#0f172a' },
    row: { padding: '14px 0', borderBottom: '1px solid #e2e8f0', color: '#334155', fontWeight: 700 },
};

export default DoctorDashboard;
