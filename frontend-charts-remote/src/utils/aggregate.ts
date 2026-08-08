import type { Expense, ChartDataPoint, TimeDataPoint } from '../types';

function weekStart(dateStr: string): string {
    const d = new Date(dateStr + 'T00:00:00');
    const day = d.getDay();
    const monday = new Date(d);
    monday.setDate(d.getDate() - ((day + 6) % 7));
    return monday.toISOString().slice(0, 10);
}

function shortDate(dateStr: string): string {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-AU', {
        day: 'numeric',
        month: 'short',
    });
}

function shortMonth(dateStr: string): string {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-AU', {
        month: 'short',
        year: 'numeric',
    });
}

export function aggregateByCategory(
    expenses: Expense[],
    viewBy: 'amount' | 'count' = 'amount',
): ChartDataPoint[] {
    const map: Record<string, ChartDataPoint> = {};
    for (const e of expenses) {
        if (!map[e.category]) map[e.category] = { name: e.category, value: 0 };
        map[e.category].value += viewBy === 'amount' ? e.amount : 1;
    }
    return Object.values(map).sort((a, b) => b.value - a.value);
}

export function aggregateByTime(
    expenses: Expense[],
    groupBy: 'day' | 'week' | 'month' = 'week',
    viewBy: 'amount' | 'count' = 'amount',
): TimeDataPoint[] {
    const map = new Map<string, TimeDataPoint>();
    for (const e of expenses) {
        let key: string;
        let label: string;
        if (groupBy === 'day') {
            key = e.date;
            label = shortDate(e.date);
        } else if (groupBy === 'week') {
            key = weekStart(e.date);
            label = shortDate(key);
        } else {
            key = e.date.slice(0, 7);
            label = shortMonth(e.date);
        }
        if (!map.has(key)) map.set(key, { key, label, value: 0 });
        map.get(key)!.value += viewBy === 'amount' ? e.amount : 1;
    }
    return [...map.values()].sort((a, b) => a.key.localeCompare(b.key));
}
