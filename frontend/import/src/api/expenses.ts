import type { Expense } from '../types';
import { post } from './client';

/**
 * Create a new expense.
 */
export async function createExpense(
    input: Omit<Expense, 'id'>,
): Promise<Expense> {
    return post<Expense>('/api/expenses', input);
}
