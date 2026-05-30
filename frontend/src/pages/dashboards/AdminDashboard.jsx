import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    const dashboardItems = [
        { title: 'Total Patients', value: 'Not updated' },
        { title: 'Doctors', value: 'Not updated' },
        { title: 'Appointments Today', value: 'Not updated' },
        { title: 'Monthly Revenue', value: 'Not updated' },
    ];

    const adminModules = [
        'User and role management',
        'Department management',
        'Patient records access',
        'Appointments and queue overview',
        'Inventory and pharmacy reports',
        'Billing and revenue analytics',
    ];

    return (
        <main style={styles.container}>
            <section style={styles.topSection}>
                <div>
                    <p style={styles.smallHeading}>Admin Dashboard</p>
                    <h1 style={styles.heading}>
                        Welcome, {user?.name || 'Administrator'}
                    </h1>
                    <p style={styles.description}>
                        Hospital Management Web Portal
                    </p>
                </div>

                <button style={styles.logoutBtn} onClick={handleLogout}>
                    Logout
                </button>
            </section>

            <section style={styles.cardWrapper}>
                {dashboardItems.map((item) => (
                    <div key={item.title} style={styles.card}>
                        <h3 style={styles.cardValue}>{item.value}</h3>
                        <p style={styles.cardTitle}>{item.title}</p>
                    </div>
                ))}
            </section>

            <section style={styles.moduleSection}>
                <h2 style={styles.moduleHeading}>Allowed Admin Modules</h2>

                <div style={styles.moduleWrapper}>
                    {adminModules.map((moduleName) => (
                        <div key={moduleName} style={styles.moduleBox}>
                            {moduleName}
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f4f6f8',
        padding: '30px',
        fontFamily: 'Arial, sans-serif',
    },
    topSection: {
        backgroundColor: '#1e293b',
        color: 'white',
        padding: '25px',
        borderRadius: '12px',
        marginBottom: '25px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    smallHeading: {
        margin: 0,
        fontWeight: 'bold',
        color: '#93c5fd',
    },
    heading: {
        margin: '8px 0',
        fontSize: '30px',
    },
    description: {
        margin: 0,
        color: '#dbeafe',
    },
    logoutBtn: {
        backgroundColor: '#dc2626',
        color: 'white',
        border: 'none',
        padding: '10px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    cardWrapper: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '15px',
        marginBottom: '25px',
    },
    card: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    cardValue: {
        margin: 0,
        fontSize: '24px',
        color: '#111827',
    },
    cardTitle: {
        marginTop: '8px',
        color: '#555',
        fontWeight: 'bold',
    },
    moduleSection: {
        backgroundColor: 'white',
        padding: '22px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    moduleHeading: {
        marginTop: 0,
        color: '#111827',
    },
    moduleWrapper: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '12px',
    },
    moduleBox: {
        backgroundColor: '#e5e7eb',
        padding: '14px',
        borderRadius: '8px',
        fontWeight: 'bold',
        color: '#1f2937',
    },
};

export default AdminDashboard;