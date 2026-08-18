import type { ChartFilters as ChartFiltersType } from '../../types';
import TimeRangeSelect from '../TimeRangeSelect';

const GROUP_BY = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
] as const;

const VIEW_BY = [
    { value: 'amount', label: 'Amount ($)' },
    { value: 'count', label: 'Count' },
] as const;

const DEFAULT: ChartFiltersType = {
    period: 'this_month',
    customStart: '',
    customEnd: '',
    groupBy: 'week',
    viewBy: 'amount',
};

interface ChartFiltersProps {
    filters: ChartFiltersType;
    onChange: (filters: ChartFiltersType) => void;
}

export default function ChartFilters({ filters, onChange }: ChartFiltersProps) {
    const { groupBy, viewBy } = filters;

    function set<K extends keyof ChartFiltersType>(
        key: K,
        value: ChartFiltersType[K],
    ) {
        onChange({ ...filters, [key]: value });
    }

    return (
        <div className="c:bg-white c:border c:border-gray-200 c:rounded-xl c:p-4 c:flex c:flex-col c:gap-4">
            <TimeRangeSelect
                value={filters}
                onChange={(range) => onChange({ ...filters, ...range })}
            />

            <div className="c:flex c:flex-wrap c:items-end c:gap-4 c:pt-4 c:border-t c:border-gray-100">
                <div className="c:flex c:flex-col c:gap-1">
                    <label className="c:text-xs c:font-medium c:text-gray-500 c:uppercase c:tracking-wide">
                        Group By
                    </label>
                    <select
                        value={groupBy}
                        onChange={(e) =>
                            set(
                                'groupBy',
                                e.target.value as ChartFiltersType['groupBy'],
                            )
                        }
                        className="c:border c:border-gray-300 c:rounded-md c:px-3 c:py-1.5 c:text-sm c:text-gray-900 c:focus:outline-none c:focus:ring-2 c:focus:ring-blue-500"
                    >
                        {GROUP_BY.map((g) => (
                            <option key={g.value} value={g.value}>
                                {g.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="c:flex c:flex-col c:gap-1">
                    <label className="c:text-xs c:font-medium c:text-gray-500 c:uppercase c:tracking-wide">
                        View By
                    </label>
                    <select
                        value={viewBy}
                        onChange={(e) =>
                            set(
                                'viewBy',
                                e.target.value as ChartFiltersType['viewBy'],
                            )
                        }
                        className="c:border c:border-gray-300 c:rounded-md c:px-3 c:py-1.5 c:text-sm c:text-gray-900 c:focus:outline-none c:focus:ring-2 c:focus:ring-blue-500"
                    >
                        {VIEW_BY.map((v) => (
                            <option key={v.value} value={v.value}>
                                {v.label}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={() => onChange(DEFAULT)}
                    className="c:mb-0.5 c:text-sm c:text-blue-600 c:hover:text-blue-800 c:underline c:underline-offset-2"
                >
                    Clear
                </button>
            </div>
        </div>
    );
}
