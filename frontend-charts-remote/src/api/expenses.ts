import type { Expense, ChartFilters } from '../types';
import { getDateRange } from '../utils/date';
import { get } from './client';

/**
 * Fetch expenses filtered by period only (used by the charts view).
 */
export async function fetchExpensesByPeriod(
    filters: ChartFilters,
): Promise<Expense[]> {
    const { start, end } =
        filters.period !== 'custom'
            ? getDateRange(filters.period)
            : { start: filters.customStart, end: filters.customEnd };

    return get<Expense[]>('/api/expenses', { start, end });
}
