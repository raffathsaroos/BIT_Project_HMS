import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createStaffUser } from '../../services/userService';

const roleOptions = [
    { value: 'doctor', label: 'Doctor' },
    { value: 'nurse', label: 'Nurse' },
    { value: 'pharmacist', label: 'Pharmacist' },
    { value: 'lab_technician', label: 'Lab Technician' },
    { value: 'radiologist', label: 'Radiologist' },
];

const UsersPage = () => {
    const { token } = useAuth();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'doctor' });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        try {
            await createStaffUser(formData, token);
            setSuccess('Staff user created successfully.');
            setFormData({ name: '', email: '', password: '', role: 'doctor' });
        } catch (err) {
            setError(err.message || 'Unable to create staff user');
        } finally {
            setSaving(false);
        }
    };

    return (
        <main style={styles.page}>
            <section style={styles.header}>
                <div>
                    <p style={styles.kicker}>Staff User Management</p>
                    <h1 style={styles.title}>Create Staff User</h1>
                    <p style={styles.subtitle}>Create role-based staff accounts for hospital operations.</p>
                </div>
                <Link style={styles.secondaryLink} to="/dashboard">Dashboard</Link>
            </section>

            {success && <div style={styles.notice}>{success}</div>}
            {error && <div style={styles.error}>{error}</div>}

            <form onSubmit={handleSubmit} style={styles.card}>
                <label style={styles.label}>Full Name</label>
                <input name="name" value={formData.name} onChange={handleChange} style={styles.input} required />

                <label style={styles.label}>Email Address</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} style={styles.input} required />

                <label style={styles.label}>Password</label>
                <input name="password" type="password" value={formData.password} onChange={handleChange} style={styles.input} required minLength={8} />

                <label style={styles.label}>Role</label>
                <select name="role" value={formData.role} onChange={handleChange} style={styles.input}>
                    {roleOptions.map((role) => (
                        <option key={role.value} value={role.value}>{role.label}</option>
                    ))}
                </select>

                <button type="submit" disabled={saving} style={styles.primaryButton}>{saving ? 'Creating User' : 'Create User'}</button>
            </form>
        </main>
    );
};

const styles = {
    page: { minHeight: '100vh', background: '#f8fafc', padding: '32px', color: '#0f172a' },
    header: { display: 'flex', justifyContent: 'space-between', gap: '20px', alignItems: 'flex-start', marginBottom: '24px' },
    kicker: { margin: 0, color: '#2563eb', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '12px' },
    title: { margin: '8px 0', fontSize: '32px', fontWeight: 800 },
    subtitle: { margin: 0, color: '#475569', maxWidth: '680px' },
    secondaryLink: { textDecoration: 'none', border: '1px solid #cbd5e1', color: '#0f172a', background: '#ffffff', padding: '10px 14px', borderRadius: '10px', fontWeight: 700 },
    card: { maxWidth: '640px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '18px' },
    label: { display: 'block', fontWeight: 700, marginTop: '12px', marginBottom: '6px' },
    input: { width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '10px' },
    primaryButton: { marginTop: '18px', border: 'none', background: '#2563eb', color: '#ffffff', padding: '10px 14px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' },
    notice: { maxWidth: '640px', background: '#ffffff', border: '1px solid #bbf7d0', borderRadius: '14px', padding: '18px', color: '#166534', marginBottom: '16px' },
    error: { maxWidth: '640px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '14px', padding: '18px', color: '#991b1b', marginBottom: '16px' },
};

export default UsersPage;
