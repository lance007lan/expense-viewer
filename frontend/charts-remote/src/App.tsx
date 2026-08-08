import ChartsTab from './ChartsTab';

/**
 * Standalone shell used only when this remote is previewed on its own
 * (npm run dev / npm run preview), outside the host shell.
 */
export default function App() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <header className="bg-white border-b border-gray-200 px-6 py-3 text-sm text-gray-500">
                charts-remote — standalone preview
            </header>
            <ChartsTab />
        </div>
    );
}
