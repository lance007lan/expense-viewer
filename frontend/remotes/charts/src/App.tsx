import ChartsTab from './ChartsTab';

/**
 * Standalone shell used only when this remote is previewed on its own
 * (npm run dev / npm run preview), outside the host shell.
 */
export default function App() {
    return (
        <div className="c:min-h-screen c:bg-gray-50 c:text-gray-900">
            <header className="c:bg-white c:border-b c:border-gray-200 c:px-6 c:py-3 c:text-sm c:text-gray-500">
                charts-remote — standalone preview
            </header>
            <ChartsTab />
        </div>
    );
}
