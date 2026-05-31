import DashboardLayout from './DashboardLayout';

const cards = [
    { title: 'Feedback', description: 'Submit feedback, complaints, and service requests.', to: '/feedback' },
    { title: 'Notifications', description: 'View hospital notifications assigned to your account.', to: '/notifications' },
    { title: 'Appointments', description: 'Patient-owned appointment access requires a patient profile link in the backend before activation.' },
    { title: 'Prescriptions', description: 'Patient-owned prescription access requires a patient profile link in the backend before activation.' },
    { title: 'Reports', description: 'Patient-owned lab and radiology report access requires a patient profile link in the backend before activation.' },
    { title: 'Bills', description: 'Patient-owned bill access requires a patient profile link in the backend before activation.' },
];

const PatientDashboard = () => (
    <DashboardLayout
        kicker="Patient Dashboard"
        description="Access available patient portal features. Some patient-owned clinical views need a user-to-patient profile link before they can be safely enabled."
        cards={cards}
    />
);

export default PatientDashboard;
