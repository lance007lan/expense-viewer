import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    error: Error | null;
}

export default class ErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    state: ErrorBoundaryState = { error: null };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { error };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('Uncaught error:', error, info.componentStack);
    }

    handleReset = () => {
        this.setState({ error: null });
    };

    render() {
        if (this.state.error) {
            return (
                <div className="max-w-lg mx-auto px-6 py-16 text-center flex flex-col items-center gap-4">
                    <h1 className="text-lg font-semibold text-gray-900">
                        Something went wrong.
                    </h1>
                    <p className="text-sm text-gray-500">
                        {this.state.error.message}
                    </p>
                    <button
                        onClick={this.handleReset}
                        className="text-sm text-blue-600 hover:text-blue-800 underline underline-offset-2"
                    >
                        Try again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
