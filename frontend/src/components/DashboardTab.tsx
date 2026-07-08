import { useEffect } from 'react';
import Filters from './Filters';
import SummaryBar from './SummaryBar';
import ExpenseTable from './ExpenseTable';
import { useDashboardStore } from '../store/useDashboardStore';

export default function DashboardTab() {
    const {
        filters,
        setFilters,
        expenses,
        spenders,
        loading,
        error,
        fetchExpenses,
        fetchSpenders,
    } = useDashboardStore();

    useEffect(() => {
        fetchExpenses();
        fetchSpenders();
    }, []);

    return (
        <main className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-6">
            <Filters
                filters={filters}
                onChange={setFilters}
                spenders={spenders}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <SummaryBar expenses={expenses} loading={loading} />
            <ExpenseTable expenses={expenses} loading={loading} />
        </main>
    );
}
