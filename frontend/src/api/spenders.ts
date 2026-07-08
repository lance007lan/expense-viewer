import type { Spender } from '../types';
import { spenders as mockData } from '../data/mock';
// import { get } from './client';  // uncomment when backend is ready

const delay = (ms: number): Promise<void> =>
    new Promise((r) => setTimeout(r, ms));

/**
 * Fetch all spenders for the current account.
 *
 * Mock: returns static list with simulated latency.
 * Real: replace the function body with:
 *   return get<Spender[]>('/api/spenders');
 */
export async function fetchSpenders(): Promise<Spender[]> {
    await delay(200);
    return mockData;
}
