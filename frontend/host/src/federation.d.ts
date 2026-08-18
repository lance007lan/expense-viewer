// These remotes are loaded at runtime via Module Federation (see
// vite.config.ts). TypeScript has no way to see their real types across the
// federation boundary, so these shims declare just enough for host's
// dynamic import() calls to type-check against.
declare module 'dashboard/DashboardTab' {
    import type { ComponentType } from 'react';

    const DashboardTab: ComponentType;
    export default DashboardTab;
}

declare module 'dashboard/ExpenseDetail' {
    import type { ComponentType } from 'react';

    const ExpenseDetail: ComponentType;
    export default ExpenseDetail;
}

declare module 'charts/ChartsTab' {
    import type { ComponentType } from 'react';

    const ChartsTab: ComponentType;
    export default ChartsTab;
}

declare module 'importApp/ImportTab' {
    import type { ComponentType } from 'react';

    const ImportTab: ComponentType;
    export default ImportTab;
}
