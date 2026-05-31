import DashboardLayout from './DashboardLayout';

const cards = [
    { title: 'Patients', description: 'View patients and update permitted clinical notes.', to: '/patients' },
    { title: 'Queue', description: 'Manage patient queue entries and workflow status.', to: '/queue' },
    { title: 'Appointments', description: 'View appointment flow for patient coordination.', to: '/appointments' },
    { title: 'Medical Records', description: 'Review patient records for care support.', to: '/medical-records' },
    { title: 'Laboratory', description: 'View laboratory request status for patient support.', to: '/laboratory' },
    { title: 'Radiology', description: 'View radiology request status for patient support.', to: '/radiology' },
    { title: 'Notifications', description: 'View internal care coordination notifications.', to: '/notifications' },
];

const NurseDashboard = () => (
    <DashboardLayout
        kicker="Nurse Dashboard"
        description="Support patient care with queue management, patient records, appointment visibility, and basic workflow updates."
        cards={cards}
    />
);

export default NurseDashboard;
