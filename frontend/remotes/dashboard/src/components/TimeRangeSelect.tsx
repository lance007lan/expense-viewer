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
    'd:border d:border-gray-300 d:rounded-md d:px-3 d:py-1.5 d:text-sm d:text-gray-900 d:focus:outline-none d:focus:ring-2 d:focus:ring-blue-500';
const LABEL_CLASS =
    'd:text-xs d:font-medium d:text-gray-500 d:uppercase d:tracking-wide';

export default function TimeRangeSelect({
    value,
    onChange,
}: TimeRangeSelectProps) {
    const { period, customStart, customEnd } = value;
    const range =
        period !== 'custom'
            ? getDateRange(period)
            : { start: customStart, end: customEnd };

    function set<K extends keyof TimeRangeValue>(
        key: K,
        val: TimeRangeValue[K],
    ) {
        onChange({ ...value, [key]: val });
    }

    return (
        <div className="d:flex d:flex-wrap d:items-start d:gap-4">
            <div className="d:flex d:flex-col d:gap-1">
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
                    <span className="d:text-xs d:text-gray-400">
                        {displayRange(range.start, range.end)}
                    </span>
                )}
            </div>

            {period === 'custom' && (
                <div className="d:flex d:items-end d:gap-2">
                    <div className="d:flex d:flex-col d:gap-1">
                        <label className={LABEL_CLASS}>From</label>
                        <input
                            type="date"
                            value={customStart}
                            onChange={(e) => set('customStart', e.target.value)}
                            className={SELECT_CLASS}
                        />
                    </div>
                    <div className="d:flex d:flex-col d:gap-1">
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
