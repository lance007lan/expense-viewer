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
