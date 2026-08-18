import DashboardTab from './DashboardTab';

/**
 * Standalone shell used only when this remote is previewed on its own
 * (npm run dev / npm run preview), outside the host shell.
 */
export default function App() {
    return (
        <div className="d:min-h-screen d:bg-gray-50 d:text-gray-900">
            <header className="d:bg-white d:border-b d:border-gray-200 d:px-6 d:py-3 d:text-sm d:text-gray-500">
                dashboard — standalone preview
            </header>
            <DashboardTab />
        </div>
    );
}
