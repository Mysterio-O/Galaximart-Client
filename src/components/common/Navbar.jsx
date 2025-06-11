import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { IoCartOutline } from 'react-icons/io5';
import './nav.css';
import { AuthContext } from '../../Provider/AuthProvider';
import { Tooltip } from 'react-tooltip';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { user, signOutUser } = useContext(AuthContext);


    const navigate = useNavigate();

    const navVariants = {
        initial: { opacity: 0, y: -50 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
        exit: { opacity: 0, y: -50, transition: { duration: 0.4 } },
    };

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
                staggerChildren: 0.1,
            },
        },
        exit: { opacity: 0, y: -50, scale: 0.9, transition: { duration: 0.4 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    };

    const photoVariants = {
        initial: { backgroundColor: 'white' },
        whileHover: { backgroundColor: 'rgba(46, 16, 101, 0.95)' },
        transition: { duration: 0.5, ease: 'easeInOut' }
    }


    const handleCategories = () => {
        console.log('clicked');
        if (window.location.pathname === '/') {
            const element = document.getElementById('categories');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            } else {
                setTimeout(() => {
                    const retryElement = document.getElementById('categories');
                    if (retryElement) {
                        retryElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 500);
            }
        }
        else {
            navigate('/#categories');
        }

    }


    const links = [
        { name: 'Home', to: '/', active: 'bg-gradient-to-r from-cyan-500/30 to-violet-500/30 text-white font-bold shadow-[0_0_10px_rgba(139,92,246,0.5)]' },
        {
            name: 'Categories',
            to: '/#categories',
            click: () => handleCategories(),
            // scroll:'#categories'
            // active: 'bg-gradient-to-r from-cyan-500/30 to-violet-500/30 text-white font-bold shadow-[0_0_10px_rgba(139,92,246,0.5)]',
        },
        {
            name: 'All Product',
            to: '/all-product',
            active: 'bg-gradient-to-r from-cyan-500/30 to-violet-500/30 text-white font-bold shadow-[0_0_10px_rgba(139,92,246,0.5)]',
        },
        {
            name: 'Add Product',
            to: '/add-product',
            active: 'bg-gradient-to-r from-cyan-500/30 to-violet-500/30 text-white font-bold shadow-[0_0_10px_rgba(139,92,246,0.5)]',
        },
        {
            name: 'My Product',
            to: '/my-product',
            active: 'bg-gradient-to-r from-cyan-500/30 to-violet-500/30 text-white font-bold shadow-[0_0_10px_rgba(139,92,246,0.5)]',
        },
    ];

    const customStyle = `
    @keyframes pulse-slow {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 0.35; transform: scale(1.15); }
          }
          .animate-pulse-slow {
            animation: pulse-slow 7s ease-in-out infinite;
          }
    `

    const handleSignOut = () => {
        signOutUser().then(() => console.log('user signed out')).catch(err => console.log(err));
    }


    return (
        <AnimatePresence>
            <motion.nav
                variants={navVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-gradient-to-r from-gray-900/95 via-violet-950/95 to-cyan-900/95 backdrop-blur-2xl shadow-[0_0_15px_rgba(139,92,246,0.3)] border-b border-cyan-500/30"
            >
                {/* Background Particle Effect */}
                <style>{customStyle}</style>
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute w-72 h-72 bg-cyan-500/25 rounded-full filter blur-3xl animate-pulse opacity-20 top-[-80px] left-[-80px]"></div>
                    <div className="absolute w-96 h-96 bg-magenta-500/25 rounded-full filter blur-3xl animate-pulse opacity-20 bottom-[-120px] right-[-120px] animate-pulse-slow"></div>
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
                                        onClick={link?.click}
                                        className="relative text-gray-100 text-sm font-semibold tracking-wide uppercase group"
                                        whileHover={{ scale: 1.15, y: -3 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <NavLink
                                            to={link?.to}
                                            className={({ isActive }) =>
                                                `px-4 py-2 rounded-lg transition-all duration-300 relative z-10 ${isActive ? link.active : ''}`
                                            }
                                        >
                                            {link.name}
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-magenta-500 transition-all duration-500 group-hover:w-full"></span>
                                        </NavLink>
                                    </motion.li>
                                ))}
                            </ul>
                            <div className="flex items-center space-x-4">
                                {/* Cart */}
                                <motion.div
                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="text-gray-100 hover:text-cyan-400 transition-all duration-300"
                                >
                                    <Link to="/cart">
                                        <IoCartOutline size={30} className="drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]" />
                                    </Link>
                                </motion.div>

                                {
                                    !user && <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                        <NavLink
                                            to="/auth/signin"
                                            className={({ isActive }) =>
                                                `btn btn-ghost text-sm font-semibold uppercase tracking-wide text-gray-100 hover:bg-cyan-500/30 hover:text-cyan-400 px-4 py-2 rounded-lg shadow-[0_0_8px_rgba(34,211,238,0.3)] transition-all duration-300 ${isActive
                                                    ? 'bg-gradient-to-r from-cyan-500/40 to-violet-500/40 text-white font-bold shadow-[0_0_12px_rgba(139,92,246,0.6)] border border-cyan-400/50'
                                                    : ''
                                                }`
                                            }
                                        >
                                            Sign In
                                        </NavLink>
                                    </motion.div>
                                }

                                <div data-tooltip-id='name_tooltip'>
                                    <Tooltip
                                        id='name_tooltip'
                                        delayShow={300}
                                        delayHide={200}
                                        place='right'
                                        clickable={true}
                                        style={{
                                            backgroundColor: 'rgb(46 16 101)',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            textShadow: '0 0 5px rgba(0,0,0,0.7)',
                                            padding: '10px',
                                            zIndex: 9999,
                                            borderRadius:'30px'

                                        }}>
                                        <div className='flex flex-col gap-3 bg-[#1a1a2e] text-white px-3 py-2 rounded-[20px_18px_14px_16px] shadow-lg hover:shadow-[0_0_15px_rgba(34,211,238,0.4),0_0_20px_rgba(79,70,229,0.3)]'>
                                            <span>{user?.displayName}</span>
                                            <span>
                                                <motion.div
                                                    whileHover={{ scale: 1.05, rotate: 2, boxShadow: '0 0 15px rgba(34, 211, 238, 0.5)' }}
                                                    whileTap={{ scale: 0.98, rotate: -2 }}
                                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                                >
                                                    <button
                                                        onClick={handleSignOut}
                                                        className='btn btn-ghost btn-block text-sm font-bold uppercase tracking-wider text-white px-5 py-2.5 rounded-xl 
                                                        bg-gradient-to-r from-cyan-600/50 to-indigo-600/50 
                                                        hover:from-cyan-500 hover:to-indigo-500 
                                                        hover:shadow-[0_0_20px_rgba(34,211,238,0.7)] 
                                                        border border-cyan-300/30 
                                                        transition-all duration-500 ease-out'>
                                                        Sign Out
                                                    </button>
                                                </motion.div>
                                            </span>
                                        </div>

                                    </Tooltip>

                                    {
                                        user && <motion.div
                                            variants={photoVariants}
                                            initial='initial'
                                            whileHover='whileHover'
                                            transition='transition'
                                            className='w-16 h-16 rounded-full mx-auto cursor-pointer p-1'>
                                            <img className='rounded-full' src={user?.photoURL} alt={`${user?.displayName ? user.displayName
                                                : user?.email}'s photo`} />
                                        </motion.div>
                                    }
                                </div>





                            </div>
                        </div>

                        {/* Mobile Menu Button */}

                        {
                            user && <div
                                className='w-12 h-12 rounded-full p-2 bg-gradient-to-r from-gray-900/95 via-violet-950/95 to-cyan-900/95 md:hidden'>
                                <img className='rounded-full' src={user?.photoURL} alt="" />
                            </div>
                        }

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
                                        d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
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
                                <p
                                    className='block px-4 py-3 rounded-xl text-base  uppercase tracking-wide transition-all duration-300 bg-gradient-to-r from-cyan-500/30 to-violet-500/30 text-white font-bold shadow-[0_0_10px_rgba(139,92,246,0.5)]'
                                >{user?.displayName}</p>
                                {links.map((link) => (
                                    <motion.div
                                        key={link.name}
                                        variants={itemVariants}
                                        onClick={() => {
                                            setIsOpen(false);
                                            if (link.click) link.click();
                                        }}
                                    >
                                        <NavLink
                                            to={link.to}
                                            className={({ isActive }) =>
                                                `block text-gray-100 px-4 py-3 rounded-xl text-base font-semibold uppercase tracking-wide transition-all duration-300 ${isActive ? link.active : ''
                                                }`
                                            }
                                        >
                                            {link.name}
                                        </NavLink>
                                    </motion.div>
                                ))}
                                <motion.div
                                    variants={itemVariants}
                                    className="flex flex-col space-y-4"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <NavLink
                                        to="/cart"
                                        className="text-gray-100 hover:text-cyan-400 px-4 py-3"
                                    >
                                        <IoCartOutline size={28} className="drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]" />
                                    </NavLink>

                                    {
                                        user ? <button
                                            onClick={handleSignOut}
                                            className='btn btn-ghost text-sm font-bold uppercase tracking-wider text-white px-5 py-2.5 rounded-xl 
                                            bg-gradient-to-r from-cyan-600/50 to-indigo-600/50 
                                            hover:from-cyan-500 hover:to-indigo-500 
                                            hover:shadow-[0_0_20px_rgba(34,211,238,0.7)] 
                                            border border-cyan-300/30 
                                            transition-all duration-500 ease-out'>
                                            Sign Out
                                        </button>
                                            : <NavLink
                                                to="/auth/signin"
                                                className={({ isActive }) =>
                                                    `text-gray-100 hover:text-cyan-400 px-4 py-3 text-base font-semibold uppercase tracking-wide hover:bg-cyan-500/20 rounded-xl ${isActive
                                                        ? 'bg-gradient-to-r from-cyan-500/30 to-violet-500/30 text-white font-bold shadow-[0_0_10px_rgba(139,92,246,0.5)]'
                                                        : ''
                                                    }`
                                                }
                                            >
                                                Sign In
                                            </NavLink>
                                    }



                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </AnimatePresence>
    );
};

export default Navbar;
