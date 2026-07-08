export function getDateRange(period: string): { start: string; end: string } {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();

    switch (period) {
        case 'this_week': {
            const day = today.getDay();
            const monday = new Date(today);
            monday.setDate(today.getDate() - ((day + 6) % 7));
            return { start: fmt(monday), end: fmt(today) };
        }
        case 'this_month':
            return { start: fmt(new Date(y, m, 1)), end: fmt(today) };
        case 'last_month':
            return {
                start: fmt(new Date(y, m - 1, 1)),
                end: fmt(new Date(y, m, 0)),
            };
        case 'last_3_months':
            return { start: fmt(new Date(y, m - 2, 1)), end: fmt(today) };
        default:
            return { start: '', end: '' };
    }
}

export function fmt(date: Date): string {
    return date.toISOString().slice(0, 10);
}

export function displayRange(start: string, end: string): string {
    const opts: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };
    return `${new Date(start + 'T00:00:00').toLocaleDateString('en-AU', opts)} – ${new Date(end + 'T00:00:00').toLocaleDateString('en-AU', opts)}`;
}
