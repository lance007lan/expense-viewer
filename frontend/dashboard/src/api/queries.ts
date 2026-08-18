import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteExpense, fetchExpenses } from './expenses';
import { fetchSpenders } from './spenders';
import type { DashboardFilters } from '../types';

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

export function useDeleteExpensesMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (ids: number[]) =>
            Promise.all(ids.map((id) => deleteExpense(id))),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
    });
}
