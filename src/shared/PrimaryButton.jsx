import React from 'react';
import {motion} from "motion/react";

const PrimaryButton = ({text}) => {
    return (
        <motion.button
            className="flex items-center px-6 py-3 text-sm font-semibold uppercase tracking-wide text-gray-100 bg-gradient-to-r from-cyan-500/30 to-violet-500/30 rounded-lg shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:bg-gradient-to-r hover:from-cyan-400 hover:to-magenta-500 hover:text-white group"
            transition={{ duration: 0.3 }}
        >
            {text}
            <span
                className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </span>
        </motion.button>
    );
};

export default PrimaryButton;