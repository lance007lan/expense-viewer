import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { useSpendersQuery, useCreateExpenseMutation } from './api/queries';
import { categories } from './data/categories';
import { fmt } from './utils/date';
import { queryClient } from './queryClient';

const importFormSchema = z.object({
    date: z.string().min(1, 'Date is required'),
    description: z.string().trim().min(1, 'Description is required'),
    spender: z.string().min(1, 'Please select a spender'),
    category: z.string().min(1, 'Please select a category'),
    amount: z
        .number({ error: 'Amount is required' })
        .positive('Amount must be greater than 0'),
    receipt: z.instanceof(FileList).optional(),
});

type ImportFormValues = z.infer<typeof importFormSchema>;

function ImportTabContent() {
    const { data: spenders = [] } = useSpendersQuery();
    const mutation = useCreateExpenseMutation();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ImportFormValues>({
        resolver: zodResolver(importFormSchema),
        defaultValues: {
            date: fmt(new Date()),
            description: '',
            spender: '',
            category: '',
        },
    });

    const receiptFile = watch('receipt')?.[0];

    async function onSubmit(data: ImportFormValues) {
        const receipt = data.receipt?.[0];

        try {
            await mutation.mutateAsync({
                date: data.date,
                description: data.description,
                spender: data.spender,
                category: data.category,
                amount: data.amount,
                ...(receipt && {
                    receiptName: receipt.name,
                    receiptUrl: URL.createObjectURL(receipt),
                }),
            });
            reset({
                date: fmt(new Date()),
                description: '',
                spender: '',
                category: '',
            });
        } catch {
            // mutation.isError / mutation.error already reflect the failure
        }
    }

    return (
        <main className="i:max-w-2xl i:mx-auto i:px-6 i:py-8">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="i:bg-white i:border i:border-gray-200 i:rounded-xl i:p-6 i:flex i:flex-col i:gap-4"
            >
                <h2 className="i:font-semibold i:text-gray-900">Import Expense</h2>

                {mutation.isSuccess && (
                    <p className="i:text-sm i:text-green-600">Expense added.</p>
                )}
                {mutation.isError && (
                    <p className="i:text-sm i:text-red-500">
                        {mutation.error.message}
                    </p>
                )}

                <div className="i:grid i:grid-cols-2 i:gap-4">
                    <div className="i:flex i:flex-col i:gap-1">
                        <label className="i:text-xs i:font-medium i:text-gray-500 i:uppercase i:tracking-wide">
                            Date
                        </label>
                        <input
                            type="date"
                            {...register('date')}
                            className="i:border i:border-gray-300 i:rounded-md i:px-3 i:py-1.5 i:text-sm i:text-gray-900 i:focus:outline-none i:focus:ring-2 i:focus:ring-blue-500"
                        />
                        {errors.date && (
                            <span className="i:text-xs i:text-red-500">
                                {errors.date.message}
                            </span>
                        )}
                    </div>

                    <div className="i:flex i:flex-col i:gap-1">
                        <label className="i:text-xs i:font-medium i:text-gray-500 i:uppercase i:tracking-wide">
                            Amount
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            {...register('amount', { valueAsNumber: true })}
                            className="i:border i:border-gray-300 i:rounded-md i:px-3 i:py-1.5 i:text-sm i:text-gray-900 i:focus:outline-none i:focus:ring-2 i:focus:ring-blue-500"
                        />
                        {errors.amount && (
                            <span className="i:text-xs i:text-red-500">
                                {errors.amount.message}
                            </span>
                        )}
                    </div>
                </div>

                <div className="i:flex i:flex-col i:gap-1">
                    <label className="i:text-xs i:font-medium i:text-gray-500 i:uppercase i:tracking-wide">
                        Description
                    </label>
                    <input
                        type="text"
                        {...register('description')}
                        className="i:border i:border-gray-300 i:rounded-md i:px-3 i:py-1.5 i:text-sm i:text-gray-900 i:focus:outline-none i:focus:ring-2 i:focus:ring-blue-500"
                    />
                    {errors.description && (
                        <span className="i:text-xs i:text-red-500">
                            {errors.description.message}
                        </span>
                    )}
                </div>

                <div className="i:grid i:grid-cols-2 i:gap-4">
                    <div className="i:flex i:flex-col i:gap-1">
                        <label className="i:text-xs i:font-medium i:text-gray-500 i:uppercase i:tracking-wide">
                            Spender
                        </label>
                        <select
                            {...register('spender')}
                            className="i:border i:border-gray-300 i:rounded-md i:px-3 i:py-1.5 i:text-sm i:text-gray-900 i:focus:outline-none i:focus:ring-2 i:focus:ring-blue-500"
                        >
                            <option value="">Select spender</option>
                            {spenders.map((s) => (
                                <option key={s.id} value={s.name}>
                                    {s.name}
                                </option>
                            ))}
                        </select>
                        {errors.spender && (
                            <span className="i:text-xs i:text-red-500">
                                {errors.spender.message}
                            </span>
                        )}
                    </div>

                    <div className="i:flex i:flex-col i:gap-1">
                        <label className="i:text-xs i:font-medium i:text-gray-500 i:uppercase i:tracking-wide">
                            Category
                        </label>
                        <select
                            {...register('category')}
                            className="i:border i:border-gray-300 i:rounded-md i:px-3 i:py-1.5 i:text-sm i:text-gray-900 i:focus:outline-none i:focus:ring-2 i:focus:ring-blue-500"
                        >
                            <option value="">Select category</option>
                            {categories.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                        {errors.category && (
                            <span className="i:text-xs i:text-red-500">
                                {errors.category.message}
                            </span>
                        )}
                    </div>
                </div>

                <div className="i:flex i:flex-col i:gap-1">
                    <label className="i:text-xs i:font-medium i:text-gray-500 i:uppercase i:tracking-wide">
                        Receipt (optional)
                    </label>
                    <input
                        type="file"
                        accept="image/*,application/pdf"
                        {...register('receipt')}
                        className="i:text-sm i:text-gray-700 i:file:mr-3 i:file:py-1.5 i:file:px-3 i:file:rounded-md i:file:border i:file:border-gray-300 i:file:text-sm i:file:font-medium i:file:bg-white i:hover:file:bg-gray-50"
                    />
                    {receiptFile && (
                        <span className="i:text-xs i:text-gray-500">
                            {receiptFile.name}
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="i:mt-2 i:bg-blue-600 i:text-white i:rounded-md i:px-4 i:py-2 i:text-sm i:font-medium i:hover:bg-blue-700 i:disabled:opacity-50 i:disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Adding…' : 'Add Expense'}
                </button>
            </form>
        </main>
    );
}

// Own independent QueryClient, deliberately not shared with the host across
// the federation boundary (see vite.config.ts) — required both when this
// remote runs standalone and when it's federated into a host with no
// knowledge of @tanstack/react-query's context at all.
export default function ImportTab() {
    return (
        <QueryClientProvider client={queryClient}>
            <ImportTabContent />
        </QueryClientProvider>
    );
}
