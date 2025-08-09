import React, { useRef } from 'react';
import { Link } from 'react-router';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import GradientText from './GradientText';
import StarBorder from './StarBorder';

const GalaxiParalax = () => {

    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    // useMotionValueEvent(scrollYProgress, "change", (latest)=> {
    //     console.log("changed value",latest)
    // })

    const translateContent = useTransform(scrollYProgress, [0, 1], [50, 0])
    const opacityContent = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])


    return (
        <AnimatePresence>
            <motion.section
                ref={ref}
                initial={{ opacity: 0, translateY: 200 }}
                whileInView={{ opacity: 1, translateY: [-100, 0] }}
                exit={{ opacity: 0, translateY: -200 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className="mt-12">

                <motion.div
                    style={{
                        y: translateContent,
                        opacity: opacityContent
                    }}
                    className="z-10 max-w-6xl mx-auto px-4 mb-64">
                    <h2 className="text-4xl md:text-5xl font-bold orbitron text-center mb-4 text-cyan-100">
                        <GradientText
                            colors={["#22D3EE", "#A5F3FC", "#6366F1", "#EC4899", "#22D3EE"]}
                            animationSpeed={3}
                            showBorder={false}
                            className="custom-class"
                        >Enter Galaxy Parallax to Explore Something Else</GradientText>
                    </h2>
                    <p className="text-cyan-200 text-lg md:text-xl orbitron text-center mb-12">
                        Journey through our curated collection of futuristic products.
                    </p>


                    {/* Explore Button */}
                    <div className="mt-16 text-center">
                        <StarBorder>
                            <Link to="/explore_paralax">
                                <span className="relative btn px-6 py-3 bg-gradient-to-r from-cyan-600/50 to-indigo-600/50 text-cyan-100 orbitron font-semibold rounded-full border-2 border-cyan-300/30 shadow-[0_0_10px_rgba(34,211,238,0.3)] hover:from-cyan-500 hover:to-indigo-500 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300 overflow-hidden group cursor-pointer">
                                    <span className="relative z-10 flex items-center gap-2">
                                        Explore
                                        <svg
                                            className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90"
                                            viewBox="0 0 16 19"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                                                className="fill-cyan-100 group-hover:fill-cyan-200"
                                            />
                                        </svg>
                                    </span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-indigo-400/20 scale-0 group-hover:scale-150 transition-transform duration-700 rounded-full"></span>
                                </span>
                            </Link>
                        </StarBorder>
                    </div>
                </motion.div>
            </motion.section>
        </AnimatePresence>
    );
};

export default GalaxiParalax;