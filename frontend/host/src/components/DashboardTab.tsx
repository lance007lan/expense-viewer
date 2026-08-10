import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Filters from './Filters';
import SummaryBar from './SummaryBar';
import ExpenseTable from './ExpenseTable';
import BulkActionBar from './BulkActionBar';
import { useExpensesQuery, useSpendersQuery } from '../api/queries';
import { useSelectionStore } from '../store/useSelectionStore';
import {
    dashboardFiltersFromParams,
    dashboardFiltersToParams,
} from '../utils/searchParams';
import type { DashboardFilters } from '../types';

export default function DashboardTab() {
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
        <main className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-6">
            <Filters
                filters={filters}
                onChange={setFilters}
                spenders={spenders}
            />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
            <SummaryBar expenses={expenses} loading={loading} />
            <ExpenseTable expenses={expenses} loading={loading} />
            <BulkActionBar />
        </main>
    );
}
