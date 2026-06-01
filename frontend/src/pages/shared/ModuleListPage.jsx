import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const getNestedValue = (item, path) => {
    if (!path) return '';
    return path.split('.').reduce((value, key) => value?.[key], item) ?? '';
};

const EMPTY_FILTERS = {};

const ModuleListPage = ({ title, kicker, description, loadData, itemsKey, columns, emptyMessage, filters = EMPTY_FILTERS, createAction = null }) => {
    const { token, user } = useAuth();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadItems = useCallback(async () => {
        setLoading(true);
        setError('');

        try {
            const response = await loadData({ token, filters });
            setItems(response[itemsKey] || []);
        } catch (err) {
            setError(err.message || 'Unable to load records');
        } finally {
            setLoading(false);
        }
    }, [filters, itemsKey, loadData, token]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            loadItems();
        }, 0);

        return () => clearTimeout(timeoutId);
    }, [loadItems]);

    const canCreate = createAction?.allowedRoles?.includes(user?.role);

    const renderCell = (item, column) => {
        if (column.render) {
            return column.render(item);
        }

        return getNestedValue(item, column.key) || 'Not recorded';
    };

    return (
        <main style={styles.page}>
            <section style={styles.header}>
                <div>
                    <p style={styles.kicker}>{kicker}</p>
                    <h1 style={styles.title}>{title}</h1>
                    <p style={styles.subtitle}>{description}</p>
                </div>
                <div style={styles.actions}>
                    <button type="button" onClick={loadItems} style={styles.secondaryButton}>Refresh</button>
                    <Link style={styles.secondaryLink} to="/dashboard">Dashboard</Link>
                    {canCreate && <Link style={styles.primaryLink} to={createAction.to}>{createAction.label}</Link>}
                </div>
            </section>

            {loading && <div style={styles.notice}>Loading records.</div>}
            {!loading && error && <div style={styles.error}>{error}</div>}
            {!loading && !error && items.length === 0 && <div style={styles.notice}>{emptyMessage}</div>}

            {!loading && !error && items.length > 0 && (
                <div style={styles.tableWrap}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                {columns.map((column) => (
                                    <th key={column.label} style={styles.th}>{column.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id || item._id}>
                                    {columns.map((column) => (
                                        <td key={`${item.id || item._id}-${column.label}`} style={styles.td}>
                                            {renderCell(item, column)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
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
        marginBottom: '24px',
    },
    kicker: {
        margin: 0,
        color: '#2563eb',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        fontSize: '12px',
    },
    title: {
        margin: '8px 0',
        fontSize: '32px',
        fontWeight: 800,
    },
    subtitle: {
        margin: 0,
        color: '#475569',
        maxWidth: '680px',
    },
    actions: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
    },
    secondaryLink: {
        textDecoration: 'none',
        border: '1px solid #cbd5e1',
        color: '#0f172a',
        background: '#ffffff',
        padding: '10px 14px',
        borderRadius: '10px',
        fontWeight: 700,
    },
    primaryLink: {
        textDecoration: 'none',
        border: '1px solid #2563eb',
        color: '#ffffff',
        background: '#2563eb',
        padding: '10px 14px',
        borderRadius: '10px',
        fontWeight: 700,
    },
    secondaryButton: {
        border: '1px solid #cbd5e1',
        color: '#0f172a',
        background: '#ffffff',
        padding: '10px 14px',
        borderRadius: '10px',
        fontWeight: 700,
        cursor: 'pointer',
    },
    notice: {
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '14px',
        padding: '18px',
        color: '#475569',
    },
    error: {
        background: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '14px',
        padding: '18px',
        color: '#991b1b',
    },
    tableWrap: {
        overflowX: 'auto',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        textAlign: 'left',
        padding: '14px',
        background: '#f1f5f9',
        fontSize: '13px',
        color: '#334155',
    },
    td: {
        padding: '14px',
        borderTop: '1px solid #e2e8f0',
        color: '#334155',
        verticalAlign: 'top',
    },
};

export default ModuleListPage;
