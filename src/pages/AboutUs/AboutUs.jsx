import React, { useEffect } from 'react';
import { motion } from 'motion/react';

const AboutUs = () => {
    useEffect(() => {
        document.title = "About Us"
    }, [])

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        hover: { scale: 1.05, boxShadow: '0 0 15px rgba(99, 161, 253, 0.7)' }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a1a3d] to-[#2a2a5e] dark:from-gray-100 dark:to-gray-200 text-white dark:text-gray-900 py-16 px-4 md:px-8">
            {/* Background Particle Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute w-72 h-72 bg-cyan-500/25 dark:bg-cyan-500/15 rounded-full filter blur-3xl animate-pulse opacity-20 top-[10%] left-[5%]"></div>
                <div className="absolute w-80 h-80 bg-magenta-500/25 dark:bg-magenta-500/15 rounded-full filter blur-3xl animate-pulse opacity-20 bottom-[15%] right-[5%] animate-pulse-slow"></div>
            </div>

            {/* Hero Section */}
            <motion.section
                className="text-center max-w-4xl mx-auto mb-16 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-violet-500 dark:from-cyan-600 dark:via-magenta-600 dark:to-violet-600 tracking-tighter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] dark:drop-shadow-[0_0_8px_rgba(139,92,246,0.3)] orbitron mb-4">
                    About Galaximart
                </h1>
                <p className="text-lg md:text-xl text-neutral-300 dark:text-gray-700">
                    Welcome to Galaximart, the ultimate B2B wholesale marketplace where innovation meets opportunity in a cosmic ecosystem. We're here to connect businesses with futuristic products and stellar deals.
                </p>
            </motion.section>

            {/* Mission Section */}
            <section className="max-w-6xl mx-auto mb-16 relative z-10">
                <motion.h2
                    className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-violet-500 dark:from-cyan-600 dark:via-magenta-600 dark:to-violet-600 tracking-tighter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] dark:drop-shadow-[0_0_8px_rgba(139,92,246,0.3)] orbitron text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Our Mission
                </motion.h2>
                <motion.p
                    className="text-neutral-300 dark:text-gray-700 text-center text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    At Galaximart, we empower businesses by providing a seamless platform to source high-quality, innovative products. Our mission is to bridge galaxies of commerce with cutting-edge technology and unparalleled service.
                </motion.p>
            </section>

            {/* Values Section */}
            <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {[
                    {
                        title: 'Innovation',
                        description: 'We embrace cutting-edge technology to deliver a stellar shopping experience.',
                    },
                    {
                        title: 'Quality',
                        description: 'Every product on Galaximart meets the highest standards of excellence.',
                    },
                    {
                        title: 'Community',
                        description: 'We foster strong connections between businesses across the cosmos.',
                    },
                ].map((value, index) => (
                    <motion.div
                        key={index}
                        className="bg-[#2a2a5e]/50 dark:bg-gray-300/50 backdrop-blur-sm p-6 rounded-lg text-center border border-cyan-400/60 dark:border-violet-500/60 hover:border-cyan-400/80 dark:hover:border-violet-400/80 transition-all duration-300"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        transition={{ delay: index * 0.2 }}
                    >
                        <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-violet-500 dark:from-cyan-600 dark:via-magenta-600 dark:to-violet-600 tracking-tighter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] dark:drop-shadow-[0_0_8px_rgba(139,92,246,0.3)] orbitron mb-2">{value.title}</h3>
                        <p className="text-neutral-300 dark:text-gray-700">{value.description}</p>
                    </motion.div>
                ))}
            </section>

            {/* Team Section */}
            <section className="max-w-6xl mx-auto mt-16 relative z-10">
                <motion.h2
                    className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-violet-500 dark:from-cyan-600 dark:via-magenta-600 dark:to-violet-600 tracking-tighter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] dark:drop-shadow-[0_0_8px_rgba(139,92,246,0.3)] orbitron text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Our Galactic Team
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { name: 'Alex Stellar', role: 'CEO & Founder', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
                        { name: 'Sarah Nebula', role: 'CTO', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
                        { name: 'Jamie Cosmos', role: 'Head of Design', img: 'https://randomuser.me/api/portraits/men/75.jpg' },
                        { name: 'Taylor Orion', role: 'Marketing Director', img: 'https://randomuser.me/api/portraits/women/68.jpg' },
                    ].map((member, index) => (
                        <motion.div
                            key={index}
                            className="bg-[#2a2a5e]/50 dark:bg-gray-300/50 backdrop-blur-sm p-6 rounded-lg text-center border border-cyan-400/60 dark:border-violet-500/60 hover:border-cyan-400/80 dark:hover:border-violet-400/80 transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.03 }}
                        >
                            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-cyan-400/60 dark:border-violet-500/60">
                                <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-xl font-semibold text-cyan-100 dark:text-violet-800">{member.name}</h3>
                            <p className="text-neutral-300 dark:text-gray-700">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutUs;