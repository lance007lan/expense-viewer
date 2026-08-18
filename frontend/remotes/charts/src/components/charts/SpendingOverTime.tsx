import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import type { TimeDataPoint } from '../../types';

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: string;
    viewBy: 'amount' | 'count';
}

function CustomTooltip({ active, payload, label, viewBy }: CustomTooltipProps) {
    if (!active || !payload?.length) return null;
    const value = payload[0].value ?? 0;
    return (
        <div className="c:bg-white c:border c:border-gray-200 c:rounded-lg c:px-3 c:py-2 c:text-sm c:shadow-sm">
            <span className="c:font-medium">{label}</span>
            <span className="c:ml-2 c:text-gray-600">
                {viewBy === 'amount' ? `$${value.toFixed(2)}` : `${value} txns`}
            </span>
        </div>
    );
}

function yTickFormatter(value: number, viewBy: 'amount' | 'count'): string {
    if (viewBy === 'amount')
        return `$${value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}`;
    return String(value);
}

interface SpendingOverTimeProps {
    data: TimeDataPoint[];
    viewBy: 'amount' | 'count';
}

export default function SpendingOverTime({
    data,
    viewBy,
}: SpendingOverTimeProps) {
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
                Spending Over Time
            </h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={data}
                    margin={{ top: 4, right: 8, left: 8, bottom: 4 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis
                        dataKey="label"
                        tick={{ fontSize: 12, fill: '#94a3b8' }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tickFormatter={(v) =>
                            yTickFormatter(v as number, viewBy)
                        }
                        tick={{ fontSize: 12, fill: '#94a3b8' }}
                        axisLine={false}
                        tickLine={false}
                        width={52}
                    />
                    <Tooltip
                        content={<CustomTooltip viewBy={viewBy} />}
                        cursor={{ fill: '#f1f5f9' }}
                    />
                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
