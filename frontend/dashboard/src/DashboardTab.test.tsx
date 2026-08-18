import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DashboardTab from './DashboardTab';
import * as expensesApi from './api/expenses';
import * as spendersApi from './api/spenders';
import { queryClient } from './queryClient';
import type { Expense } from './types';

vi.mock('./api/expenses');
vi.mock('./api/spenders');

const expenses: Expense[] = [
    {
        id: 1,
        date: '2026-07-01',
        description: 'Milk',
        spender: 'Alice',
        category: 'Groceries',
        amount: 10,
    },
];

beforeEach(() => {
    queryClient.clear();
    vi.mocked(expensesApi.fetchExpenses).mockResolvedValue(expenses);
    vi.mocked(spendersApi.fetchSpenders).mockResolvedValue([
        { id: 1, name: 'Alice' },
    ]);
});

function renderDashboard() {
    return render(
        <MemoryRouter>
            <DashboardTab />
        </MemoryRouter>,
    );
}

describe('DashboardTab', () => {
    it('loads and displays expenses on mount', async () => {
        renderDashboard();

        expect(await screen.findByText('Milk')).toBeInTheDocument();
    });
});
