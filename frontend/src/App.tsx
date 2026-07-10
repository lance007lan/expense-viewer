import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Tabs from './components/Tabs';
import DashboardTab from './components/DashboardTab';
import ExpenseDetail from './components/ExpenseDetail.tsx';
import NotFoundPage from './components/NotFoundPage.tsx';

const ChartsTab = lazy(() => import('./components/ChartsTab'));

export default function App() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <Header />
            <Tabs />
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<DashboardTab />} />
                <Route
                    path="/charts"
                    element={
                        <Suspense fallback={<div className="px-6 py-8 text-center text-gray-400 text-sm">Loading charts…</div>}>
                            <ChartsTab />
                        </Suspense>
                    }
                />
                <Route
                    path="/dashboard/expense/:id"
                    element={<ExpenseDetail />}
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}
