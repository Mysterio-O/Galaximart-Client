import React from 'react';

const CardSkeleton = () => {
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
            {Array(12).fill(0).map((_, i) => (
                <div key={i} className="card bg-gray-900/90 dark:bg-gray-100/90 rounded-xl overflow-hidden border border-cyan-500/30 dark:border-violet-500/30 animate-pulse shadow-[0_0_15px_rgba(139,92,246,0.3)] dark:shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                    <div className="px-6 pt-6">
                        <div className="bg-gray-800/50 dark:bg-gray-200/50 rounded-lg w-full h-48"></div>
                    </div>
                    <div className="card-body items-center text-center">
                        <div className="bg-gray-800/50 dark:bg-gray-200/50 h-6 w-3/4 rounded"></div>
                        <div className="bg-gray-800/50 dark:bg-gray-200/50 h-4 w-1/2 rounded mt-2"></div>
                        <div className="bg-gray-800/50 dark:bg-gray-200/50 h-4 w-full rounded mt-3"></div>
                        <div className="bg-gray-800/50 dark:bg-gray-200/50 h-4 w-full rounded mt-2"></div>
                        <div className="bg-gray-800/50 dark:bg-gray-200/50 h-4 w-1/3 rounded mt-4"></div>
                        <div className="bg-gray-800/50 dark:bg-gray-200/50 h-4 w-1/4 rounded mt-2"></div>
                        <div className="mt-4">
                            <div className="bg-gray-800/50 dark:bg-gray-200/50 h-10 w-32 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardSkeleton;