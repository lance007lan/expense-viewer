import { create } from 'zustand';
import { fetchExpensesByPeriod } from '../api/expenses';
import type { Expense, ChartFilters } from '../types';

const DEFAULT_FILTERS: ChartFilters = {
    period: 'this_month',
    customStart: '',
    customEnd: '',
    groupBy: 'week',
    viewBy: 'amount',
};

interface ChartStore {
    filters: ChartFilters;
    expenses: Expense[];
    loading: boolean;
    error: string | null;
    setFilters: (filters: ChartFilters) => void;
    fetchExpenses: (filters?: ChartFilters) => Promise<void>;
}

export const useChartStore = create<ChartStore>((set, get) => ({
    filters: DEFAULT_FILTERS,
    expenses: [],
    loading: false,
    error: null,

    setFilters: (filters) => {
        set({ filters });
        get().fetchExpenses(filters);
    },

    fetchExpenses: async (filters) => {
        set({ loading: true, error: null });
        try {
            const expenses = await fetchExpensesByPeriod(
                filters ?? get().filters,
            );
            set({ expenses, loading: false });
        } catch (err) {
            set({ error: (err as Error).message, loading: false });
        }
    },
}));
