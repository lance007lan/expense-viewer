import { describe, it, expect } from 'vitest';
import { aggregateByCategory } from './aggregate';
import type { Expense } from '../types';

const expenses: Expense[] = [
    { id: 1, date: '2026-07-01', description: 'Milk', spender: 'Alice', category: 'Groceries', amount: 10 },
    { id: 2, date: '2026-07-02', description: 'Bread', spender: 'Bob', category: 'Groceries', amount: 5 },
    { id: 3, date: '2026-07-03', description: 'Movie', spender: 'Alice', category: 'Entertainment', amount: 20 },
];

describe('aggregateByCategory', () => {
    it('sums amounts per category and sorts descending by value', () => {
        const result = aggregateByCategory(expenses, 'amount');

        expect(result).toEqual([
            { name: 'Entertainment', value: 20 },
            { name: 'Groceries', value: 15 },
        ]);
    });

    it('counts expenses per category when viewBy is "count"', () => {
        const result = aggregateByCategory(expenses, 'count');

        expect(result).toEqual([
            { name: 'Groceries', value: 2 },
            { name: 'Entertainment', value: 1 },
        ]);
    });

    it('returns an empty array when given no expenses', () => {
        expect(aggregateByCategory([], 'amount')).toEqual([]);
    });
});
