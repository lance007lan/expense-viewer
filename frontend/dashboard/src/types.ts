export interface Expense {
    id: number;
    date: string;
    description: string;
    spender: string;
    category: string;
    amount: number;
    receiptName?: string;
    receiptUrl?: string;
}

export interface Spender {
    id: number;
    name: string;
}

export interface DashboardFilters {
    period: string;
    customStart: string;
    customEnd: string;
    spender: string;
    category: string;
}
