import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PharmacistDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => { logout(); navigate('/login', { replace: true }); };
    const pharmacyItems = [{ title: 'Pending Prescriptions', value: '23' }, { title: 'Medicines Low Stock', value: '9' }, { title: 'Issued Today', value: '46' }];
    const workflows = ['View doctor prescriptions','Issue medicines to patients','Update medicine stock','Add, update, or delete medicines','Monitor low-stock alerts','Review medicine usage history'];
    return (
        <main style={styles.page}>
            <section style={styles.header}>
                <div>
                    <p style={styles.kicker}>Pharmacist Dashboard</p>
                    <h1 style={styles.title}>Welcome, {user?.name || 'Pharmacist'}</h1>
                    <p style={styles.subtitle}>Manage prescriptions, medicine issuing, stock updates, and low-stock medicine alerts.</p>
                </div>
                <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
            </section>
            <section style={styles.cards}>
                {pharmacyItems.map((item) => (
                    <article key={item.title} style={styles.card}>
                        <strong>{item.value}</strong><span>{item.title}</span>
                    </article>
                ))}
            </section>
            <section style={styles.panel}>
                <h2 style={styles.panelTitle}>Pharmacy Workflows</h2>
                {workflows.map((w) => <div key={w} style={styles.workflow}>💊 {w}</div>)}
            </section>
        </main>
    );
};

const styles = {
    page: { minHeight: '100vh', background: '#faf5ff', padding: '32px', fontFamily: 'Arial, sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', background: '#7e22ce', color: '#fff', padding: '30px', borderRadius: '24px', marginBottom: '24px' },
    kicker: { color: '#e9d5ff', margin: 0, textTransform: 'uppercase', fontWeight: 800 },
    title: { margin: '8px 0', fontSize: '34px' },
    subtitle: { margin: 0, color: '#f3e8ff', maxWidth: '760px' },
    logoutButton: { border: 'none', background: '#ef4444', color: '#fff', borderRadius: '12px', padding: '12px 18px', fontWeight: 800, cursor: 'pointer' },
    cards: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '16px', marginBottom: '24px' },
    card: { background: '#fff', borderRadius: '18px', padding: '24px', boxShadow: '0 12px 30px rgba(126, 34, 206, 0.12)', display: 'flex', flexDirection: 'column', gap: '8px', color: '#6b21a8' },
    panel: { background: '#fff', borderRadius: '22px', padding: '26px', boxShadow: '0 12px 30px rgba(126, 34, 206, 0.12)' },
    panelTitle: { marginTop: 0, color: '#581c87' },
    workflow: { padding: '14px 0', borderBottom: '1px solid #f3e8ff', color: '#334155', fontWeight: 700 },
};

export default PharmacistDashboard;
