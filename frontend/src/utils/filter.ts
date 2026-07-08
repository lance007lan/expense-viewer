import { getDateRange } from './date';
import type { Expense, DashboardFilters, ChartFilters } from '../types';

type AnyFilters = DashboardFilters | ChartFilters;

export function filterExpenses(
    expenses: Expense[],
    filters: DashboardFilters,
): Expense[] {
    const range =
        filters.period !== 'custom'
            ? getDateRange(filters.period)
            : { start: filters.customStart, end: filters.customEnd };

    return expenses.filter((e) => {
        if (range.start && e.date < range.start) return false;
        if (range.end && e.date > range.end) return false;
        if (filters.spender && e.spender !== filters.spender) return false;
        if (filters.category && e.category !== filters.category) return false;
        return true;
    });
}

export function filterByPeriod(
    expenses: Expense[],
    filters: AnyFilters,
): Expense[] {
    const range =
        filters.period !== 'custom'
            ? getDateRange(filters.period)
            : { start: filters.customStart, end: filters.customEnd };

    return expenses.filter((e) => {
        if (range.start && e.date < range.start) return false;
        if (range.end && e.date > range.end) return false;
        return true;
    });
}
