import { categories } from '../data/mock';
import type { DashboardFilters, Spender } from '../types';
import TimeRangeSelect from './TimeRangeSelect';

const DEFAULT: DashboardFilters = {
    period: 'this_month',
    customStart: '',
    customEnd: '',
    spender: '',
    category: '',
};

interface FiltersProps {
    filters: DashboardFilters;
    onChange: (filters: DashboardFilters) => void;
    spenders?: Spender[];
}

export default function Filters({
    filters,
    onChange,
    spenders = [],
}: FiltersProps) {
    const { spender, category } = filters;

    function set<K extends keyof DashboardFilters>(
        key: K,
        value: DashboardFilters[K],
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
                        Spender
                    </label>
                    <select
                        value={spender}
                        onChange={(e) => set('spender', e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Spenders</option>
                        {spenders.map((s) => (
                            <option key={s.id} value={s.name}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Category
                    </label>
                    <select
                        value={category}
                        onChange={(e) => set('category', e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Categories</option>
                        {categories.map((c) => (
                            <option key={c} value={c}>
                                {c}
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
