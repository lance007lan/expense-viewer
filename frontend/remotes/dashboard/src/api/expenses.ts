import type { Expense, DashboardFilters } from '../types';
import { getDateRange } from '../utils/date';
import { get, del } from './client';

function resolveRange(filters: DashboardFilters): {
    start: string;
    end: string;
} {
    return filters.period !== 'custom'
        ? getDateRange(filters.period)
        : { start: filters.customStart, end: filters.customEnd };
}

/**
 * Fetch expenses with full filtering (period, spender, category).
 */
export async function fetchExpenses(
    filters: DashboardFilters,
): Promise<Expense[]> {
    const { start, end } = resolveRange(filters);
    return get<Expense[]>('/api/expenses', {
        start,
        end,
        spender: filters.spender,
        category: filters.category,
    });
}

/**
 * Delete a single expense by id.
 */
export async function deleteExpense(id: number): Promise<void> {
    return del(`/api/expenses/${id}`);
}
