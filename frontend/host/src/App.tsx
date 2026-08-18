import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Tabs from './components/Tabs';
import NotFoundPage from './components/NotFoundPage.tsx';
import ErrorBoundary from './components/ErrorBoundary';

// Each tab is loaded at runtime from its own separately-built/deployed app
// via Module Federation, not bundled into host at build time — see each
// remote's vite.config.ts and the matching remotes entry in this app's own
// vite.config.ts.
const DashboardTab = lazy(() => import('dashboard/DashboardTab'));
const ExpenseDetail = lazy(() => import('dashboard/ExpenseDetail'));
const ChartsTab = lazy(() => import('charts/ChartsTab'));
const ImportTab = lazy(() => import('importApp/ImportTab'));

function RemoteFallback({ label }: { label: string }) {
    return (
        <div className="px-6 py-8 text-center text-gray-400 text-sm">
            {label}
        </div>
    );
}

export default function App() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <Header />
            <Tabs />
            <ErrorBoundary>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/dashboard" replace />}
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <Suspense fallback={<RemoteFallback label="Loading…" />}>
                                <DashboardTab />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/charts"
                        element={
                            <Suspense
                                fallback={
                                    <RemoteFallback label="Loading charts…" />
                                }
                            >
                                <ChartsTab />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/dashboard/expense/:id"
                        element={
                            <Suspense fallback={<RemoteFallback label="Loading…" />}>
                                <ExpenseDetail />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/import"
                        element={
                            <Suspense fallback={<RemoteFallback label="Loading…" />}>
                                <ImportTab />
                            </Suspense>
                        }
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </ErrorBoundary>
        </div>
    );
}
