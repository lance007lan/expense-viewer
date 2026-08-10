import { useSelectionStore } from '../store/useSelectionStore';
import { useDeleteExpensesMutation } from '../api/queries';

export default function BulkActionBar() {
    const selectedIds = useSelectionStore((s) => s.selectedIds);
    const clear = useSelectionStore((s) => s.clear);
    const { mutate: deleteExpenses, isPending } = useDeleteExpensesMutation();

    if (selectedIds.size === 0) return null;

    const handleDelete = () => {
        const ids = Array.from(selectedIds);
        if (
            !window.confirm(
                `Delete ${ids.length} expense${ids.length === 1 ? '' : 's'}? This cannot be undone.`,
            )
        ) {
            return;
        }
        deleteExpenses(ids, { onSuccess: () => clear() });
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-lg">
            <span className="text-sm font-medium">
                {selectedIds.size} selected
            </span>
            <button
                onClick={handleDelete}
                disabled={isPending}
                className="text-sm font-medium text-red-300 hover:text-red-200 disabled:opacity-50"
            >
                {isPending ? 'Deleting…' : 'Delete'}
            </button>
            <button
                onClick={() => clear()}
                className="text-sm text-gray-300 hover:text-white"
            >
                Cancel
            </button>
        </div>
    );
}
