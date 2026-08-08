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
        <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm shadow-sm">
            <span className="font-medium">{label}</span>
            <span className="ml-2 text-gray-600">
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
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-center text-sm text-gray-400 h-80">
                No data
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="font-semibold text-gray-900 mb-4">
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
