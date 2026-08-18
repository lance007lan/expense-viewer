import { useMutation, useQuery } from '@tanstack/react-query';
import { createExpense } from './expenses';
import { fetchSpenders } from './spenders';
import type { Expense } from '../types';

export function useSpendersQuery() {
    return useQuery({
        queryKey: ['spenders'],
        queryFn: fetchSpenders,
    });
}

export function useCreateExpenseMutation() {
    return useMutation({
        mutationFn: (input: Omit<Expense, 'id'>) => createExpense(input),
        // dashboard owns an independent QueryClient/cache and isn't
        // reachable from here — it picks up new expenses on its own next
        // fetch instead (same tradeoff already accepted between host and
        // charts-remote).
    });
}
