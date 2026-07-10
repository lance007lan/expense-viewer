import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Tabs from './components/Tabs';
import DashboardTab from './components/DashboardTab';
import ChartsTab from './components/ChartsTab';

export default function App() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <Header />
            <Tabs />
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardTab />} />
                <Route path="/charts" element={<ChartsTab />} />
            </Routes>
        </div>
    );
}
