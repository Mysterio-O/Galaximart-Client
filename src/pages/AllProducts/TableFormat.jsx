import React, { use } from 'react';
import TableRow from './TableRow';
import { motion } from 'motion/react';

const TableFormat = ({ productsPromise }) => {
    const products = use(productsPromise);

    return (
        <div className="overflow-x-auto px-4 py-8 bg-gradient-to-br from-gray-900/95 via-violet-950/95 to-cyan-900/95 dark:from-gray-100/95 dark:via-violet-100/95 dark:to-cyan-100/95 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)] dark:shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            <motion.table
                className="table w-full border-separate border-spacing-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* head */}
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
                    {/* dynamic rows */}
                    {products.map(product => (
                        <TableRow key={product?._id} product={product} />
                    ))}
                </tbody>
            </motion.table>
        </div>
    );
};

export default TableFormat;