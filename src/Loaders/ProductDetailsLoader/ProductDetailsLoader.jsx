import React from 'react';
import { motion } from 'motion/react';

const ProductDetailsLoader = () => {
    // Color scheme matching your dark theme
    const bgColor = 'bg-[#2a2a40]'; // Dark blue-gray similar to your backdrop
    const shimmerColor = 'bg-[#3a3a5a]'; // Lighter accent color for shimmer effect

    return (
        <div className="min-h-screen max-w-6xl mx-auto backdrop-blur-md bg-white/20 m-4 p-4 rounded-2xl my-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Left side - Image gallery skeleton */}
                <div className="space-y-4">
                    {/* Main image placeholder */}
                    <div className={`relative aspect-square rounded-[20px_18px_14px_16px] overflow-hidden ${bgColor}`}>
                        <div className="absolute top-4 left-4 z-10 space-y-2">
                            <div className={`inline-block px-3 py-1 rounded-lg w-12 h-6 ${shimmerColor}`}></div>
                            <div className={`inline-block px-3 py-1 rounded-lg w-12 h-6 ${shimmerColor}`}></div>
                        </div>
                    </div>

                    {/* Thumbnail placeholders */}
                    <div className="flex gap-4 flex-wrap">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className={`w-[8rem] aspect-square rounded-lg ${bgColor}`}
                            ></div>
                        ))}
                    </div>
                </div>

                {/* Right side - Product details skeleton */}
                <div className="space-y-6">
                    {/* Rating skeleton */}
                    <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <div key={star} className={`w-4 h-4 rounded-full ${shimmerColor}`}></div>
                            ))}
                        </div>
                        <div className={`w-16 h-4 rounded ${shimmerColor}`}></div>
                    </div>

                    {/* Title skeleton */}
                    <div className="space-y-2">
                        <div className={`h-8 w-3/4 rounded ${bgColor}`}></div>
                        <div className={`h-6 w-1/2 rounded ${bgColor}`}></div>
                    </div>

                    {/* Price skeleton */}
                    <div className="flex items-center gap-3">
                        <div className={`h-8 w-20 rounded ${shimmerColor}`}></div>
                        <div className={`h-6 w-16 rounded ${bgColor}`}></div>
                    </div>

                    {/* Timer skeleton */}
                    <div>
                        <div className={`h-4 w-32 rounded mb-2 ${bgColor}`}></div>
                        <div className="flex gap-3">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="flex flex-col items-center">
                                    <div className={`w-12 h-10 rounded-lg ${shimmerColor}`}></div>
                                    <div className={`w-10 h-3 rounded mt-1 ${bgColor}`}></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Details skeleton */}
                    <div className="space-y-3 border-t border-cyan-300/30 pt-4">
                        <div className={`h-4 w-24 rounded ${shimmerColor}`}></div>
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="space-y-1">
                                <div className={`h-3 w-3/4 rounded ${bgColor}`}></div>
                                <div className={`h-3 w-full rounded ${bgColor}`}></div>
                            </div>
                        ))}
                    </div>

                    {/* Quantity and buttons skeleton */}
                    <div className="pt-6 space-y-4">
                        <div className="flex gap-4">
                            <div className={`flex items-center rounded-md w-32 h-12 ${shimmerColor}`}></div>
                            <div className={`flex-1 h-12 rounded-md ${shimmerColor}`}></div>
                        </div>

                        <div className="flex gap-4">
                            <div className={`flex-1 h-12 rounded-xl ${shimmerColor}`}></div>
                            <div className={`flex-1 h-12 rounded-xl ${shimmerColor}`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsLoader;