import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createExpense, fetchExpenses } from './expenses';
import { fetchSpenders } from './spenders';
import type { DashboardFilters, Expense } from '../types';

export function useExpensesQuery(filters: DashboardFilters) {
    return useQuery({
        queryKey: ['expenses', filters],
        queryFn: () => fetchExpenses(filters),
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
            // charts-remote owns an independent QueryClient (see its
            // ChartsTab.tsx for why) and isn't reachable from here — it
            // picks up new expenses on its own next fetch instead.
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
    });
}
