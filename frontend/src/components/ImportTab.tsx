import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSpendersQuery, useCreateExpenseMutation } from '../api/queries';
import { categories } from '../data/mock';
import { fmt } from '../utils/date';

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

export default function ImportTab() {
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
        <main className="max-w-2xl mx-auto px-6 py-8">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4"
            >
                <h2 className="font-semibold text-gray-900">
                    Import Expense
                </h2>

                {mutation.isSuccess && (
                    <p className="text-sm text-green-600">Expense added.</p>
                )}
                {mutation.isError && (
                    <p className="text-sm text-red-500">
                        {mutation.error.message}
                    </p>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Date
                        </label>
                        <input
                            type="date"
                            {...register('date')}
                            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.date && (
                            <span className="text-xs text-red-500">
                                {errors.date.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Amount
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            {...register('amount', { valueAsNumber: true })}
                            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.amount && (
                            <span className="text-xs text-red-500">
                                {errors.amount.message}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Description
                    </label>
                    <input
                        type="text"
                        {...register('description')}
                        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.description && (
                        <span className="text-xs text-red-500">
                            {errors.description.message}
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Spender
                        </label>
                        <select
                            {...register('spender')}
                            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select spender</option>
                            {spenders.map((s) => (
                                <option key={s.id} value={s.name}>
                                    {s.name}
                                </option>
                            ))}
                        </select>
                        {errors.spender && (
                            <span className="text-xs text-red-500">
                                {errors.spender.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Category
                        </label>
                        <select
                            {...register('category')}
                            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select category</option>
                            {categories.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                        {errors.category && (
                            <span className="text-xs text-red-500">
                                {errors.category.message}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Receipt (optional)
                    </label>
                    <input
                        type="file"
                        accept="image/*,application/pdf"
                        {...register('receipt')}
                        className="text-sm text-gray-700 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-white hover:file:bg-gray-50"
                    />
                    {receiptFile && (
                        <span className="text-xs text-gray-500">
                            {receiptFile.name}
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Adding…' : 'Add Expense'}
                </button>
            </form>
        </main>
    );
}
