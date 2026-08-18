import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '../../types';

const COLORS: Record<string, string> = {
    Groceries: '#4ade80',
    Dining: '#fb923c',
    Bills: '#94a3b8',
    Transport: '#60a5fa',
    Shopping: '#c084fc',
    Health: '#f87171',
    Entertainment: '#fbbf24',
};

const DEFAULT_COLOR = '#cbd5e1';

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ payload: ChartDataPoint }>;
    viewBy: 'amount' | 'count';
}

function CustomTooltip({ active, payload, viewBy }: CustomTooltipProps) {
    if (!active || !payload?.length) return null;
    const { name, value } = payload[0].payload;
    return (
        <div className="c:bg-white c:border c:border-gray-200 c:rounded-lg c:px-3 c:py-2 c:text-sm c:shadow-sm">
            <span className="c:font-medium">{name}</span>
            <span className="c:ml-2 c:text-gray-600">
                {viewBy === 'amount' ? `$${value.toFixed(2)}` : `${value} txns`}
            </span>
        </div>
    );
}

interface SpendingByCategoryProps {
    data: ChartDataPoint[];
    viewBy: 'amount' | 'count';
}

export default function SpendingByCategory({
    data,
    viewBy,
}: SpendingByCategoryProps) {
    const total = data.reduce((s, d) => s + d.value, 0);

    if (data.length === 0) {
        return (
            <div className="c:bg-white c:border c:border-gray-200 c:rounded-xl c:p-6 c:flex c:items-center c:justify-center c:text-sm c:text-gray-400 c:h-80">
                No data
            </div>
        );
    }

    return (
        <div className="c:bg-white c:border c:border-gray-200 c:rounded-xl c:p-6">
            <h2 className="c:font-semibold c:text-gray-900 c:mb-4">
                Spending by Category
            </h2>
            <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={100}
                        dataKey="value"
                        paddingAngle={2}
                    >
                        {data.map((entry) => (
                            <Cell
                                key={entry.name}
                                fill={COLORS[entry.name] ?? DEFAULT_COLOR}
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip viewBy={viewBy} />} />
                </PieChart>
            </ResponsiveContainer>

            <div className="c:mt-4 c:flex c:flex-col c:gap-2">
                {data.map((entry) => {
                    const pct =
                        total > 0
                            ? ((entry.value / total) * 100).toFixed(0)
                            : 0;
                    return (
                        <div
                            key={entry.name}
                            className="c:flex c:items-center c:justify-between c:text-sm"
                        >
                            <div className="c:flex c:items-center c:gap-2">
                                <span
                                    className="c:w-2.5 c:h-2.5 c:rounded-full c:flex-shrink-0"
                                    style={{
                                        backgroundColor:
                                            COLORS[entry.name] ?? DEFAULT_COLOR,
                                    }}
                                />
                                <span className="c:text-gray-700">
                                    {entry.name}
                                </span>
                            </div>
                            <div className="c:flex c:items-center c:gap-3 c:text-gray-500">
                                <span>
                                    {viewBy === 'amount'
                                        ? `$${entry.value.toFixed(2)}`
                                        : `${entry.value} txns`}
                                </span>
                                <span className="c:w-8 c:text-right">{pct}%</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
