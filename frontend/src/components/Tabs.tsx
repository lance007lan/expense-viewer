import { NavLink } from 'react-router-dom';

interface Tab {
    path: string;
    label: string;
}

const TABS: Tab[] = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/charts', label: 'Charts' },
    { path: '/import', label: 'Import' },
];

export default function Tabs() {
    return (
        <div className="bg-white border-b border-gray-200 px-6">
            <div className="flex gap-0">
                {TABS.map((tab) => (
                    <NavLink
                        key={tab.path}
                        to={tab.path}
                        className={({ isActive }) =>
                            `px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                                isActive
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`
                        }
                    >
                        {tab.label}
                    </NavLink>
                ))}
            </div>
        </div>
    );
}
