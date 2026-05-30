import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NurseDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => { logout(); navigate('/login', { replace: true }); };
    const tasks = ['View admitted patients','Update patient vitals','Track medication schedules','Assist doctor notes','Monitor wards and beds','Escalate urgent patient changes'];
    return (
        <main style={styles.page}>
            <section style={styles.header}>
                <div>
                    <p style={styles.kicker}>Nurse Dashboard</p>
                    <h1 style={styles.title}>Welcome, {user?.name || 'Nurse'}</h1>
                    <p style={styles.subtitle}>Support inpatient care, vitals tracking, medication follow-up, and ward monitoring.</p>
                </div>
                <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
            </section>
            <section style={styles.summaryGrid}>
                <div style={styles.summaryCard}><strong>42</strong><span>Admitted Patients</span></div>
                <div style={styles.summaryCard}><strong>11</strong><span>Vitals Due</span></div>
                <div style={styles.summaryCard}><strong>7</strong><span>Medication Rounds</span></div>
            </section>
            <section style={styles.panel}>
                <h2 style={styles.panelTitle}>Nursing Work Area</h2>
                {tasks.map((task) => <div key={task} style={styles.task}>🩺 {task}</div>)}
            </section>
        </main>
    );
};

const styles = {
    page: { minHeight: '100vh', background: '#f0fdf4', padding: '32px', fontFamily: 'Arial, sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', background: '#166534', color: '#fff', padding: '30px', borderRadius: '24px', marginBottom: '24px' },
    kicker: { color: '#bbf7d0', margin: 0, textTransform: 'uppercase', fontWeight: 800 },
    title: { margin: '8px 0', fontSize: '34px' },
    subtitle: { margin: 0, color: '#dcfce7', maxWidth: '760px' },
    logoutButton: { border: 'none', background: '#ef4444', color: '#fff', borderRadius: '12px', padding: '12px 18px', fontWeight: 800, cursor: 'pointer' },
    summaryGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '16px', marginBottom: '24px' },
    summaryCard: { background: '#fff', borderRadius: '18px', padding: '24px', boxShadow: '0 12px 30px rgba(22, 101, 52, 0.12)', display: 'flex', flexDirection: 'column', gap: '8px', color: '#166534' },
    panel: { background: '#fff', borderRadius: '22px', padding: '26px', boxShadow: '0 12px 30px rgba(22, 101, 52, 0.12)' },
    panelTitle: { marginTop: 0, color: '#14532d' },
    task: { padding: '14px 0', borderBottom: '1px solid #dcfce7', color: '#334155', fontWeight: 700 },
};

export default NurseDashboard;
