import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ChartFilters from './charts/ChartFilters';
import SpendingByCategory from './charts/SpendingByCategory';
import SpendingOverTime from './charts/SpendingOverTime';
import { aggregateByCategory, aggregateByTime } from '../utils/aggregate';
import { useExpensesByPeriodQuery } from '../api/queries';
import {
    chartFiltersFromParams,
    chartFiltersToParams,
} from '../utils/searchParams';
import type { ChartFilters as ChartFiltersType } from '../types';

export default function ChartsTab() {
    const [searchParams, setSearchParams] = useSearchParams();
    const filters = chartFiltersFromParams(searchParams);
    const setFilters = (next: ChartFiltersType) =>
        setSearchParams(chartFiltersToParams(next));

    const { data: expenses = [], isLoading: loading, error } =
        useExpensesByPeriodQuery(filters);

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
            {error && <p className="text-sm text-red-500">{error.message}</p>}
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
