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
    'c:border c:border-gray-300 c:rounded-md c:px-3 c:py-1.5 c:text-sm c:text-gray-900 c:focus:outline-none c:focus:ring-2 c:focus:ring-blue-500';
const LABEL_CLASS =
    'c:text-xs c:font-medium c:text-gray-500 c:uppercase c:tracking-wide';

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
        <div className="c:flex c:flex-wrap c:items-start c:gap-4">
            <div className="c:flex c:flex-col c:gap-1">
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
                    <span className="c:text-xs c:text-gray-400">
                        {displayRange(range.start, range.end)}
                    </span>
                )}
            </div>

            {period === 'custom' && (
                <div className="c:flex c:items-end c:gap-2">
                    <div className="c:flex c:flex-col c:gap-1">
                        <label className={LABEL_CLASS}>From</label>
                        <input
                            type="date"
                            value={customStart}
                            onChange={(e) => set('customStart', e.target.value)}
                            className={SELECT_CLASS}
                        />
                    </div>
                    <div className="c:flex c:flex-col c:gap-1">
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
