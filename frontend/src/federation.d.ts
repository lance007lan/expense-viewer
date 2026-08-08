// chartsRemote is a Module Federation remote loaded at runtime (see
// vite.config.ts). TypeScript has no way to see its real types across the
// federation boundary, so this shim declares just enough for the host's
// dynamic import() to type-check against.
declare module 'chartsRemote/ChartsTab' {
    import type { ComponentType } from 'react';

    const ChartsTab: ComponentType;
    export default ChartsTab;
}
