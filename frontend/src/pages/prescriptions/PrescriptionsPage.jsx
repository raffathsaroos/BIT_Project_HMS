import ModuleListPage from '../shared/ModuleListPage';
import { formatDateTime, getPersonName } from '../shared/modulePageUtils';
import { getPrescriptions } from '../../services/prescriptionService';

const PrescriptionsPage = () => (
    <ModuleListPage
        title="Prescriptions"
        kicker="Prescription Management"
        description="Track prescribed medicines, prescribing doctors, patient details, and issuing status."
        loadData={getPrescriptions}
        itemsKey="prescriptions"
        emptyMessage="No prescriptions are currently available."
        columns={[
            { label: 'Patient', render: (item) => getPersonName(item.patient) },
            { label: 'Doctor', render: (item) => getPersonName(item.doctor) },
            { label: 'Medicines', render: (item) => `${item.items?.length || 0} item(s)` },
            { label: 'Status', key: 'status' },
            { label: 'Created', render: (item) => formatDateTime(item.createdAt) },
        ]}
    />
);

export default PrescriptionsPage;
