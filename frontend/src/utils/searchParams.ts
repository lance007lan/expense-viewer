import type { DashboardFilters, ChartFilters } from '../types';

const DASHBOARD_DEFAULTS: DashboardFilters = {
    period: 'this_month',
    customStart: '',
    customEnd: '',
    spender: '',
    category: '',
};

const CHART_DEFAULTS: ChartFilters = {
    period: 'this_month',
    customStart: '',
    customEnd: '',
    groupBy: 'week',
    viewBy: 'amount',
};

function toParams<T extends object>(filters: T): URLSearchParams {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
        if (value) params.set(key, value as string);
    });
    return params;
}

export function dashboardFiltersFromParams(
    params: URLSearchParams,
): DashboardFilters {
    return {
        period: params.get('period') ?? DASHBOARD_DEFAULTS.period,
        customStart: params.get('customStart') ?? DASHBOARD_DEFAULTS.customStart,
        customEnd: params.get('customEnd') ?? DASHBOARD_DEFAULTS.customEnd,
        spender: params.get('spender') ?? DASHBOARD_DEFAULTS.spender,
        category: params.get('category') ?? DASHBOARD_DEFAULTS.category,
    };
}

export function dashboardFiltersToParams(
    filters: DashboardFilters,
): URLSearchParams {
    return toParams(filters);
}

export function chartFiltersFromParams(params: URLSearchParams): ChartFilters {
    return {
        period: params.get('period') ?? CHART_DEFAULTS.period,
        customStart: params.get('customStart') ?? CHART_DEFAULTS.customStart,
        customEnd: params.get('customEnd') ?? CHART_DEFAULTS.customEnd,
        groupBy:
            (params.get('groupBy') as ChartFilters['groupBy'] | null) ??
            CHART_DEFAULTS.groupBy,
        viewBy:
            (params.get('viewBy') as ChartFilters['viewBy'] | null) ??
            CHART_DEFAULTS.viewBy,
    };
}

export function chartFiltersToParams(filters: ChartFilters): URLSearchParams {
    return toParams(filters);
}
