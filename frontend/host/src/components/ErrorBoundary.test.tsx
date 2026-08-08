import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

function ProblemChild(): never {
    throw new Error('Test error');
}

describe('ErrorBoundary', () => {
    it('renders a fallback UI when a child throws', () => {
        vi.spyOn(console, 'error').mockImplementation(() => {});

        render(
            <ErrorBoundary>
                <ProblemChild />
            </ErrorBoundary>,
        );

        expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
        expect(screen.getByText('Test error')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Try again' }),
        ).toBeInTheDocument();
    });

    it('renders children normally when there is no error', () => {
        render(
            <ErrorBoundary>
                <div>All good</div>
            </ErrorBoundary>,
        );

        expect(screen.getByText('All good')).toBeInTheDocument();
    });
});
