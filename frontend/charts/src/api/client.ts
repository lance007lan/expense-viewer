const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

export async function get<T>(
    path: string,
    params?: Record<string, string>,
): Promise<T> {
    const url = new URL(`${BASE_URL}${path}`);
    if (params) {
        Object.entries(params).forEach(([k, v]) => {
            if (v) url.searchParams.set(k, v);
        });
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json() as Promise<T>;
}
