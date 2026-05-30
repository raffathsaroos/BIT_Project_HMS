import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';
import DashboardRedirect from './pages/DashboardRedirect';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Unauthorized from './pages/Unauthorized';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import DoctorDashboard from './pages/dashboards/DoctorDashboard';
import LabDashboard from './pages/dashboards/LabDashboard';
import NurseDashboard from './pages/dashboards/NurseDashboard';
import PatientDashboard from './pages/dashboards/PatientDashboard';
import PharmacistDashboard from './pages/dashboards/PharmacistDashboard';
import RadiologyDashboard from './pages/dashboards/RadiologyDashboard';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Login" element={<Navigate to="/login" replace />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/Signup" element={<Navigate to="/signup" replace />} />
                <Route path="/dashboard" element={<ProtectedRoute><DashboardRedirect /></ProtectedRoute>} />
                <Route path="/dashboard/admin" element={<ProtectedRoute><RoleRoute allowedRoles={['admin']}><AdminDashboard /></RoleRoute></ProtectedRoute>} />
                <Route path="/dashboard/doctor" element={<ProtectedRoute><RoleRoute allowedRoles={['doctor']}><DoctorDashboard /></RoleRoute></ProtectedRoute>} />
                <Route path="/dashboard/nurse" element={<ProtectedRoute><RoleRoute allowedRoles={['nurse']}><NurseDashboard /></RoleRoute></ProtectedRoute>} />
                <Route path="/dashboard/patient" element={<ProtectedRoute><RoleRoute allowedRoles={['patient']}><PatientDashboard /></RoleRoute></ProtectedRoute>} />
                <Route path="/dashboard/pharmacist" element={<ProtectedRoute><RoleRoute allowedRoles={['pharmacist']}><PharmacistDashboard /></RoleRoute></ProtectedRoute>} />
                <Route path="/dashboard/lab" element={<ProtectedRoute><RoleRoute allowedRoles={['lab_technician']}><LabDashboard /></RoleRoute></ProtectedRoute>} />
                <Route path="/dashboard/radiology" element={<ProtectedRoute><RoleRoute allowedRoles={['radiologist']}><RadiologyDashboard /></RoleRoute></ProtectedRoute>} />
                <Route path="/unauthorized" element={<ProtectedRoute><Unauthorized /></ProtectedRoute>} />
                <Route path="/home" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
