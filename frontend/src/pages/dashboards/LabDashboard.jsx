import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LabDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => { logout(); navigate('/login', { replace: true }); };
    const labTasks = ['View laboratory test requests','Enter test result values','Mark tests pending or completed','Generate lab reports','Attach results to patient records','Monitor lab stock requirements'];
    return (
        <main style={styles.page}>
            <section style={styles.header}>
                <div>
                    <p style={styles.kicker}>Laboratory Dashboard</p>
                    <h1 style={styles.title}>Welcome, {user?.name || 'Lab Technician'}</h1>
                    <p style={styles.subtitle}>Process lab requests, enter test results, complete reports, and update patient records.</p>
                </div>
                <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
            </section>
            <section style={styles.summaryGrid}>
                <div style={styles.summaryCard}><strong>31</strong><span>Pending Tests</span></div>
                <div style={styles.summaryCard}><strong>14</strong><span>Completed Today</span></div>
                <div style={styles.summaryCard}><strong>6</strong><span>Reports to Verify</span></div>
            </section>
            <section style={styles.panel}>
                <h2 style={styles.panelTitle}>Lab Work Area</h2>
                {labTasks.map((task) => <div key={task} style={styles.task}>🧪 {task}</div>)}
            </section>
        </main>
    );
};

const styles = {
    page: { minHeight: '100vh', background: '#ecfeff', padding: '32px', fontFamily: 'Arial, sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', background: '#0e7490', color: '#fff', padding: '30px', borderRadius: '24px', marginBottom: '24px' },
    kicker: { color: '#cffafe', margin: 0, textTransform: 'uppercase', fontWeight: 800 },
    title: { margin: '8px 0', fontSize: '34px' },
    subtitle: { margin: 0, color: '#cffafe', maxWidth: '760px' },
    logoutButton: { border: 'none', background: '#0f172a', color: '#fff', borderRadius: '12px', padding: '12px 18px', fontWeight: 800, cursor: 'pointer' },
    summaryGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '16px', marginBottom: '24px' },
    summaryCard: { background: '#fff', borderRadius: '18px', padding: '24px', boxShadow: '0 12px 30px rgba(14, 116, 144, 0.12)', display: 'flex', flexDirection: 'column', gap: '8px', color: '#0e7490' },
    panel: { background: '#fff', borderRadius: '22px', padding: '26px', boxShadow: '0 12px 30px rgba(14, 116, 144, 0.12)' },
    panelTitle: { marginTop: 0, color: '#155e75' },
    task: { padding: '14px 0', borderBottom: '1px solid #cffafe', color: '#334155', fontWeight: 700 },
};

export default LabDashboard;
