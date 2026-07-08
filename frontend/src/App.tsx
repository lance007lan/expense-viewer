import { useState } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import DashboardTab from './components/DashboardTab';
import ChartsTab from './components/ChartsTab';

type TabId = 'dashboard' | 'charts';

export default function App() {
    const [activeTab, setActiveTab] = useState<TabId>('dashboard');

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <Header />
            <Tabs active={activeTab} onChange={setActiveTab} />
            {activeTab === 'dashboard' ? <DashboardTab /> : <ChartsTab />}
        </div>
    );
}
