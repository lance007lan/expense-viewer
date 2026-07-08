import { create } from 'zustand';
import { fetchExpenses } from '../api/expenses';
import { fetchSpenders } from '../api/spenders';
import type { Expense, Spender, DashboardFilters } from '../types';

const DEFAULT_FILTERS: DashboardFilters = {
    period: 'this_month',
    customStart: '',
    customEnd: '',
    spender: '',
    category: '',
};

interface DashboardStore {
    filters: DashboardFilters;
    expenses: Expense[];
    spenders: Spender[];
    loading: boolean;
    error: string | null;
    setFilters: (filters: DashboardFilters) => void;
    fetchExpenses: (filters?: DashboardFilters) => Promise<void>;
    fetchSpenders: () => Promise<void>;
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
    filters: DEFAULT_FILTERS,
    expenses: [],
    spenders: [],
    loading: false,
    error: null,

    setFilters: (filters) => {
        set({ filters });
        get().fetchExpenses(filters);
    },

    fetchExpenses: async (filters) => {
        set({ loading: true, error: null });
        try {
            const expenses = await fetchExpenses(filters ?? get().filters);
            set({ expenses, loading: false });
        } catch (err) {
            set({ error: (err as Error).message, loading: false });
        }
    },

    fetchSpenders: async () => {
        try {
            const spenders = await fetchSpenders();
            set({ spenders });
        } catch (err) {
            set({ error: (err as Error).message });
        }
    },
}));
