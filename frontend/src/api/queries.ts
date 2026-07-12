import { useQuery } from '@tanstack/react-query';
import { fetchExpenses, fetchExpensesByPeriod } from './expenses';
import { fetchSpenders } from './spenders';
import type { DashboardFilters, ChartFilters } from '../types';

export function useExpensesQuery(filters: DashboardFilters) {
    return useQuery({
        queryKey: ['expenses', filters],
        queryFn: () => fetchExpenses(filters),
    });
}

export function useExpensesByPeriodQuery(filters: ChartFilters) {
    return useQuery({
        queryKey: ['expensesByPeriod', filters],
        queryFn: () => fetchExpensesByPeriod(filters),
    });
}

export function useSpendersQuery() {
    return useQuery({
        queryKey: ['spenders'],
        queryFn: fetchSpenders,
    });
}
