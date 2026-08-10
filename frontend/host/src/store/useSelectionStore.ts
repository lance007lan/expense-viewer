import { create } from 'zustand';

interface SelectionStore {
    selectedIds: Set<number>;
    toggle: (id: number) => void;
    selectAll: (ids: number[]) => void;
    clear: () => void;
}

export const useSelectionStore = create<SelectionStore>((set) => ({
    selectedIds: new Set(),
    toggle: (id) =>
        set((s) => {
            const next = new Set(s.selectedIds);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return { selectedIds: next };
        }),
    selectAll: (ids) => set({ selectedIds: new Set(ids) }),
    clear: () => set({ selectedIds: new Set() }),
}));
