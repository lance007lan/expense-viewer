import { useQuery } from '@tanstack/react-query';
import { fetchExpensesByPeriod } from './expenses';
import type { ChartFilters } from '../types';

export function useExpensesByPeriodQuery(filters: ChartFilters) {
    return useQuery({
        queryKey: ['expensesByPeriod', filters],
        queryFn: () => fetchExpensesByPeriod(filters),
    });
}
