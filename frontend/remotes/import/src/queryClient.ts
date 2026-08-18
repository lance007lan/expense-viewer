import { QueryClient } from '@tanstack/react-query';

// Own independent QueryClient, deliberately not shared with the host or any
// other remote across the federation boundary — see the matching comment
// in vite.config.ts.
export const queryClient = new QueryClient();
