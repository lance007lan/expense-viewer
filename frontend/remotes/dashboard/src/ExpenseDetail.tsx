import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { useExpensesQuery } from './api/queries';
import { dashboardFiltersFromParams } from './utils/searchParams';
import NotFoundPage from './components/NotFoundPage';
import { queryClient } from './queryClient';

function ExpenseDetailContent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const filters = dashboardFiltersFromParams(searchParams);
    const { data: expenses = [] } = useExpensesQuery(filters);

    const expense = expenses.find((e) => id && e.id === +id);

    if (!expense) {
        // TODO: render a "not found" message here instead of crashing
        return <NotFoundPage></NotFoundPage>;
    }

    return (
        <main className="d:max-w-3xl d:mx-auto d:px-6 d:py-8">
            <button
                onClick={() => navigate(-1)}
                className="d:text-sm d:text-blue-600 d:hover:text-blue-800 d:mb-6"
            >
                ← Back
            </button>

            <div className="d:bg-white d:border d:border-gray-200 d:rounded-xl d:p-6 d:flex d:flex-col d:gap-4">
                <h1 className="d:text-lg d:font-semibold d:text-gray-900">
                    {expense.description}
                </h1>

                <dl className="d:grid d:grid-cols-2 d:gap-4 d:text-sm">
                    <div>
                        <dt className="d:text-gray-500">Date</dt>
                        <dd className="d:text-gray-900">{expense.date}</dd>
                    </div>
                    <div>
                        <dt className="d:text-gray-500">Spender</dt>
                        <dd className="d:text-gray-900">{expense.spender}</dd>
                    </div>
                    <div>
                        <dt className="d:text-gray-500">Category</dt>
                        <dd className="d:text-gray-900">{expense.category}</dd>
                    </div>
                    <div>
                        <dt className="d:text-gray-500">Amount</dt>
                        <dd className="d:text-gray-900 d:font-medium">
                            ${expense.amount.toFixed(2)}
                        </dd>
                    </div>
                    {expense.receiptUrl && (
                        <div>
                            <dt className="d:text-gray-500">Receipt</dt>
                            <dd className="d:text-gray-900">
                                <a
                                    href={expense.receiptUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="d:text-blue-600 d:hover:text-blue-800 d:underline d:underline-offset-2"
                                >
                                    {expense.receiptName ?? 'View receipt'}
                                </a>
                            </dd>
                        </div>
                    )}
                </dl>
            </div>
        </main>
    );
}

// Shares the same QueryClient instance as DashboardTab.tsx (see
// queryClient.ts) so navigating list -> detail reuses the cached expenses
// instead of refetching.
export default function ExpenseDetail() {
    return (
        <QueryClientProvider client={queryClient}>
            <ExpenseDetailContent />
        </QueryClientProvider>
    );
}
