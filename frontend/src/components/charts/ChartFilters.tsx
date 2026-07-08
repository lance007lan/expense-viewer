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
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-4">
            <TimeRangeSelect
                value={filters}
                onChange={(range) => onChange({ ...filters, ...range })}
            />

            <div className="flex flex-wrap items-end gap-4 pt-4 border-t border-gray-100">
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
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
                        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {GROUP_BY.map((g) => (
                            <option key={g.value} value={g.value}>
                                {g.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
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
                        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="mb-0.5 text-sm text-blue-600 hover:text-blue-800 underline underline-offset-2"
                >
                    Clear
                </button>
            </div>
        </div>
    );
}
