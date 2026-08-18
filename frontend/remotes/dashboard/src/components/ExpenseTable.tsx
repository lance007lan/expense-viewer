import { memo, useState } from 'react';
import type { Expense } from '../types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelectionStore } from '../store/useSelectionStore';

const PAGE_SIZE = 8;

const CATEGORY_COLORS: Record<string, string> = {
    Groceries: 'd:bg-green-100 d:text-green-700',
    Dining: 'd:bg-orange-100 d:text-orange-700',
    Bills: 'd:bg-gray-100 d:text-gray-600',
    Transport: 'd:bg-blue-100 d:text-blue-700',
    Shopping: 'd:bg-purple-100 d:text-purple-700',
    Health: 'd:bg-red-100 d:text-red-700',
    Entertainment: 'd:bg-yellow-100 d:text-yellow-700',
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

interface ExpenseRowProps {
    expense: Expense;
}

// Split out and memoized so each row only re-renders on its own selection
// change, not whenever any other row is toggled or the table re-renders for
// an unrelated reason (e.g. ExpenseTable's own selectedIds subscription).
const ExpenseRow = memo(function ExpenseRow({ expense: e }: ExpenseRowProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const checked = useSelectionStore((s) => s.selectedIds.has(e.id));
    const toggle = useSelectionStore((s) => s.toggle);

    return (
        <tr
            onClick={() =>
                navigate(`/dashboard/expense/${e.id}${location.search}`)
            }
            className="d:hover:bg-gray-50 d:transition-colors d:cursor-pointer"
        >
            <td
                className="d:px-6 d:py-3"
                onClick={(evt) => evt.stopPropagation()}
            >
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(e.id)}
                    aria-label={`Select expense ${e.description}`}
                />
            </td>
            <td className="d:px-6 d:py-3 d:text-gray-500 d:whitespace-nowrap">
                {formatDate(e.date)}
            </td>
            <td className="d:px-6 d:py-3 d:text-gray-900">{e.description}</td>
            <td className="d:px-6 d:py-3 d:text-gray-700">{e.spender}</td>
            <td className="d:px-6 d:py-3">
                <span
                    className={`d:inline-block d:px-2 d:py-0.5 d:rounded-full d:text-xs d:font-medium ${CATEGORY_COLORS[e.category] ?? 'd:bg-gray-100 d:text-gray-600'}`}
                >
                    {e.category}
                </span>
            </td>
            <td className="d:px-6 d:py-3 d:text-right d:font-medium d:text-gray-900">
                ${e.amount.toFixed(2)}
            </td>
        </tr>
    );
});

export default function ExpenseTable({ expenses, loading }: ExpenseTableProps) {
    const [visible, setVisible] = useState(PAGE_SIZE);

    const shown = expenses.slice(0, visible);
    const hasMore = visible < expenses.length;
    const selectedIds = useSelectionStore((s) => s.selectedIds);
    const selectAll = useSelectionStore((s) => s.selectAll);
    const clear = useSelectionStore((s) => s.clear);

    const shownIds = shown.map((e) => e.id);
    const allShownSelected =
        shownIds.length > 0 && shownIds.every((id) => selectedIds.has(id));

    return (
        <div className="d:bg-white d:border d:border-gray-200 d:rounded-xl d:overflow-hidden">
            <div className="d:flex d:items-center d:justify-between d:px-6 d:py-4 d:border-b d:border-gray-100">
                <h2 className="d:font-semibold d:text-gray-900">Expenses</h2>
            </div>

            {loading ? (
                <div className="d:divide-y d:divide-gray-50">Loading</div>
            ) : expenses.length === 0 ? (
                <div className="d:px-6 d:py-12 d:text-center d:text-gray-400 d:text-sm">
                    No expenses match the selected filters.
                </div>
            ) : (
                <>
                    <table className="d:w-full d:text-sm">
                        <thead>
                            <tr className="d:text-xs d:font-medium d:text-gray-500 d:uppercase d:tracking-wide d:border-b d:border-gray-100">
                                <th className="d:px-6 d:py-3 d:text-left">
                                    <input
                                        type="checkbox"
                                        checked={allShownSelected}
                                        onChange={() =>
                                            allShownSelected
                                                ? clear()
                                                : selectAll(shownIds)
                                        }
                                        aria-label="Select all expenses"
                                    />
                                </th>
                                <th className="d:px-6 d:py-3 d:text-left">
                                    Date
                                </th>
                                <th className="d:px-6 d:py-3 d:text-left">
                                    Description
                                </th>
                                <th className="d:px-6 d:py-3 d:text-left">
                                    Spender
                                </th>
                                <th className="d:px-6 d:py-3 d:text-left">
                                    Category
                                </th>
                                <th className="d:px-6 d:py-3 d:text-right">
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody className="d:divide-y d:divide-gray-50">
                            {shown.map((e) => (
                                <ExpenseRow key={e.id} expense={e} />
                            ))}
                        </tbody>
                    </table>

                    {hasMore && (
                        <div className="d:px-6 d:py-4 d:border-t d:border-gray-100 d:text-center">
                            <button
                                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                                className="d:text-sm d:text-blue-600 d:hover:text-blue-800 d:font-medium"
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
