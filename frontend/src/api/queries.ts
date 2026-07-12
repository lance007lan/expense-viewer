import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createExpense, fetchExpenses, fetchExpensesByPeriod } from './expenses';
import { fetchSpenders } from './spenders';
import type { DashboardFilters, ChartFilters, Expense } from '../types';

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

export function useCreateExpenseMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: Omit<Expense, 'id'>) => createExpense(input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
            queryClient.invalidateQueries({ queryKey: ['expensesByPeriod'] });
        },
    });
}
