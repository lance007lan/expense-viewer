import { useSearchParams } from 'react-router-dom';
import Filters from './Filters';
import SummaryBar from './SummaryBar';
import ExpenseTable from './ExpenseTable';
import { useExpensesQuery, useSpendersQuery } from '../api/queries';
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
        </main>
    );
}
