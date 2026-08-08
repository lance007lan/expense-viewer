import type { Expense, DashboardFilters } from '../types';
import { getDateRange } from '../utils/date';
import { get, post } from './client';

function resolveRange(filters: DashboardFilters): { start: string; end: string } {
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
 * Create a new expense.
 */
export async function createExpense(
    input: Omit<Expense, 'id'>,
): Promise<Expense> {
    return post<Expense>('/api/expenses', input);
}
