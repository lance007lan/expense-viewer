import type { Expense, DashboardFilters, ChartFilters } from '../types';
import { expenses as mockData } from '../data/mock';
import { filterExpenses, filterByPeriod } from '../utils/filter';
// import { get } from './client';  // uncomment when backend is ready

type AnyFilters = DashboardFilters | ChartFilters;

const delay = (ms: number): Promise<void> =>
    new Promise((r) => setTimeout(r, ms));

/**
 * Fetch expenses with full filtering (period, spender, category).
 *
 * Mock: filters in-memory and simulates network latency.
 * Real: replace the function body with:
 *   return get<Expense[]>('/api/expenses', filters);
 */
export async function fetchExpenses(
    filters: DashboardFilters,
): Promise<Expense[]> {
    await delay(350);
    return filterExpenses(mockData, filters);
}

/**
 * Fetch expenses filtered by period only (used by charts tab).
 *
 * Mock: filters in-memory and simulates network latency.
 * Real: replace the function body with:
 *   return get<Expense[]>('/api/expenses', { period: filters.period, ... });
 */
export async function fetchExpensesByPeriod(
    filters: AnyFilters,
): Promise<Expense[]> {
    await delay(350);
    return filterByPeriod(mockData, filters);
}

/**
 * Create a new expense.
 *
 * Mock: appends to the in-memory list and simulates network latency.
 * Real: replace the function body with:
 *   return post<Expense>('/api/expenses', input);
 */
export async function createExpense(
    input: Omit<Expense, 'id'>,
): Promise<Expense> {
    await delay(300);
    const id = Math.max(0, ...mockData.map((e) => e.id)) + 1;
    const expense: Expense = { id, ...input };
    mockData.push(expense);
    return expense;
}
