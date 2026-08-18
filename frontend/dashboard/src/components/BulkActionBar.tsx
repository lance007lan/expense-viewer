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
        <div className="d:fixed d:bottom-6 d:left-1/2 d:-translate-x-1/2 d:flex d:items-center d:gap-4 d:bg-gray-900 d:text-white d:px-5 d:py-3 d:rounded-xl d:shadow-lg">
            <span className="d:text-sm d:font-medium">
                {selectedIds.size} selected
            </span>
            <button
                onClick={handleDelete}
                disabled={isPending}
                className="d:text-sm d:font-medium d:text-red-300 d:hover:text-red-200 d:disabled:opacity-50"
            >
                {isPending ? 'Deleting…' : 'Delete'}
            </button>
            <button
                onClick={() => clear()}
                className="d:text-sm d:text-gray-300 d:hover:text-white"
            >
                Cancel
            </button>
        </div>
    );
}
