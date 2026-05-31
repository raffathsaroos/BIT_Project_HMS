import ModuleListPage from '../shared/ModuleListPage';
import { formatDateTime, getPersonName } from '../shared/modulePageUtils';
import { getRadiologyRequests } from '../../services/radiologyRequestService';

const RadiologyPage = () => (
    <ModuleListPage
        title="Radiology Requests"
        kicker="Radiology Management"
        description="Review scan requests, scheduled imaging, assigned radiologists, reports, and completion status."
        loadData={getRadiologyRequests}
        itemsKey="radiologyRequests"
        emptyMessage="No radiology requests are currently available."
        columns={[
            { label: 'Patient', render: (item) => getPersonName(item.patient) },
            { label: 'Doctor', render: (item) => getPersonName(item.doctor) },
            { label: 'Scan Type', key: 'scanType' },
            { label: 'Body Part', key: 'bodyPart' },
            { label: 'Status', key: 'status' },
            { label: 'Scheduled', render: (item) => formatDateTime(item.scheduledAt) },
        ]}
    />
);

export default RadiologyPage;
