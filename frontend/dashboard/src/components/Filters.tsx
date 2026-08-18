import { categories } from '../data/categories';
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
        <div className="d:bg-white d:border d:border-gray-200 d:rounded-xl d:p-4 d:flex d:flex-col d:gap-4">
            <TimeRangeSelect
                value={filters}
                onChange={(range) => onChange({ ...filters, ...range })}
            />

            <div className="d:flex d:flex-wrap d:items-end d:gap-4 d:pt-4 d:border-t d:border-gray-100">
                <div className="d:flex d:flex-col d:gap-1">
                    <label className="d:text-xs d:font-medium d:text-gray-500 d:uppercase d:tracking-wide">
                        Spender
                    </label>
                    <select
                        value={spender}
                        onChange={(e) => set('spender', e.target.value)}
                        className="d:border d:border-gray-300 d:rounded-md d:px-3 d:py-1.5 d:text-sm d:text-gray-900 d:focus:outline-none d:focus:ring-2 d:focus:ring-blue-500"
                    >
                        <option value="">All Spenders</option>
                        {spenders.map((s) => (
                            <option key={s.id} value={s.name}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="d:flex d:flex-col d:gap-1">
                    <label className="d:text-xs d:font-medium d:text-gray-500 d:uppercase d:tracking-wide">
                        Category
                    </label>
                    <select
                        value={category}
                        onChange={(e) => set('category', e.target.value)}
                        className="d:border d:border-gray-300 d:rounded-md d:px-3 d:py-1.5 d:text-sm d:text-gray-900 d:focus:outline-none d:focus:ring-2 d:focus:ring-blue-500"
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
                    className="d:mb-0.5 d:text-sm d:text-blue-600 d:hover:text-blue-800 d:underline d:underline-offset-2"
                >
                    Clear
                </button>
            </div>
        </div>
    );
}
