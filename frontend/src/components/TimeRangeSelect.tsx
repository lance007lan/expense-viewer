import { getDateRange, displayRange } from '../utils/date';

const PERIODS = [
    { value: 'this_week', label: 'This Week' },
    { value: 'this_month', label: 'This Month' },
    { value: 'last_month', label: 'Last Month' },
    { value: 'last_3_months', label: 'Last 3 Months' },
    { value: 'custom', label: 'Custom' },
];

export interface TimeRangeValue {
    period: string;
    customStart: string;
    customEnd: string;
}

interface TimeRangeSelectProps {
    value: TimeRangeValue;
    onChange: (value: TimeRangeValue) => void;
}

const SELECT_CLASS =
    'border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500';
const LABEL_CLASS =
    'text-xs font-medium text-gray-500 uppercase tracking-wide';

export default function TimeRangeSelect({ value, onChange }: TimeRangeSelectProps) {
    const { period, customStart, customEnd } = value;
    const range =
        period !== 'custom'
            ? getDateRange(period)
            : { start: customStart, end: customEnd };

    function set<K extends keyof TimeRangeValue>(key: K, val: TimeRangeValue[K]) {
        onChange({ ...value, [key]: val });
    }

    return (
        <div className="flex flex-wrap items-start gap-4">
            <div className="flex flex-col gap-1">
                <label className={LABEL_CLASS}>Period</label>
                <select
                    value={period}
                    onChange={(e) => set('period', e.target.value)}
                    className={SELECT_CLASS}
                >
                    {PERIODS.map((p) => (
                        <option key={p.value} value={p.value}>
                            {p.label}
                        </option>
                    ))}
                </select>
                {range.start && range.end && (
                    <span className="text-xs text-gray-400">
                        {displayRange(range.start, range.end)}
                    </span>
                )}
            </div>

            {period === 'custom' && (
                <div className="flex items-end gap-2">
                    <div className="flex flex-col gap-1">
                        <label className={LABEL_CLASS}>From</label>
                        <input
                            type="date"
                            value={customStart}
                            onChange={(e) => set('customStart', e.target.value)}
                            className={SELECT_CLASS}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className={LABEL_CLASS}>To</label>
                        <input
                            type="date"
                            value={customEnd}
                            onChange={(e) => set('customEnd', e.target.value)}
                            className={SELECT_CLASS}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
