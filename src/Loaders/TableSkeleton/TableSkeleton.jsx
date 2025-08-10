import React from 'react';

const TableSkeleton = () => {
    return (
        <div className="overflow-x-auto px-4 py-8 bg-gradient-to-br from-gray-900/95 via-violet-950/95 to-cyan-900/95 dark:from-gray-100/95 dark:via-violet-100/95 dark:to-cyan-100/95 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)] dark:shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            <table className="table w-full border-separate border-spacing-y-3">
                <thead>
                    <tr className="text-cyan-400 dark:text-cyan-600 text-lg font-semibold tracking-wide">
                        <th className="bg-transparent text-left py-4">Product</th>
                        <th className="bg-transparent text-left">Min Quantity</th>
                        <th className="bg-transparent text-left">Price</th>
                        <th className="bg-transparent text-left">Description</th>
                        <th className="bg-transparent text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Array(10).fill(0).map((_, i) => (
                        <tr key={i} className="bg-gray-900/50 dark:bg-gray-100/50 rounded-lg animate-pulse">
                            <td className="py-4 px-6">
                                <div className="flex items-center gap-4">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-14 w-14 bg-gray-800/50 dark:bg-gray-200/50 border-2 border-cyan-500/30 dark:border-violet-500/30"></div>
                                    </div>
                                    <div>
                                        <div className="bg-gray-800/50 dark:bg-gray-200/50 h-5 w-32 rounded"></div>
                                        <div className="bg-gray-800/50 dark:bg-gray-200/50 h-4 w-20 rounded mt-2"></div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6">
                                <div className="bg-gray-800/50 dark:bg-gray-200/50 h-5 w-24 rounded"></div>
                            </td>
                            <td className="px-6">
                                <div className="bg-gray-800/50 dark:bg-gray-200/50 h-5 w-16 rounded"></div>
                            </td>
                            <td className="px-6">
                                <div className="bg-gray-800/50 dark:bg-gray-200/50 h-5 w-64 rounded"></div>
                            </td>
                            <td className="px-6">
                                <div className="bg-gray-800/50 dark:bg-gray-200/50 h-8 w-20 rounded-full"></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableSkeleton;