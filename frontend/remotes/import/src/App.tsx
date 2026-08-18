import ImportTab from './ImportTab';

/**
 * Standalone shell used only when this remote is previewed on its own
 * (npm run dev / npm run preview), outside the host shell.
 */
export default function App() {
    return (
        <div className="i:min-h-screen i:bg-gray-50 i:text-gray-900">
            <header className="i:bg-white i:border-b i:border-gray-200 i:px-6 i:py-3 i:text-sm i:text-gray-500">
                import — standalone preview
            </header>
            <ImportTab />
        </div>
    );
}
