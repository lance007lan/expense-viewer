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
        <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm shadow-sm">
            <span className="font-medium">{name}</span>
            <span className="ml-2 text-gray-600">
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
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-center text-sm text-gray-400 h-80">
                No data
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="font-semibold text-gray-900 mb-4">
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

            <div className="mt-4 flex flex-col gap-2">
                {data.map((entry) => {
                    const pct =
                        total > 0
                            ? ((entry.value / total) * 100).toFixed(0)
                            : 0;
                    return (
                        <div
                            key={entry.name}
                            className="flex items-center justify-between text-sm"
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                    style={{
                                        backgroundColor:
                                            COLORS[entry.name] ?? DEFAULT_COLOR,
                                    }}
                                />
                                <span className="text-gray-700">
                                    {entry.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-500">
                                <span>
                                    {viewBy === 'amount'
                                        ? `$${entry.value.toFixed(2)}`
                                        : `${entry.value} txns`}
                                </span>
                                <span className="w-8 text-right">{pct}%</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
