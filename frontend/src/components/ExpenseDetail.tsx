import { useNavigate, useParams } from 'react-router-dom';
import { useDashboardStore } from '../store/useDashboardStore.ts';
import NotFoundPage from './NotFoundPage.tsx';

export default function ExpenseDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const expenses = useDashboardStore((s) => s.expenses);

    const expense = expenses.find((e) => id && e.id === +id);

    if (!expense) {
        // TODO: render a "not found" message here instead of crashing
        return <NotFoundPage></NotFoundPage>;
    }

    return (
        <main className="max-w-3xl mx-auto px-6 py-8">
            <button
                onClick={() => navigate(-1)}
                className="text-sm text-blue-600 hover:text-blue-800 mb-6"
            >
                ← Back
            </button>

            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
                <h1 className="text-lg font-semibold text-gray-900">
                    {expense.description}
                </h1>

                <dl className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <dt className="text-gray-500">Date</dt>
                        <dd className="text-gray-900">{expense.date}</dd>
                    </div>
                    <div>
                        <dt className="text-gray-500">Spender</dt>
                        <dd className="text-gray-900">{expense.spender}</dd>
                    </div>
                    <div>
                        <dt className="text-gray-500">Category</dt>
                        <dd className="text-gray-900">{expense.category}</dd>
                    </div>
                    <div>
                        <dt className="text-gray-500">Amount</dt>
                        <dd className="text-gray-900 font-medium">
                            ${expense.amount.toFixed(2)}
                        </dd>
                    </div>
                </dl>
            </div>
        </main>
    );
}
