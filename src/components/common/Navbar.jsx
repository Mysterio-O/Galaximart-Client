import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { IoCartOutline } from 'react-icons/io5';
import './nav.css'
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuVariants = {
        hidden: { opacity: 0, y: -50, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        },
        exit: { opacity: 0, y: -50, scale: 0.9, transition: { duration: 0.4 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
    };

    const links = [
        { name: 'Home', to: '/' },
        { name: 'Categories', to: '/categories', active: 'bg-gradient-to-r from-cyan-500/30 to-violet-500/30 text-white font-bold shadow-[0_0_10px_rgba(139,92,246,0.5)]' },
        { name: 'All Product', to: '/all-product', active: 'bg-gradient-to-r from-cyan-500/30 to-violet-500/30 text-white font-bold shadow-[0_0_10px_rgba(139,92,246,0.5)]' },
        { name: 'Add Product', to: '/add-product', active: 'bg-gradient-to-r from-cyan-500/30 to-violet-500/30 text-white font-bold shadow-[0_0_10px_rgba(139,92,246,0.5)]' },
        { name: 'My Product', to: '/my-product', active: 'bg-gradient-to-r from-cyan-500/30 to-violet-500/30 text-white font-bold shadow-[0_0_10px_rgba(139,92,246,0.5)]' }
    ];

    return (
        <nav className="relative bg-gradient-to-r from-gray-900/95 via-violet-950/95 to-cyan-900/95 backdrop-blur-2xl shadow-[0_0_15px_rgba(139,92,246,0.3)] border-b border-cyan-500/30 overflow-hidden">
            {/* Background Particle Effect */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute w-72 h-72 bg-cyan-500/25 rounded-full filter blur-3xl animate-pulse opacity-20 top-[-120px] left-[-120px]"></div>
                <div className="absolute w-96 h-96 bg-magenta-500/25 rounded-full filter blur-3xl animate-pulse opacity-20 bottom-[-180px] right-[-180px] animate-pulse-slow"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex justify-between items-center h-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="flex-shrink-0"
                    >
                        <Link to="/">
                            <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-violet-500 tracking-tighter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] orbitron">
                                GalaxiMart
                            </span>
                        </Link>
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <ul className="flex items-center space-x-6">
                            {links.map((link) => (
                                <motion.li
                                    key={link.name}
                                    className="relative text-gray-100 text-sm font-semibold tracking-wide uppercase group"
                                    whileHover={{ scale: 1.15, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <NavLink
                                        to={link.to}
                                        className={`px-4 py-2 rounded-lg transition-all duration-300 relative z-10 ${(isActive) => (isActive ? link.active : '')}`}
                                    >
                                        {link.name}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-magenta-500 transition-all duration-500 group-hover:w-full"></span>
                                    </NavLink>
                                </motion.li>
                            ))}
                        </ul>
                        <div className="flex items-center space-x-4">

                            {/* cart div */}
                            <motion.div
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-gray-100 hover:text-cyan-400 transition-all duration-300"
                            >
                                <Link to="/cart">
                                    <IoCartOutline size={30} className="drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]" />
                                </Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {/* signin button */}
                                <NavLink
                                    to="/auth/signin"
                                    className={`btn btn-ghost text-sm font-semibold uppercase tracking-wide text-gray-100 hover:bg-cyan-500/30 hover:text-cyan-400 px-4 py-2 rounded-lg shadow-[0_0_8px_rgba(34,211,238,0.3)] transition-all duration-300 ${(isActive) => (isActive ? 'bg-gradient-to-r from-cyan-500/40 to-violet-500/40 text-white font-bold shadow-[0_0_12px_rgba(139,92,246,0.6)] border border-cyan-400/50' : '')}`}
                                >
                                    Sign In
                                </NavLink>
                            </motion.div>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <motion.button
                            className="btn btn-ghost text-gray-400 hover:bg-cyan-500/30 rounded-full p-3 shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                            onClick={() => setIsOpen(!isOpen)}
                            whileHover={{ rotate: 180, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                />
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="md:hidden bg-gradient-to-b from-gray-900/95 to-violet-950/95 backdrop-blur-md border-t border-cyan-500/30 shadow-[0_0_10px_rgba(139,92,246,0.2)]"
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="px-4 pt-4 pb-6 space-y-4">
                            {links.map((link) => (
                                <motion.div
                                    key={link.name}
                                    variants={itemVariants}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <NavLink
                                        to={link.to}
                                        className={`block text-gray-100 px-4 py-3 rounded-xl text-base font-semibold uppercase tracking-wide transition-all duration-300 ${(isActive) => (isActive ? link.active : '')}`}
                                    >
                                        {link.name}
                                    </NavLink>
                                </motion.div>
                            ))}
                            <motion.div
                                variants={itemVariants}
                                className="flex flex-col justify-center space-x-4"
                                onClick={() => setIsOpen(false)}
                            >
                                <NavLink
                                    to="/cart"
                                    className="text-gray-100 hover:text-cyan-400 px-4 py-3"
                                >
                                    <IoCartOutline size={28} className="drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]" />
                                </NavLink>
                                <NavLink
                                    to="/signin"
                                    className={`text-gray-100 hover:text-cyan-400 px-4 py-3 text-base font-semibold uppercase tracking-wide hover:bg-cyan-500/20 rounded-xl ${(isActive) => (isActive ? 'bg-gradient-to-r from-cyan-500/30 to-violet-500/30 text-white font-bold shadow-[0_0_10px_rgba(139,92,246,0.5)]' : '')}`}
                                >
                                    Sign In
                                </NavLink>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.15); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 7s ease-in-out infinite;
        }
      `}</style>
        </nav>
    );
};

export default Navbar;