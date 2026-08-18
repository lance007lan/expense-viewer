import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import Filters from './components/Filters';
import SummaryBar from './components/SummaryBar';
import ExpenseTable from './components/ExpenseTable';
import BulkActionBar from './components/BulkActionBar';
import { useExpensesQuery, useSpendersQuery } from './api/queries';
import { useSelectionStore } from './store/useSelectionStore';
import {
    dashboardFiltersFromParams,
    dashboardFiltersToParams,
} from './utils/searchParams';
import type { DashboardFilters } from './types';
import { queryClient } from './queryClient';

function DashboardTabContent() {
    const [searchParams, setSearchParams] = useSearchParams();
    const filters = dashboardFiltersFromParams(searchParams);
    const setFilters = (next: DashboardFilters) =>
        setSearchParams(dashboardFiltersToParams(next));

    const {
        data: expenses = [],
        isLoading: loading,
        error,
    } = useExpensesQuery(filters);
    const { data: spenders = [] } = useSpendersQuery();

    const clearSelection = useSelectionStore((s) => s.clear);
    // Selected rows can silently fall outside a new filter's result set, so
    // rather than track that we just drop the selection on any filter change.
    useEffect(() => {
        clearSelection();
    }, [filters.period, filters.spender, filters.category, filters.customStart, filters.customEnd, clearSelection]);

    return (
        <main className="d:max-w-5xl d:mx-auto d:px-6 d:py-8 d:flex d:flex-col d:gap-6">
            <Filters
                filters={filters}
                onChange={setFilters}
                spenders={spenders}
            />
            {error && <p className="d:text-sm d:text-red-500">{error.message}</p>}
            <SummaryBar expenses={expenses} loading={loading} />
            <ExpenseTable expenses={expenses} loading={loading} />
            <BulkActionBar />
        </main>
    );
}

// Own independent QueryClient, deliberately not shared with the host across
// the federation boundary (see vite.config.ts) — required both when this
// remote runs standalone and when it's federated into a host with no
// knowledge of @tanstack/react-query's context at all. Shared with
// ExpenseDetail.tsx so the two views share one cache.
export default function DashboardTab() {
    return (
        <QueryClientProvider client={queryClient}>
            <DashboardTabContent />
        </QueryClientProvider>
    );
}
