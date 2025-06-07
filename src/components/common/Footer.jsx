import React from 'react';
import { NavLink } from 'react-router';
import { motion } from 'motion/react';
import { FaTwitter, FaInstagram, FaFacebookF, FaGithub } from 'react-icons/fa';

const Footer = () => {
    const linkVariants = {
        hover: { scale: 1.15, color: '#22d3ee', y: -3, transition: { duration: 0.3 } }
    };

    const iconVariants = {
        hover: { scale: 1.25, color: '#e879f9', y: -2, transition: { duration: 0.3 } }
    };

    const logoVariants = {
        hidden: { opacity: 0, scale: 0.7, rotate: -10 },
        visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.9, ease: 'easeOut' } },
        hover: { scale: 1.05, filter: 'drop-shadow(0 0 15px rgba(34,211,238,0.7))' }
    };

    const ringVariants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 0.5, scale: 1, transition: { duration: 1.2, ease: 'easeOut' } },
        hover: { rotate: 360, transition: { duration: 4, ease: 'linear', repeat: Infinity } }
    };

    const footerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: 'easeOut', staggerChildren: 0.15 }
        }
    };

    const links = [
        { name: 'Home', to: '/' },
        { name: 'Categories', to: '/categories' },
        { name: 'Sign In', to: '/auth/signin' },
        { name: 'Sign Up', to: '/auth/signup' }
    ];

    const customStyles = `
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.15); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 7s ease-in-out infinite;
        }
        @keyframes wave {
          0% { background-position-x: 0; }
          100% { background-position-x: 1440px; }
        }
        .animate-wave {
          animation: wave 20s linear infinite;
        }
      `

    return (
        <footer className="relative bg-gradient-to-t from-gray-900/90 via-violet-950/90 to-cyan-900/90 backdrop-blur-2xl shadow-[0_0_20px_rgba(139,92,246,0.4)] border-t border-cyan-500/40 py-12 overflow-hidden">
            <style>{customStyles}</style>
            {/* Wave Background Animation */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute w-full h-full bg-bottom bg-no-repeat opacity-30 animate-wave"></div>
                <div className="absolute w-72 h-72 bg-cyan-500/25 rounded-full filter blur-3xl animate-pulse opacity-20 top-[10%] left-[5%]"></div>
                <div className="absolute w-80 h-80 bg-magenta-500/25 rounded-full filter blur-3xl animate-pulse opacity-20 bottom-[15%] right-[5%] animate-pulse-slow"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-200"
                    variants={footerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Brand Section */}
                    <motion.div variants={footerVariants} className="flex flex-col items-center md:items-start">
                        <NavLink to="/">
                            <motion.div
                                className="relative flex flex-col items-center"
                                variants={logoVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover="hover"
                            >
                                {/* Neon Ring Effect */}
                                <motion.div
                                    className="absolute w-28 h-28 rounded-full border-2 border-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                    variants={ringVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                ></motion.div>
                                <img
                                    src="/main-logo.webp"
                                    alt="GalaxiMart Logo"
                                    className="w-20 h-20 rounded-full z-10 shadow-[0_0_12px_rgba(139,92,246,0.4)]"
                                />
                                <span className="orbitron text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-violet-500 tracking-tight mt-2">
                                    GalaxiMart
                                </span>
                            </motion.div>
                        </NavLink>
                        <p className="inter text-sm text-center md:text-left mt-4">
                            Dive into a stellar shopping experience.
                        </p>
                    </motion.div>

                    {/* Navigation Links */}
                    <motion.div variants={footerVariants} className="flex flex-col items-center md:items-start">
                        <h3 className="orbitron text-xl font-semibold text-cyan-300 mb-4">Explore</h3>
                        <ul className="space-y-3">
                            {links.map((link) => (
                                <motion.li key={link.name} variants={linkVariants} whileHover="hover">
                                    <NavLink
                                        to={link.to}
                                        className="inter text-sm text-gray-300 hover:text-cyan-400 transition-all duration-300"
                                    >
                                        {link.name}
                                    </NavLink>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Social Media & Contact */}
                    <motion.div variants={footerVariants} className="flex flex-col items-center md:items-start">
                        <h3 className="orbitron text-xl font-semibold text-cyan-300 mb-4">Stay Connected</h3>
                        <div className="flex space-x-5 mb-4">
                            <motion.a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                variants={iconVariants}
                                whileHover="hover"
                                className="text-gray-300"
                            >
                                <FaTwitter size={24} />
                            </motion.a>
                            <motion.a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                variants={iconVariants}
                                whileHover="hover"
                                className="text-gray-300"
                            >
                                <FaInstagram size={24} />
                            </motion.a>
                            <motion.a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                variants={iconVariants}
                                whileHover="hover"
                                className="text-gray-300"
                            >
                                <FaFacebookF size={24} />
                            </motion.a>
                            <motion.a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                variants={iconVariants}
                                whileHover="hover"
                                className="text-gray-300"
                            >
                                <FaGithub size={24} />
                            </motion.a>
                        </div>
                        <p className="inter text-sm text-center md:text-left">
                            Email: <a href="mailto:support@galaximart.com" className="hover:text-cyan-400 transition-all duration-300">support@galaximart.com</a>
                        </p>
                    </motion.div>
                </motion.div>

                {/* Copyright Section */}
                <motion.div
                    className="mt-10 pt-6 border-t border-cyan-500/30 text-center"
                    variants={footerVariants}
                >
                    <p className="inter text-sm text-gray-400">
                        © {new Date().getFullYear()} GalaxiMart. All rights reserved.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;