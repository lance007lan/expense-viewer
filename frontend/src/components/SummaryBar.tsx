import type { Expense } from '../types';

const CATEGORY_ICONS: Record<string, string> = {
    Groceries: '🛒',
    Dining: '🍽️',
    Bills: '📄',
    Transport: '🚗',
    Shopping: '🛍️',
    Health: '🏥',
    Entertainment: '🎬',
};

interface StatCardProps {
    label: string;
    value: string | number;
    loading: boolean;
}

function StatCard({ label, value, loading }: StatCardProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 flex flex-col gap-1">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {label}
            </span>
            {loading ? (
                <div className="h-8 w-24 bg-gray-100 rounded animate-pulse mt-1" />
            ) : (
                <span className="text-2xl font-semibold text-gray-900">
                    {value}
                </span>
            )}
        </div>
    );
}

interface SummaryBarProps {
    expenses: Expense[];
    loading: boolean;
}

export default function SummaryBar({ expenses, loading }: SummaryBarProps) {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);

    const topCategory = Object.entries(
        expenses.reduce<Record<string, number>>((acc, e) => {
            acc[e.category] = (acc[e.category] ?? 0) + e.amount;
            return acc;
        }, {}),
    ).sort((a, b) => b[1] - a[1])[0];

    return (
        <div className="grid grid-cols-3 gap-4">
            <StatCard
                loading={loading}
                label="Total Spent"
                value={`$${total.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`}
            />
            <StatCard
                loading={loading}
                label="Transactions"
                value={expenses.length}
            />
            <StatCard
                loading={loading}
                label="Top Category"
                value={
                    topCategory
                        ? `${CATEGORY_ICONS[topCategory[0]] ?? ''} ${topCategory[0]}`
                        : '—'
                }
            />
        </div>
    );
}
