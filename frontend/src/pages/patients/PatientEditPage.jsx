import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getPatientById, updatePatient } from '../../services/patientService';

const toDateInputValue = (dateValue) => {
    if (!dateValue) return '';
    return new Date(dateValue).toISOString().slice(0, 10);
};

const PatientEditPage = () => {
    const { id } = useParams();
    const { token, user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const isNurse = user?.role === 'nurse';

    useEffect(() => {
        const loadPatient = async () => {
            try {
                const response = await getPatientById(id, token);
                const patient = response.patient;
                setFormData({
                    fullName: patient.fullName || '',
                    dateOfBirth: toDateInputValue(patient.dateOfBirth),
                    gender: patient.gender || 'male',
                    phone: patient.phone || '',
                    address: patient.address || '',
                    emergencyContactName: patient.emergencyContactName || '',
                    emergencyContactPhone: patient.emergencyContactPhone || '',
                    bloodGroup: patient.bloodGroup || 'unknown',
                    allergies: patient.allergies || '',
                    medicalNotes: patient.medicalNotes || '',
                    status: patient.status || 'active',
                });
            } catch (err) {
                setError(err.message || 'Unable to load patient');
            } finally {
                setLoading(false);
            }
        };

        loadPatient();
    }, [id, token]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            const payload = isNurse
                ? {
                    phone: formData.phone,
                    address: formData.address,
                    emergencyContactName: formData.emergencyContactName,
                    emergencyContactPhone: formData.emergencyContactPhone,
                    allergies: formData.allergies,
                    medicalNotes: formData.medicalNotes,
                    status: formData.status,
                }
                : formData;

            const response = await updatePatient(id, payload, token);
            navigate(`/patients/${response.patient.id}`, { replace: true });
        } catch (err) {
            setError(err.message || 'Unable to update patient');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <main style={styles.page}><div style={styles.card}>Loading patient...</div></main>;
    if (!formData) return <main style={styles.page}><div style={styles.error}>{error || 'Patient not found'}</div></main>;

    return (
        <main style={styles.page}>
            <section style={styles.header}>
                <div>
                    <p style={styles.kicker}>Patient Management</p>
                    <h1 style={styles.title}>Edit Patient</h1>
                    <p style={styles.subtitle}>{isNurse ? 'Nurses can update contact, status, allergies, and notes.' : 'Update patient demographic and clinical summary fields.'}</p>
                </div>
                <Link style={styles.secondaryLink} to={`/patients/${id}`}>Back to Profile</Link>
            </section>

            {error && <div style={styles.error}>{error}</div>}

            <form onSubmit={handleSubmit} style={styles.formCard}>
                <div style={styles.grid}>
                    <label style={styles.label}>Full Name<input style={styles.input} name="fullName" value={formData.fullName} onChange={handleChange} disabled={isNurse} required /></label>
                    <label style={styles.label}>Date of Birth<input style={styles.input} name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} disabled={isNurse} required /></label>
                    <label style={styles.label}>Gender<select style={styles.input} name="gender" value={formData.gender} onChange={handleChange} disabled={isNurse} required><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></label>
                    <label style={styles.label}>Phone<input style={styles.input} name="phone" value={formData.phone} onChange={handleChange} required /></label>
                    <label style={styles.label}>Emergency Contact Name<input style={styles.input} name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} required /></label>
                    <label style={styles.label}>Emergency Contact Phone<input style={styles.input} name="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={handleChange} required /></label>
                    <label style={styles.label}>Blood Group<select style={styles.input} name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} disabled={isNurse}><option value="unknown">Unknown</option><option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option><option value="AB+">AB+</option><option value="AB-">AB-</option><option value="O+">O+</option><option value="O-">O-</option></select></label>
                    <label style={styles.label}>Status<select style={styles.input} name="status" value={formData.status} onChange={handleChange}><option value="active">Active</option><option value="admitted">Admitted</option><option value="discharged">Discharged</option><option value="inactive">Inactive</option></select></label>
                </div>

                <label style={styles.label}>Address<textarea style={styles.textarea} name="address" value={formData.address} onChange={handleChange} required /></label>
                <label style={styles.label}>Allergies<textarea style={styles.textarea} name="allergies" value={formData.allergies} onChange={handleChange} /></label>
                <label style={styles.label}>Medical Notes<textarea style={styles.textarea} name="medicalNotes" value={formData.medicalNotes} onChange={handleChange} /></label>

                <button style={styles.submitButton} type="submit" disabled={submitting}>{submitting ? 'Saving...' : 'Save Changes'}</button>
            </form>
        </main>
    );
};

const styles = {
    page: { minHeight: '100vh', background: '#f8fafc', padding: '32px', fontFamily: 'Arial, sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '18px', background: '#0f172a', color: '#fff', padding: '28px', borderRadius: '24px', marginBottom: '20px' },
    kicker: { margin: 0, color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase' },
    title: { margin: '8px 0', fontSize: '34px' },
    subtitle: { margin: 0, color: '#cbd5e1' },
    secondaryLink: { background: '#e2e8f0', color: '#0f172a', textDecoration: 'none', padding: '12px 16px', borderRadius: '12px', fontWeight: 800 },
    card: { background: '#fff', borderRadius: '18px', padding: '24px', boxShadow: '0 12px 30px rgba(15,23,42,0.08)' },
    formCard: { background: '#fff', borderRadius: '22px', padding: '26px', boxShadow: '0 12px 30px rgba(15,23,42,0.08)', display: 'flex', flexDirection: 'column', gap: '16px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' },
    label: { display: 'flex', flexDirection: 'column', gap: '8px', color: '#334155', fontWeight: 800 },
    input: { padding: '12px 14px', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '15px', background: '#fff' },
    textarea: { minHeight: '90px', padding: '12px 14px', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '15px', resize: 'vertical' },
    submitButton: { border: 'none', background: '#2563eb', color: '#fff', padding: '14px 18px', borderRadius: '12px', fontWeight: 800, cursor: 'pointer' },
    error: { background: '#fee2e2', color: '#991b1b', borderRadius: '12px', padding: '12px', marginBottom: '16px', fontWeight: 700 },
};

export default PatientEditPage;
