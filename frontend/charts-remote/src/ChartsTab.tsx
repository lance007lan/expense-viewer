import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import ChartFilters from './components/charts/ChartFilters';
import SpendingByCategory from './components/charts/SpendingByCategory';
import SpendingOverTime from './components/charts/SpendingOverTime';
import { aggregateByCategory, aggregateByTime } from './utils/aggregate';
import { useExpensesByPeriodQuery } from './api/queries';
import {
    chartFiltersFromParams,
    chartFiltersToParams,
} from './utils/searchParams';
import type { ChartFilters as ChartFiltersType } from './types';

function ChartsTabContent() {
    const [searchParams, setSearchParams] = useSearchParams();
    const filters = chartFiltersFromParams(searchParams);
    const setFilters = (next: ChartFiltersType) =>
        setSearchParams(chartFiltersToParams(next));

    const {
        data: expenses = [],
        isLoading: loading,
        error,
    } = useExpensesByPeriodQuery(filters);

    const categoryData = useMemo(
        () => aggregateByCategory(expenses, filters.viewBy),
        [expenses, filters.viewBy],
    );
    const timeData = useMemo(
        () => aggregateByTime(expenses, filters.groupBy, filters.viewBy),
        [expenses, filters.groupBy, filters.viewBy],
    );

    return (
        <main className="c:max-w-5xl c:mx-auto c:px-6 c:py-8 c:flex c:flex-col c:gap-6">
            <ChartFilters filters={filters} onChange={setFilters} />
            {error && <p className="c:text-sm c:text-red-500">{error.message}</p>}
            <div
                className={`c:grid c:grid-cols-2 c:gap-6 c:transition-opacity ${loading ? 'c:opacity-50' : ''}`}
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

// Own independent QueryClient, deliberately not shared with the host across
// the federation boundary (see vite.config.ts) — required both when this
// remote runs standalone and when it's federated into a host with no
// knowledge of @tanstack/react-query's context at all.
const queryClient = new QueryClient();

export default function ChartsTab() {
    return (
        <QueryClientProvider client={queryClient}>
            <ChartsTabContent />
        </QueryClientProvider>
    );
}
