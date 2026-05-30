import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => { logout(); navigate('/login', { replace: true }); };
    const stats = [
        { label: 'Total Patients', value: '1,284', icon: '🏥' }, { label: 'Doctors', value: '64', icon: '👨‍⚕️' },
        { label: 'Appointments Today', value: '87', icon: '📅' }, { label: 'Monthly Revenue', value: '$128K', icon: '💳' },
    ];
    const modules = ['User and role management','Department management','Patient records access','Appointments and queue overview','Inventory and pharmacy reports','Billing and revenue analytics'];
    return (
        <main style={styles.page}>
            <section style={styles.header}>
                <div>
                    <p style={styles.kicker}>Admin Portal</p>
                    <h1 style={styles.title}>Welcome, {user?.name || 'Administrator'}</h1>
                    <p style={styles.subtitle}>Full HMS control center for users, departments, reports, inventory, and billing.</p>
                </div>
                <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
            </section>
            <section style={styles.grid}>
                {stats.map((stat) => (
                    <article key={stat.label} style={styles.statCard}>
                        <span style={styles.icon}>{stat.icon}</span>
                        <strong style={styles.statValue}>{stat.value}</strong>
                        <span style={styles.statLabel}>{stat.label}</span>
                    </article>
                ))}
            </section>
            <section style={styles.panel}>
                <h2 style={styles.panelTitle}>Allowed Admin Modules</h2>
                <div style={styles.moduleGrid}>
                    {modules.map((module) => <div key={module} style={styles.moduleCard}>{module}</div>)}
                </div>
            </section>
        </main>
    );
};

const styles = {
    page: { minHeight: '100vh', background: '#f8fafc', padding: '32px', fontFamily: 'Arial, sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', gap: '20px', alignItems: 'center', background: '#0f172a', color: '#fff', padding: '28px', borderRadius: '24px', marginBottom: '24px' },
    kicker: { color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', margin: 0 },
    title: { margin: '8px 0', fontSize: '34px' },
    subtitle: { color: '#cbd5e1', margin: 0, maxWidth: '720px' },
    logoutButton: { border: 'none', background: '#ef4444', color: '#fff', borderRadius: '12px', padding: '12px 18px', fontWeight: 800, cursor: 'pointer' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' },
    statCard: { background: '#fff', borderRadius: '18px', padding: '22px', boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)', display: 'flex', flexDirection: 'column', gap: '8px' },
    icon: { fontSize: '30px' },
    statValue: { fontSize: '28px', color: '#0f172a' },
    statLabel: { color: '#64748b', fontWeight: 700 },
    panel: { background: '#fff', borderRadius: '22px', padding: '26px', boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)' },
    panelTitle: { marginTop: 0, color: '#0f172a' },
    moduleGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' },
    moduleCard: { background: '#e0f2fe', color: '#075985', padding: '16px', borderRadius: '14px', fontWeight: 800 },
};

export default AdminDashboard;
