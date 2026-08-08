import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ExpenseTable from './ExpenseTable';
import type { Expense } from '../types';

const expenses: Expense[] = [
    { id: 1, date: '2026-07-01', description: 'Milk', spender: 'Alice', category: 'Groceries', amount: 10 },
    { id: 2, date: '2026-07-02', description: 'Movie', spender: 'Bob', category: 'Entertainment', amount: 20 },
];

function renderTable(props: Partial<React.ComponentProps<typeof ExpenseTable>> = {}) {
    return render(
        <MemoryRouter>
            <ExpenseTable expenses={expenses} loading={false} {...props} />
        </MemoryRouter>,
    );
}

describe('ExpenseTable', () => {
    it('renders a row for each expense with its data', () => {
        renderTable();

        expect(screen.getByText('Milk')).toBeInTheDocument();
        expect(screen.getByText('Movie')).toBeInTheDocument();
        expect(screen.getByText('$10.00')).toBeInTheDocument();
    });

    it('shows a loading message while loading', () => {
        renderTable({loading: true});

        expect(screen.getByText('Loading')).toBeInTheDocument();
    });
});
