import { useEffect, useRef, useState } from 'react';
import { fetchExpensesByPeriod } from './expenses';
import type { ChartFilters, Expense } from '../types';

interface QueryState {
    data: Expense[] | undefined;
    isLoading: boolean;
    error: Error | null;
}

// Deliberately not @tanstack/react-query: sharing it (or even bundling it
// standalone) across the Module Federation boundary reproducibly threw
// "Cannot read properties of null (reading 'useRef')" inside its internal
// useSyncExternalStoreWithSelector, regardless of shared-singleton config —
// looks like a genuine incompatibility between that hook and this plugin's
// import rewriting. Plain useEffect/useState sidesteps it entirely and only
// relies on React's own core hooks, which do work across the boundary.
export function useExpensesByPeriodQuery(filters: ChartFilters): QueryState {
    const [state, setState] = useState<QueryState>({
        data: undefined,
        isLoading: true,
        error: null,
    });
    const requestId = useRef(0);

    useEffect(() => {
        const thisRequest = ++requestId.current;
        setState((s) => ({ ...s, isLoading: true, error: null }));

        fetchExpensesByPeriod(filters)
            .then((data) => {
                if (thisRequest === requestId.current) {
                    setState({ data, isLoading: false, error: null });
                }
            })
            .catch((error: Error) => {
                if (thisRequest === requestId.current) {
                    setState({ data: undefined, isLoading: false, error });
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(filters)]);

    return state;
}
