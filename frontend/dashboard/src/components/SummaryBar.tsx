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
        <div className="d:bg-white d:border d:border-gray-200 d:rounded-xl d:px-6 d:py-4 d:flex d:flex-col d:gap-1">
            <span className="d:text-xs d:font-medium d:text-gray-500 d:uppercase d:tracking-wide">
                {label}
            </span>
            {loading ? (
                <div className="d:h-8 d:w-24 d:bg-gray-100 d:rounded d:animate-pulse d:mt-1" />
            ) : (
                <span className="d:text-2xl d:font-semibold d:text-gray-900">
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
        <div className="d:grid d:grid-cols-3 d:gap-4">
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
