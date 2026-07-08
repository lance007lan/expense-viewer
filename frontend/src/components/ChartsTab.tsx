import { useEffect, useMemo } from 'react';
import ChartFilters from './charts/ChartFilters';
import SpendingByCategory from './charts/SpendingByCategory';
import SpendingOverTime from './charts/SpendingOverTime';
import { aggregateByCategory, aggregateByTime } from '../utils/aggregate';
import { useChartStore } from '../store/useChartStore';

export default function ChartsTab() {
    const { filters, setFilters, expenses, loading, error, fetchExpenses } =
        useChartStore();

    useEffect(() => {
        fetchExpenses();
    }, []);

    const categoryData = useMemo(
        () => aggregateByCategory(expenses, filters.viewBy),
        [expenses, filters.viewBy],
    );
    const timeData = useMemo(
        () => aggregateByTime(expenses, filters.groupBy, filters.viewBy),
        [expenses, filters.groupBy, filters.viewBy],
    );

    return (
        <main className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-6">
            <ChartFilters filters={filters} onChange={setFilters} />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div
                className={`grid grid-cols-2 gap-6 transition-opacity ${loading ? 'opacity-50' : ''}`}
            >
                <SpendingByCategory
                    data={categoryData}
                    viewBy={filters.viewBy}
                />
                <SpendingOverTime data={timeData} viewBy={filters.viewBy} />
            </div>
        </main>
    );
}
