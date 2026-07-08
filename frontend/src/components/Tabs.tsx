type TabId = 'dashboard' | 'charts';

interface Tab {
    id: TabId;
    label: string;
}

const TABS: Tab[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'charts', label: 'Charts' },
];

interface TabsProps {
    active: TabId;
    onChange: (tab: TabId) => void;
}

export default function Tabs({ active, onChange }: TabsProps) {
    return (
        <div className="bg-white border-b border-gray-200 px-6">
            <div className="flex gap-0">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                            active === tab.id
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
