import { QueryClient } from '@tanstack/react-query';

// Shared by both exposed entry points (DashboardTab and ExpenseDetail) so
// that navigating between the expense list and its detail view reuses the
// same cache instead of refetching. Deliberately not shared with the host
// or any other remote across the federation boundary — see the matching
// comment in vite.config.ts.
export const queryClient = new QueryClient();
