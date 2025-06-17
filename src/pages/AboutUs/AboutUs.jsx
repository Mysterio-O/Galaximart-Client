import React, { useEffect } from 'react';
import { motion } from 'motion/react';

const AboutUs = () => {

    useEffect(()=> {
            document.title="About Us"
        },[])

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        hover: { scale: 1.05, boxShadow: '0 0 15px rgba(249, 115, 22, 0.5)' }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a1a3d] to-[#2a2a5e] text-white py-16 px-4 md:px-8">
            {/* Hero Section */}
            <motion.section
                className="text-center max-w-4xl mx-auto mb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold text-orange-400 mb-4">
                    About Galaximart
                </h1>
                <p className="text-lg md:text-xl text-neutral-300">
                    Welcome to Galaximart, the ultimate B2B wholesale marketplace where innovation meets opportunity in a cosmic ecosystem. We're here to connect businesses with futuristic products and stellar deals.
                </p>
            </motion.section>

            {/* Mission Section */}
            <section className="max-w-6xl mx-auto mb-16">
                <motion.h2
                    className="text-3xl font-semibold text-orange-400 text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Our Mission
                </motion.h2>
                <motion.p
                    className="text-neutral-300 text-center text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    At Galaximart, we empower businesses by providing a seamless platform to source high-quality, innovative products. Our mission is to bridge galaxies of commerce with cutting-edge technology and unparalleled service.
                </motion.p>
            </section>

            {/* Values Section */}
            <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
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
                        className="bg-[#2a2a5e]/50 backdrop-blur-sm p-6 rounded-lg text-center border border-orange-500/30"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        transition={{ delay: index * 0.2 }}
                    >
                        <h3 className="text-xl font-semibold text-orange-400 mb-2">{value.title}</h3>
                        <p className="text-neutral-300">{value.description}</p>
                    </motion.div>
                ))}
            </section>
        </div>
    );
};

export default AboutUs;