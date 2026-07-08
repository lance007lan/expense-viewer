import { useState } from 'react';
import type { Expense } from '../types';

const PAGE_SIZE = 8;

const CATEGORY_COLORS: Record<string, string> = {
    Groceries: 'bg-green-100 text-green-700',
    Dining: 'bg-orange-100 text-orange-700',
    Bills: 'bg-gray-100 text-gray-600',
    Transport: 'bg-blue-100 text-blue-700',
    Shopping: 'bg-purple-100 text-purple-700',
    Health: 'bg-red-100 text-red-700',
    Entertainment: 'bg-yellow-100 text-yellow-700',
};

function formatDate(iso: string): string {
    return new Date(iso + 'T00:00:00').toLocaleDateString('en-AU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

interface ExpenseTableProps {
    expenses: Expense[];
    loading: boolean;
}

export default function ExpenseTable({ expenses, loading }: ExpenseTableProps) {
    const [visible, setVisible] = useState(PAGE_SIZE);

    const shown = expenses.slice(0, visible);
    const hasMore = visible < expenses.length;

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Expenses</h2>
            </div>

            {loading ? (
                <div className="divide-y divide-gray-50">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="px-6 py-3 flex gap-6">
                            <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
                            <div className="h-4 w-40 bg-gray-100 rounded animate-pulse" />
                            <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
                            <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
                            <div className="h-4 w-16 bg-gray-100 rounded animate-pulse ml-auto" />
                        </div>
                    ))}
                </div>
            ) : expenses.length === 0 ? (
                <div className="px-6 py-12 text-center text-gray-400 text-sm">
                    No expenses match the selected filters.
                </div>
            ) : (
                <>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-xs font-medium text-gray-500 uppercase tracking-wide border-b border-gray-100">
                                <th className="px-6 py-3 text-left">Date</th>
                                <th className="px-6 py-3 text-left">
                                    Description
                                </th>
                                <th className="px-6 py-3 text-left">Spender</th>
                                <th className="px-6 py-3 text-left">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {shown.map((e) => (
                                <tr
                                    key={e.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                                        {formatDate(e.date)}
                                    </td>
                                    <td className="px-6 py-3 text-gray-900">
                                        {e.description}
                                    </td>
                                    <td className="px-6 py-3 text-gray-700">
                                        {e.spender}
                                    </td>
                                    <td className="px-6 py-3">
                                        <span
                                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[e.category] ?? 'bg-gray-100 text-gray-600'}`}
                                        >
                                            {e.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-right font-medium text-gray-900">
                                        ${e.amount.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {hasMore && (
                        <div className="px-6 py-4 border-t border-gray-100 text-center">
                            <button
                                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Load more ({expenses.length - visible}{' '}
                                remaining)
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
