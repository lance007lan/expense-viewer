import type { Expense, DashboardFilters, ChartFilters } from '../types';
import { getDateRange } from '../utils/date';
import { get, post } from './client';

type AnyFilters = DashboardFilters | ChartFilters;

function resolveRange(filters: AnyFilters): { start: string; end: string } {
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
 * Fetch expenses filtered by period only (used by charts tab).
 */
export async function fetchExpensesByPeriod(
    filters: AnyFilters,
): Promise<Expense[]> {
    const { start, end } = resolveRange(filters);
    return get<Expense[]>('/api/expenses', { start, end });
}

/**
 * Create a new expense.
 */
export async function createExpense(
    input: Omit<Expense, 'id'>,
): Promise<Expense> {
    return post<Expense>('/api/expenses', input);
}
