import DashboardLayout from './DashboardLayout';

const cards = [
    { title: 'Patients', description: 'To manage patients records or add new patient.', to: '/patients' },
    { title: 'Appointments', description: 'To review and manage hospital appointments.', to: '/appointments' },
    { title: 'Queue', description: 'To monitor patient queue flow and service status.', to: '/queue' },
    { title: 'Medical Records', description: 'To review clinical documentation and consultation history.', to: '/medical-records' },
    { title: 'Prescriptions', description: 'To view prescription records and issuing status.', to: '/prescriptions' },
    { title: 'Pharmacy', description: 'To Manage medicine stock and pharmacy inventory.', to: '/pharmacy' },
    { title: 'Laboratory', description: 'To track lab requests, results, and completion status.', to: '/laboratory' },
    { title: 'Radiology', description: 'To track scan requests, schedules, images, and reports.', to: '/radiology' },
    { title: 'Billing', description: 'To manage bills, payments, and outstanding balances.', to: '/billing' },
    { title: 'Inventory', description: 'To manage hospital supplies and equipment stock.', to: '/inventory' },
    { title: 'Feedback', description: 'To review patient feedback and complaints.', to: '/feedback' },
    { title: 'Notifications', description: 'To view and manage system notifications.', to: '/notifications' },
    { title: 'Reports', description: 'To review operational counts and revenue reports.', to: '/reports' },
    { title: 'Staff Users', description: 'To create staff accounts for hospital roles.', to: '/users' },
];

const AdminDashboard = () => (
    <DashboardLayout
        kicker="Admin Dashboard"
        description="This is Admin Dashboard and admin can add new staffs and patients."
        cards={cards}
    />
);

export default AdminDashboard;
