import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = ({ kicker, title, description, cards }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    return (
        <main style={styles.page}>
            <section style={styles.header}>
                <div>
                    <p style={styles.kicker}>{kicker}</p>
                    <h1 style={styles.title}>{title || `${user?.name || 'User'}`}</h1>
                    <p style={styles.subtitle}>{description}</p>
                </div>
                <button type="button" style={styles.logoutButton} onClick={handleLogout}>Signout</button>
            </section>

            <section style={styles.grid}>
                {cards.map((card) => {
                    const isDisabled = !card.to;
                    const content = (
                        <article style={{ ...styles.card, ...(isDisabled ? styles.disabledCard : {}) }}>
                            <h2 style={styles.cardTitle}>{card.title}</h2>
                            <p style={styles.cardText}>{card.description}</p>
                            <span style={styles.cardAction}>{isDisabled ? 'Access pending backend ownership link' : 'Click here'}</span>
                        </article>
                    );

                    if (isDisabled) {
                        return <div key={card.title}>{content}</div>;
                    }

                    return (
                        <Link key={card.title} to={card.to} style={styles.cardLink}>
                            {content}
                        </Link>
                    );
                })}
            </section>
        </main>
    );
};

const styles = {
    page: {
        minHeight: '100vh',
        background: '#f8fafc',
        padding: '32px',
        color: '#0f172a',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
        alignItems: 'flex-start',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '24px',
        padding: '28px',
        marginBottom: '24px',
    },
    kicker: {
        margin: 0,
        color: '#2563eb',
        fontWeight: 800,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        fontSize: '12px',
    },
    title: {
        margin: '8px 0',
        fontSize: '34px',
        fontWeight: 900,
    },
    subtitle: {
        margin: 0,
        color: '#475569',
        maxWidth: '760px',
        lineHeight: 1.6,
    },
    logoutButton: {
        border: 'none',
        background: '#0f172a',
        color: '#ffffff',
        borderRadius: '12px',
        padding: '12px 18px',
        fontWeight: 800,
        cursor: 'pointer',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
    },
    cardLink: {
        textDecoration: 'none',
        color: 'inherit',
    },
    card: {
        minHeight: '150px',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '18px',
        padding: '20px',
        boxShadow: '0 12px 30px rgba(15, 23, 42, 0.06)',
    },
    disabledCard: {
        opacity: 0.72,
    },
    cardTitle: {
        margin: '0 0 10px',
        fontSize: '20px',
    },
    cardText: {
        margin: 0,
        color: '#475569',
        lineHeight: 1.5,
    },
    cardAction: {
        display: 'inline-block',
        marginTop: '18px',
        color: '#2563eb',
        fontWeight: 800,
    },
};

export default DashboardLayout;
