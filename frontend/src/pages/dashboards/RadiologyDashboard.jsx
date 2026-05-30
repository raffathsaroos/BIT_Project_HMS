import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RadiologyDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => { logout(); navigate('/login', { replace: true }); };
    const radiologyTasks = ['View radiology scan requests','Schedule scans by availability','Upload scan images','Add radiology reports','Mark scans pending or completed','Attach scan reports to patient records'];
    return (
        <main style={styles.page}>
            <section style={styles.header}>
                <div>
                    <p style={styles.kicker}>Radiology Dashboard</p>
                    <h1 style={styles.title}>Welcome, {user?.name || 'Radiologist'}</h1>
                    <p style={styles.subtitle}>Manage scan requests, schedules, uploaded images, reports, and completion status.</p>
                </div>
                <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
            </section>
            <section style={styles.summaryGrid}>
                <div style={styles.summaryCard}><strong>17</strong><span>Scan Requests</span></div>
                <div style={styles.summaryCard}><strong>8</strong><span>Scheduled Today</span></div>
                <div style={styles.summaryCard}><strong>4</strong><span>Reports Pending</span></div>
            </section>
            <section style={styles.panel}>
                <h2 style={styles.panelTitle}>Radiology Work Area</h2>
                {radiologyTasks.map((task) => <div key={task} style={styles.task}>🩻 {task}</div>)}
            </section>
        </main>
    );
};

const styles = {
    page: { minHeight: '100vh', background: '#f1f5f9', padding: '32px', fontFamily: 'Arial, sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', background: '#334155', color: '#fff', padding: '30px', borderRadius: '24px', marginBottom: '24px' },
    kicker: { color: '#cbd5e1', margin: 0, textTransform: 'uppercase', fontWeight: 800 },
    title: { margin: '8px 0', fontSize: '34px' },
    subtitle: { margin: 0, color: '#e2e8f0', maxWidth: '760px' },
    logoutButton: { border: 'none', background: '#ef4444', color: '#fff', borderRadius: '12px', padding: '12px 18px', fontWeight: 800, cursor: 'pointer' },
    summaryGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '16px', marginBottom: '24px' },
    summaryCard: { background: '#fff', borderRadius: '18px', padding: '24px', boxShadow: '0 12px 30px rgba(51, 65, 85, 0.12)', display: 'flex', flexDirection: 'column', gap: '8px', color: '#334155' },
    panel: { background: '#fff', borderRadius: '22px', padding: '26px', boxShadow: '0 12px 30px rgba(51, 65, 85, 0.12)' },
    panelTitle: { marginTop: 0, color: '#1e293b' },
    task: { padding: '14px 0', borderBottom: '1px solid #e2e8f0', color: '#334155', fontWeight: 700 },
};

export default RadiologyDashboard;
