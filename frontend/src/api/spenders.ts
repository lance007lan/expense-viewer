import type { Spender } from '../types';
import { get } from './client';

/**
 * Fetch all spenders for the current account.
 */
export async function fetchSpenders(): Promise<Spender[]> {
    return get<Spender[]>('/api/spenders');
}
