export interface Expense {
    id: number;
    date: string;
    description: string;
    spender: string;
    category: string;
    amount: number;
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

export interface ChartFilters {
    period: string;
    customStart: string;
    customEnd: string;
    groupBy: 'day' | 'week' | 'month';
    viewBy: 'amount' | 'count';
}

export interface ChartDataPoint {
    name: string;
    value: number;
}

export interface TimeDataPoint {
    key: string;
    label: string;
    value: number;
}
